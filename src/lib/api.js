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
}

// --- Projects ---

export async function getProjects() {
  const res = await fetch(`${BASE}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(`${BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function updateProject(id, data) {
  const res = await fetch(`${BASE}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${BASE}/projects/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete project");
}
