export async function onRequestGet(context) {
  const { DB } = context.env;

  const { results: projects } = await DB.prepare(
    "SELECT id, name, url, created_at FROM projects ORDER BY created_at ASC"
  ).all();

  const { results: links } = await DB.prepare(
    "SELECT project_id, component_id FROM component_projects"
  ).all();

  const componentIdsByProject = {};
  for (const { project_id, component_id } of links) {
    if (!componentIdsByProject[project_id]) componentIdsByProject[project_id] = [];
    componentIdsByProject[project_id].push(component_id);
  }

  const result = projects.map((p) => ({
    ...p,
    componentIds: componentIdsByProject[p.id] ?? [],
  }));

  return Response.json(result);
}

export async function onRequestPost(context) {
  const { DB } = context.env;

  let body;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, url } = body;
  if (!name) {
    return Response.json({ error: "name is required" }, { status: 400 });
  }

  const id = `proj-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  await DB.prepare(
    "INSERT INTO projects (id, name, url, created_at) VALUES (?, ?, ?, ?)"
  )
    .bind(id, name, url ?? null, now)
    .run();

  const created = await DB.prepare(
    "SELECT id, name, url, created_at FROM projects WHERE id = ?"
  )
    .bind(id)
    .first();

  return Response.json({ ...created, componentIds: [] }, { status: 201 });
}
