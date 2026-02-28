const BASE = "/api";

export async function getCategories() {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getComponents(categorySlug) {
  const url = categorySlug
    ? `${BASE}/components?category=${categorySlug}`
    : `${BASE}/components`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch components");
  return res.json();
}

export async function searchComponents(query) {
  const res = await fetch(
    `${BASE}/components?search=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error("Failed to search components");
  return res.json();
}

export async function getComponent(id) {
  const res = await fetch(`${BASE}/components/${id}`);
  if (!res.ok) throw new Error("Failed to fetch component");
  return res.json();
}

export async function createComponent(data) {
  const res = await fetch(`${BASE}/components`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create component");
  return res.json();
}

export async function updateComponent(id, data) {
  const res = await fetch(`${BASE}/components/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update component");
  return res.json();
}

export async function deleteComponent(id) {
  const res = await fetch(`${BASE}/components/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete component");
  return res.json();
}
