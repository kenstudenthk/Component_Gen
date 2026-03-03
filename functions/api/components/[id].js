export async function onRequestGet(context) {
  const { DB } = context.env;
  const { id } = context.params;

  const row = await DB.prepare(
    "SELECT id, name, category_slug, description, yaml, tags, sort_order, preview_url, created_at, updated_at FROM components WHERE id = ?",
  )
    .bind(id)
    .first();

  if (!row) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(row);
}

export async function onRequestPut(context) {
  const { DB } = context.env;
  const { id } = context.params;

  const existing = await DB.prepare("SELECT id FROM components WHERE id = ?")
    .bind(id)
    .first();

  if (!existing) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, category_slug, description, yaml, tags, sort_order, preview_url } = body;

  if (!name || !category_slug || !yaml) {
    return Response.json(
      { error: "name, category_slug, and yaml are required" },
      { status: 400 },
    );
  }

  const categoryCheck = await DB.prepare(
    "SELECT slug FROM categories WHERE slug = ?",
  )
    .bind(category_slug)
    .first();

  if (!categoryCheck) {
    return Response.json(
      { error: `Invalid category: ${category_slug}` },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();

  await DB.prepare(
    "UPDATE components SET name = ?, category_slug = ?, description = ?, yaml = ?, tags = ?, sort_order = ?, preview_url = ?, updated_at = ? WHERE id = ?",
  )
    .bind(
      name,
      category_slug,
      description ?? null,
      yaml,
      tags ?? null,
      sort_order ?? 0,
      preview_url ?? null,
      now,
      id,
    )
    .run();

  const updated = await DB.prepare(
    "SELECT id, name, category_slug, description, yaml, tags, sort_order, preview_url, created_at, updated_at FROM components WHERE id = ?",
  )
    .bind(id)
    .first();

  return Response.json(updated);
}

export async function onRequestDelete(context) {
  const { DB } = context.env;
  const { id } = context.params;

  const existing = await DB.prepare("SELECT id FROM components WHERE id = ?")
    .bind(id)
    .first();

  if (!existing) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  await DB.prepare("DELETE FROM components WHERE id = ?").bind(id).run();

  return new Response(null, { status: 204 });
}
