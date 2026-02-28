-- Migration 005: Sync database to PowerLibs standard
-- Remove duplicate seed components from 002_seed_components.sql
-- Add missing app-shells components (6 variants)

-- Step 1: Delete old seed components from 002_seed_components.sql
-- These duplicate components in badges, accordions, buttons, forms, shells
DELETE FROM components WHERE id IN (
  'comp-button-primary',
  'comp-form-contact',
  'comp-badge-status',
  'comp-accordion-faq',
  'comp-shell-default'
);

-- Step 2: Insert 6 missing app-shells components
-- These match the PowerLibs site categories under /library/app-shells/

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order)
VALUES (
  'comp-app-shells-1',
  'Responsive App Shell',
  'app-shells',
  'FREE component',
'- AppShell:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(15, 23, 42, 1)
      Width: =1366
      Height: =80
    Children:
      - AppTitle:
          Control: Label
          Properties:
            Text: ="My Power App"
            Color: =RGBA(255, 255, 255, 1)
            X: =20
            Y: =20
            Size: =20
            FontWeight: =FontWeight.Bold
',
  'app-shell,layout,responsive',
  0
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order)
VALUES (
  'comp-app-shells-2',
  'Responsive Collapsible App Shell',
  'app-shells',
  'PRO component',
'- AppShell:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(15, 23, 42, 1)
      Width: =1366
      Height: =80
    Children:
      - HamburgerBtn:
          Control: Button
          Properties:
            Text: ="="
            X: =20
            Y: =20
            Width: =40
            Height: =40
            Fill: =RGBA(255, 255, 255, 0.1)
            Color: =RGBA(255, 255, 255, 1)
            RadiusTopLeft: =4
            RadiusTopRight: =4
            RadiusBottomLeft: =4
            RadiusBottomRight: =4
      - AppTitle:
          Control: Label
          Properties:
            Text: ="My Power App"
            Color: =RGBA(255, 255, 255, 1)
            X: =76
            Y: =20
            Size: =20
            FontWeight: =FontWeight.Bold
',
  'app-shell,layout,responsive,collapsible',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order)
VALUES (
  'comp-app-shells-3',
  'Responsive App Shell Dark & Light Mode',
  'app-shells',
  'PRO component',
'- AppShell:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(15, 23, 42, 1)
      Width: =1366
      Height: =80
    Children:
      - AppTitle:
          Control: Label
          Properties:
            Text: ="My Power App"
            Color: =RGBA(255, 255, 255, 1)
            X: =20
            Y: =20
            Size: =20
            FontWeight: =FontWeight.Bold
      - ThemeToggle:
          Control: Toggle
          Properties:
            Default: =false
            OnFill: =RGBA(99, 102, 241, 1)
            X: =1290
            Y: =22
            Width: =56
            Height: =36
',
  'app-shell,layout,responsive,dark-mode,light-mode',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order)
VALUES (
  'comp-app-shells-4',
  'Sidebar App Shell',
  'app-shells',
  'PRO component',
'- AppShellLayout:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(248, 250, 252, 1)
      Width: =1366
      Height: =768
    Children:
      - TopBar:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(15, 23, 42, 1)
            Width: =1366
            Height: =64
            Y: =0
          Children:
            - AppTitle:
                Control: Label
                Properties:
                  Text: ="My Power App"
                  Color: =RGBA(255, 255, 255, 1)
                  X: =20
                  Y: =16
                  Size: =18
                  FontWeight: =FontWeight.Bold
      - SidebarPanel:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(30, 41, 59, 1)
            Width: =240
            Height: =704
            Y: =64
',
  'app-shell,layout,sidebar',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order)
VALUES (
  'comp-app-shells-5',
  'Collapsible Sidebar App Shell',
  'app-shells',
  'PRO component',
'- AppShellLayout:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(248, 250, 252, 1)
      Width: =1366
      Height: =768
    Children:
      - TopBar:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(15, 23, 42, 1)
            Width: =1366
            Height: =64
            Y: =0
          Children:
            - CollapseBtn:
                Control: Button
                Properties:
                  Text: ="="
                  X: =12
                  Y: =12
                  Width: =40
                  Height: =40
                  Fill: =RGBA(255, 255, 255, 0.1)
                  Color: =RGBA(255, 255, 255, 1)
                  RadiusTopLeft: =4
                  RadiusTopRight: =4
                  RadiusBottomLeft: =4
                  RadiusBottomRight: =4
            - AppTitle:
                Control: Label
                Properties:
                  Text: ="My Power App"
                  Color: =RGBA(255, 255, 255, 1)
                  X: =64
                  Y: =16
                  Size: =18
                  FontWeight: =FontWeight.Bold
      - SidebarPanel:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(30, 41, 59, 1)
            Width: =240
            Height: =704
            Y: =64
',
  'app-shell,layout,sidebar,collapsible',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order)
VALUES (
  'comp-app-shells-6',
  'App Shell Dark & Light Mode',
  'app-shells',
  'PRO component',
'- AppShell:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(30, 41, 59, 1)
      Width: =1366
      Height: =80
    Children:
      - AppTitle:
          Control: Label
          Properties:
            Text: ="My Power App"
            Color: =RGBA(226, 232, 240, 1)
            X: =20
            Y: =20
            Size: =20
            FontWeight: =FontWeight.Bold
      - ThemeToggle:
          Control: Toggle
          Properties:
            Default: =true
            OnFill: =RGBA(99, 102, 241, 1)
            X: =1290
            Y: =22
            Width: =56
            Height: =36
      - ThemeLabel:
          Control: Label
          Properties:
            Text: ="Dark"
            Color: =RGBA(148, 163, 184, 1)
            X: =1240
            Y: =30
            Size: =12
',
  'app-shell,layout,dark-mode,light-mode',
  5
);
