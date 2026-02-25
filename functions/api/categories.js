export async function onRequestGet(context) {
  const { DB } = context.env;

  const { results } = await DB.prepare(
    `SELECT c.id, c.name, c.slug, c.description, c.sort_order,
            COUNT(comp.id) AS component_count
     FROM categories c
     LEFT JOIN components comp ON comp.category_slug = c.slug
     GROUP BY c.id
     ORDER BY c.sort_order ASC`,
  ).all();

  return Response.json(results);
}
