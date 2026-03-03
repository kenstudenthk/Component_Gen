-- Migration 002: PowerHub UI features
-- Adds preview_url to components, and new projects/component_projects tables

ALTER TABLE components ADD COLUMN preview_url TEXT;

CREATE TABLE IF NOT EXISTS projects (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  url        TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS component_projects (
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  project_id   TEXT NOT NULL REFERENCES projects(id)   ON DELETE CASCADE,
  PRIMARY KEY (component_id, project_id)
);
