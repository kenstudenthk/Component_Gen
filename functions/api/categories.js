export async function onRequestGet(context) {
  const { DB } = context.env;

  const { results } = await DB.prepare(
    "SELECT id, name, slug, description, sort_order FROM categories ORDER BY sort_order ASC"
  ).all();

  return Response.json(results);
}
