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

INSERT INTO categories (id, name, slug, description, sort_order) VALUES 
('cat-accordions',  'Accordions',     'accordions',   'Expandable section lists',      1),
('cat-animations',  'Animations',     'animations',   'Timer and animation controls',  2),
('cat-app-shells',  'App Shells',     'app-shells',   'App layout shells and headers', 3),
('cat-badges',      'Badges',         'badges',       'Status and label badges',       4),
('cat-btn-group',   'Button Group',   'button-group', 'Segmented button controls',     5),
('cat-buttons',     'Buttons',        'buttons',      'Button controls for actions',   6),
('cat-calendars',   'Calendars',      'calendars',    'Date and time pickers',         7),
('cat-cards',       'Cards',          'cards',        'Content and media cards',       8),
('cat-drawers',     'Drawers',        'drawers',      'Slide-out panels',              9),
('cat-dropdowns',   'Dropdowns',      'dropdowns',    'Select and picker menus',       10),
('cat-forms',       'Forms',          'forms',        'Form card components',          11),
('cat-gallery',     'Gallery',        'gallery',      'Data list and grid layouts',    12),
('cat-inputs',      'Input Fields',   'input-fields', 'Text and data input controls',  13),
('cat-modals',      'Modals',         'modals',       'Dialog and overlay boxes',      14),
('cat-navigation',  'Navigation',     'navigation',   'Menus and breadcrumbs',         15),
('cat-sidebars',    'Sidebars',       'sidebars',     'Vertical app navigation',       16),
('cat-speed-dial',  'Speed Dial',     'speed-dial',   'Floating action buttons',       17),
('cat-tabs',        'Tabs',           'tabs',         'Tabbed navigation headers',     18),
('cat-toast',       'Toast',          'toast',        'Notification banners',          19),
('cat-toggles',     'Toggles',        'toggles',      'Switch and toggle controls',    20);
