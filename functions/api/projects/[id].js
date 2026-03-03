export async function onRequestPut(context) {
  const { DB } = context.env;
  const { id } = context.params;

  const project = await DB.prepare("SELECT id FROM projects WHERE id = ?")
    .bind(id)
    .first();
  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { componentIds = [], name, url } = body;

  // Update name/url if provided
  if (name !== undefined || url !== undefined) {
    const fields = [];
    const values = [];
    if (name !== undefined) { fields.push("name = ?"); values.push(name); }
    if (url !== undefined)  { fields.push("url = ?");  values.push(url);  }
    values.push(id);
    await DB.prepare(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  // Replace component associations atomically
  await DB.prepare("DELETE FROM component_projects WHERE project_id = ?")
    .bind(id)
    .run();

  for (const componentId of componentIds) {
    await DB.prepare(
      "INSERT OR IGNORE INTO component_projects (component_id, project_id) VALUES (?, ?)"
    )
      .bind(componentId, id)
      .run();
  }

  const updated = await DB.prepare(
    "SELECT id, name, url, created_at FROM projects WHERE id = ?"
  )
    .bind(id)
    .first();

  return Response.json({ ...updated, componentIds });
}

export async function onRequestDelete(context) {
  const { DB } = context.env;
  const { id } = context.params;

  const project = await DB.prepare("SELECT id FROM projects WHERE id = ?")
    .bind(id)
    .first();
  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  await DB.prepare("DELETE FROM component_projects WHERE project_id = ?")
    .bind(id)
    .run();
  await DB.prepare("DELETE FROM projects WHERE id = ?")
    .bind(id)
    .run();

  return new Response(null, { status: 204 });
}
