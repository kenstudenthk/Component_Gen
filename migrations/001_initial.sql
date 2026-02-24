CREATE TABLE categories (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order  INTEGER DEFAULT 0
);

CREATE TABLE components (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  description   TEXT,
  yaml          TEXT NOT NULL,
  tags          TEXT,
  sort_order    INTEGER DEFAULT 0,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories VALUES ('cat-buttons',    'Buttons',    'buttons',    'Button controls for actions',   1);
INSERT INTO categories VALUES ('cat-forms',      'Forms',      'forms',      'Form card components',          2);
INSERT INTO categories VALUES ('cat-badges',     'Badges',     'badges',     'Status and label badges',       3);
INSERT INTO categories VALUES ('cat-accordions', 'Accordions', 'accordions', 'Expandable section lists',      4);
INSERT INTO categories VALUES ('cat-shells',     'App Shells', 'shells',     'App layout shells and headers', 5);
