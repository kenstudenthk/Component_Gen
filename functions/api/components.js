export async function onRequestGet(context) {
  const { DB } = context.env;
  const url = new URL(context.request.url);
  const category = url.searchParams.get("category");

  let stmt;
  if (category) {
    stmt = DB.prepare(
      "SELECT id, name, category_slug, description, yaml, tags, sort_order, preview_url, created_at FROM components WHERE category_slug = ? ORDER BY sort_order ASC, created_at ASC"
    ).bind(category);
  } else {
    stmt = DB.prepare(
      "SELECT id, name, category_slug, description, yaml, tags, sort_order, preview_url, created_at FROM components ORDER BY sort_order ASC, created_at ASC"
    );
  }

  const { results } = await stmt.all();
  return Response.json(results);
}

export async function onRequestPost(context) {
  const { DB } = context.env;

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
      { status: 400 }
    );
  }

  const id = `comp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  await DB.prepare(
    "INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order, preview_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  )
    .bind(
      id,
      name,
      category_slug,
      description ?? null,
      yaml,
      tags ?? null,
      sort_order ?? 0,
      preview_url ?? null,
      now,
      now
    )
    .run();

  const created = await DB.prepare(
    "SELECT id, name, category_slug, description, yaml, tags, sort_order, preview_url, created_at, updated_at FROM components WHERE id = ?"
  )
    .bind(id)
    .first();

  return Response.json(created, { status: 201 });
}
