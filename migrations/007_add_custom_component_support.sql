-- Migration 007: Add Custom Component Support
-- Adds custom-components category and columns for ComponentDefinitions support
-- Date: 2026-03-01

-- Add new category for custom components
INSERT INTO categories (id, name, slug, description, sort_order) VALUES
('cat-custom-components', 'Custom Components', 'custom-components', 'Imported custom canvas components', 21);

-- Add new columns to components table
ALTER TABLE components ADD COLUMN component_type TEXT DEFAULT 'control';
ALTER TABLE components ADD COLUMN custom_properties TEXT;
ALTER TABLE components ADD COLUMN preview_image_url TEXT;

-- Update existing components to have component_type = 'control'
UPDATE components SET component_type = 'control' WHERE component_type IS NULL;
