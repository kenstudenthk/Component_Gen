-- Migration: Update all components with real Power Apps YAML
-- Generated automatically by scripts/generate-yaml.mjs
-- Date: 2026-02-28T15:21:19.607Z

-- Accordion Plus (accordion:default)
UPDATE components
SET yaml = '- Accordion_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Width: =400
      Height: =120
    Children:
      - AccItem_0:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =0
            Width: =400
            Height: =50
            Fill: =RGBA(248, 250, 252, 1)
          Children:
            - AccLabel_0:
                Control: Label
                Properties:
                  Text: ="Section 1"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
      - AccItem_1:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =60
            Width: =400
            Height: =50
            Fill: =RGBA(248, 250, 252, 1)
          Children:
            - AccLabel_1:
                Control: Label
                Properties:
                  Text: ="Section 2"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
'
WHERE id = 'comp-accordions-1-1772260068350';

-- Accordion (accordion:default)
UPDATE components
SET yaml = '- Accordion_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Width: =400
      Height: =120
    Children:
      - AccItem_0:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =0
            Width: =400
            Height: =50
            Fill: =RGBA(248, 250, 252, 1)
          Children:
            - AccLabel_0:
                Control: Label
                Properties:
                  Text: ="Section 1"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
      - AccItem_1:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =60
            Width: =400
            Height: =50
            Fill: =RGBA(248, 250, 252, 1)
          Children:
            - AccLabel_1:
                Control: Label
                Properties:
                  Text: ="Section 2"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
'
WHERE id = 'comp-accordions-2-1772260068350';

-- Accordion Card (accordion:default)
UPDATE components
SET yaml = '- Accordion_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Width: =400
      Height: =120
    Children:
      - AccItem_0:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =0
            Width: =400
            Height: =50
            Fill: =RGBA(248, 250, 252, 1)
          Children:
            - AccLabel_0:
                Control: Label
                Properties:
                  Text: ="Section 1"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
      - AccItem_1:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =60
            Width: =400
            Height: =50
            Fill: =RGBA(248, 250, 252, 1)
          Children:
            - AccLabel_1:
                Control: Label
                Properties:
                  Text: ="Section 2"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
'
WHERE id = 'comp-accordions-3-1772260068350';

-- Animated Line Chart (animation:default)
UPDATE components
SET yaml = '- CustomAnimation:
    Control: Timer
    Properties:
      Duration: =1000
      Repeat: =true
      AutoStart: =true
'
WHERE id = 'comp-animations-1-1772260068350';

-- Animated Toggle (animation:default)
UPDATE components
SET yaml = '- CustomAnimation:
    Control: Timer
    Properties:
      Duration: =1000
      Repeat: =true
      AutoStart: =true
'
WHERE id = 'comp-animations-2-1772260068350';

-- Percentage Counter (animation:default)
UPDATE components
SET yaml = '- CustomAnimation:
    Control: Timer
    Properties:
      Duration: =1000
      Repeat: =true
      AutoStart: =true
'
WHERE id = 'comp-animations-3-1772260068350';

-- Modern Progress Bar (animation:default)
UPDATE components
SET yaml = '- CustomAnimation:
    Control: Timer
    Properties:
      Duration: =1000
      Repeat: =true
      AutoStart: =true
'
WHERE id = 'comp-animations-4-1772260068350';

-- Modern Progress Circle (animation:default)
UPDATE components
SET yaml = '- CustomAnimation:
    Control: Timer
    Properties:
      Duration: =1000
      Repeat: =true
      AutoStart: =true
'
WHERE id = 'comp-animations-5-1772260068350';

-- Simple Badge (badge:simple)
UPDATE components
SET yaml = '- BadgeContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(59, 130, 246, 0.1)
      RadiusTopLeft: =4
      RadiusTopRight: =4
      RadiusBottomLeft: =4
      RadiusBottomRight: =4
      Width: =120
      Height: =32
    Children:
      - BadgeLabel:
          Control: Label
          Properties:
            Text: ="BADGE"
            Color: =RGBA(29, 78, 216, 1)
            FontWeight: =FontWeight.Bold
            Size: =10
            Align: =Align.Center
            Width: =120
            Height: =32
'
WHERE id = 'comp-badges-1-1772260068350';

-- Border Badge (badge:border)
UPDATE components
SET yaml = '- BadgeContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(59, 130, 246, 0.1)
      RadiusTopLeft: =4
      RadiusTopRight: =4
      RadiusBottomLeft: =4
      RadiusBottomRight: =4
      Width: =120
      Height: =32
    Children:
      - BadgeLabel:
          Control: Label
          Properties:
            Text: ="BADGE"
            Color: =RGBA(29, 78, 216, 1)
            FontWeight: =FontWeight.Bold
            Size: =10
            Align: =Align.Center
            Width: =120
            Height: =32
'
WHERE id = 'comp-badges-2-1772260068350';

-- Pills Badge (badge:pills)
UPDATE components
SET yaml = '- BadgeContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(59, 130, 246, 0.1)
      RadiusTopLeft: =4
      RadiusTopRight: =4
      RadiusBottomLeft: =4
      RadiusBottomRight: =4
      Width: =120
      Height: =32
    Children:
      - BadgeLabel:
          Control: Label
          Properties:
            Text: ="BADGE"
            Color: =RGBA(29, 78, 216, 1)
            FontWeight: =FontWeight.Bold
            Size: =10
            Align: =Align.Center
            Width: =120
            Height: =32
'
WHERE id = 'comp-badges-3-1772260068350';

-- Outlined Pills Badge (badge:outlined-pills)
UPDATE components
SET yaml = '- BadgeContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(59, 130, 246, 0.1)
      RadiusTopLeft: =4
      RadiusTopRight: =4
      RadiusBottomLeft: =4
      RadiusBottomRight: =4
      Width: =120
      Height: =32
    Children:
      - BadgeLabel:
          Control: Label
          Properties:
            Text: ="BADGE"
            Color: =RGBA(29, 78, 216, 1)
            FontWeight: =FontWeight.Bold
            Size: =10
            Align: =Align.Center
            Width: =120
            Height: =32
'
WHERE id = 'comp-badges-4-1772260068350';

-- Classic Button (button:classic)
UPDATE components
SET yaml = '- CustomButton:
    Control: Button
    Properties:
      Text: ="Button"
      Fill: =RGBA(59, 130, 246, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =4
      RadiusTopRight: =4
      RadiusBottomLeft: =4
      RadiusBottomRight: =4
      Width: =160
      Height: =40
'
WHERE id = 'comp-buttons-1-1772260068350';

-- Classic Icon Button (button:icon)
UPDATE components
SET yaml = '- CustomButton:
    Control: Button
    Properties:
      Text: ="Button"
      Fill: =RGBA(59, 130, 246, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =4
      RadiusTopRight: =4
      RadiusBottomLeft: =4
      RadiusBottomRight: =4
      Width: =160
      Height: =40
'
WHERE id = 'comp-buttons-2-1772260068350';

-- Outline Button (button:outline)
UPDATE components
SET yaml = '- CustomButton:
    Control: Button
    Properties:
      Text: ="Button"
      Fill: =RGBA(255, 255, 255, 0)
      Color: =RGBA(59, 130, 246, 1)
      RadiusTopLeft: =4
      RadiusTopRight: =4
      RadiusBottomLeft: =4
      RadiusBottomRight: =4
      Width: =160
      Height: =40
      BorderColor: =RGBA(59, 130, 246, 1)
      BorderThickness: =2
'
WHERE id = 'comp-buttons-3-1772260068350';

-- Loading Button with Spinner (button:loading)
UPDATE components
SET yaml = '- CustomButton:
    Control: Button
    Properties:
      Text: ="Loading..."
      Fill: =RGBA(59, 130, 246, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =4
      RadiusTopRight: =4
      RadiusBottomLeft: =4
      RadiusBottomRight: =4
      Width: =160
      Height: =40
'
WHERE id = 'comp-buttons-4-1772260068350';

-- Gradient Button (button:gradient)
UPDATE components
SET yaml = '- CustomButton:
    Control: Button
    Properties:
      Text: ="Button"
      Fill: =RGBA(59, 130, 246, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Width: =160
      Height: =40
'
WHERE id = 'comp-buttons-5-1772260068350';

-- Button Raised (button:raised)
UPDATE components
SET yaml = '- CustomButton:
    Control: Button
    Properties:
      Text: ="Button"
      Fill: =RGBA(59, 130, 246, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =4
      RadiusTopRight: =4
      RadiusBottomLeft: =4
      RadiusBottomRight: =4
      Width: =160
      Height: =40
      DropShadow: =DropShadow.Regular
'
WHERE id = 'comp-buttons-6-1772260068350';

-- Button Group (buttonGroup:default)
UPDATE components
SET yaml = '- CustomButtonGroup:
    Control: Gallery
    Properties:
      Items: =[]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-button-group-1-1772260068350';

-- Calendar (calendar:default)
UPDATE components
SET yaml = '- CustomCalendar:
    Control: GroupContainer
    Properties:
      Width: =640
      Height: =480
'
WHERE id = 'comp-calendars-1-1772260068350';

-- Calendar with Header (calendar:default)
UPDATE components
SET yaml = '- CustomCalendar:
    Control: GroupContainer
    Properties:
      Width: =640
      Height: =480
'
WHERE id = 'comp-calendars-2-1772260068350';

-- Time Picker (calendar:default)
UPDATE components
SET yaml = '- CustomCalendar:
    Control: GroupContainer
    Properties:
      Width: =640
      Height: =480
'
WHERE id = 'comp-calendars-3-1772260068350';

-- Dynamic Form Card (card:default)
UPDATE components
SET yaml = '- CustomCard:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =12
      Width: =400
      Height: =200
      DropShadow: =DropShadow.Regular
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Card Title"
            FontWeight: =FontWeight.Bold
            X: =20
            Y: =20
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="undefined"
            Color: =RGBA(59, 130, 246, 1)
            X: =20
            Y: =50
'
WHERE id = 'comp-cards-1-1772260068350';

-- Card Modern (card:default)
UPDATE components
SET yaml = '- CustomCard:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =12
      Width: =400
      Height: =200
      DropShadow: =DropShadow.Regular
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Card Title"
            FontWeight: =FontWeight.Bold
            X: =20
            Y: =20
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="undefined"
            Color: =RGBA(59, 130, 246, 1)
            X: =20
            Y: =50
'
WHERE id = 'comp-cards-2-1772260068350';

-- Card Modern Tall (card:default)
UPDATE components
SET yaml = '- CustomCard:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =12
      Width: =400
      Height: =200
      DropShadow: =DropShadow.Regular
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Card Title"
            FontWeight: =FontWeight.Bold
            X: =20
            Y: =20
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="undefined"
            Color: =RGBA(59, 130, 246, 1)
            X: =20
            Y: =50
'
WHERE id = 'comp-cards-3-1772260068350';

-- Modern Form (card:default)
UPDATE components
SET yaml = '- CustomCard:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =12
      Width: =400
      Height: =200
      DropShadow: =DropShadow.Regular
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Card Title"
            FontWeight: =FontWeight.Bold
            X: =20
            Y: =20
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="undefined"
            Color: =RGBA(59, 130, 246, 1)
            X: =20
            Y: =50
'
WHERE id = 'comp-cards-4-1772260068350';

-- Drawer Bottom (drawer:default)
UPDATE components
SET yaml = '- DrawerContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(30, 41, 59, 1)
      Width: =300
      Height: =768
    Children:
      - DrawerTitle:
          Control: Label
          Properties:
            Text: ="Drawer"
            Color: =RGBA(255, 255, 255, 1)
            X: =20
            Y: =20
            Size: =18
            FontWeight: =FontWeight.Bold
'
WHERE id = 'comp-drawers-1-1772260068350';

-- Drawer Right (drawer:default)
UPDATE components
SET yaml = '- DrawerContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(30, 41, 59, 1)
      Width: =300
      Height: =768
    Children:
      - DrawerTitle:
          Control: Label
          Properties:
            Text: ="Drawer"
            Color: =RGBA(255, 255, 255, 1)
            X: =20
            Y: =20
            Size: =18
            FontWeight: =FontWeight.Bold
'
WHERE id = 'comp-drawers-2-1772260068350';

-- People Picker (dropdown:default)
UPDATE components
SET yaml = '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-dropdowns-1-1772260068350';

-- Dropdown Menu (dropdown:default)
UPDATE components
SET yaml = '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-dropdowns-2-1772260068350';

-- User Profile Dropdown (dropdown:default)
UPDATE components
SET yaml = '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-dropdowns-3-1772260068350';

-- Dropdown Expandable (dropdown:default)
UPDATE components
SET yaml = '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-dropdowns-4-1772260068350';

-- Dropdown - Profile Menu (dropdown:default)
UPDATE components
SET yaml = '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-dropdowns-5-1772260068350';

-- Dropdown - Notion Style (dropdown:default)
UPDATE components
SET yaml = '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-dropdowns-6-1772260068350';

-- Navigation Dropdown (dropdown:default)
UPDATE components
SET yaml = '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-dropdowns-7-1772260068350';

-- Searchable Lookup (dropdown:default)
UPDATE components
SET yaml = '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-dropdowns-8-1772260068350';

-- Gallery with Filter Header (gallery:default)
UPDATE components
SET yaml = '- CustomGallery:
    Control: Gallery
    Properties:
      Items: =Filter(DataSource, true)
      TemplateSize: =120
'
WHERE id = 'comp-gallery-1-1772260068350';

-- Project Gallery (gallery:default)
UPDATE components
SET yaml = '- CustomGallery:
    Control: Gallery
    Properties:
      Items: =Filter(DataSource, true)
      TemplateSize: =120
'
WHERE id = 'comp-gallery-2-1772260068350';

-- Clean Data Table (gallery:default)
UPDATE components
SET yaml = '- CustomGallery:
    Control: Gallery
    Properties:
      Items: =Filter(DataSource, true)
      TemplateSize: =120
'
WHERE id = 'comp-gallery-3-1772260068350';

-- Input Modal (modal:input)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-1-1772260068350';

-- Confirmation Modal (modal:confirmation)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-2-1772260068350';

-- Modal (modal:basic)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-3-1772260068350';

-- Success Modal (modal:success)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-4-1772260068350';

-- Warning Modal V2 (modal:warning)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-5-1772260068350';

-- Info Modal (modal:info)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-6-1772260068350';

-- Form Submit Modal (modal:form-submit)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-7-1772260068350';

-- Logout Modal (modal:logout)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-8-1772260068350';

-- Unsaved Changes Modal (modal:unsaved)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-9-1772260068350';

-- Permission Request Modal (modal:permission)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-10-1772260068350';

-- Error State Modal (modal:error)
UPDATE components
SET yaml = '- CustomModal:
    Control: GroupContainer
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      DropShadow: =DropShadow.Bold
'
WHERE id = 'comp-modals-11-1772260068350';

-- Navigation Bar (navigation:default)
UPDATE components
SET yaml = '- CustomNavigation:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-navigation-1-1772260068350';

-- NavBar with Tablist (navigation:default)
UPDATE components
SET yaml = '- CustomNavigation:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-navigation-2-1772260068350';

-- Mega Menu Navbar (navigation:default)
UPDATE components
SET yaml = '- CustomNavigation:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-navigation-3-1772260068350';

-- Minimal Mega Menu Navbar (navigation:default)
UPDATE components
SET yaml = '- CustomNavigation:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-navigation-4-1772260068350';

-- NavBar with Scrollable Content (navigation:default)
UPDATE components
SET yaml = '- CustomNavigation:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-navigation-5-1772260068350';

-- Sidebar Wide (sidebar:default)
UPDATE components
SET yaml = '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
'
WHERE id = 'comp-sidebars-1-1772260068350';

-- Narrow Sidebar (sidebar:default)
UPDATE components
SET yaml = '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
'
WHERE id = 'comp-sidebars-2-1772260068350';

-- Collapsible Sidebar (sidebar:default)
UPDATE components
SET yaml = '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
'
WHERE id = 'comp-sidebars-3-1772260068350';

-- Sidebar with Navbar (sidebar:default)
UPDATE components
SET yaml = '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
'
WHERE id = 'comp-sidebars-4-1772260068350';

-- Dropdown Sidebar (sidebar:default)
UPDATE components
SET yaml = '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
'
WHERE id = 'comp-sidebars-5-1772260068350';

-- Glass Floating Sidebar (sidebar:default)
UPDATE components
SET yaml = '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
'
WHERE id = 'comp-sidebars-6-1772260068350';

-- Animated Sidebar (sidebar:default)
UPDATE components
SET yaml = '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["[object Object]", "[object Object]", "[object Object]"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
'
WHERE id = 'comp-sidebars-7-1772260068350';

-- Animated Speed Dial (speedDial:default)
UPDATE components
SET yaml = '- CustomSpeedDial:
    Control: Gallery
    Properties:
      Items: =[]
      Width: =60
      Height: =300
'
WHERE id = 'comp-speed-dial-1-1772260068350';

-- Square Speed Dial (speedDial:default)
UPDATE components
SET yaml = '- CustomSpeedDial:
    Control: Gallery
    Properties:
      Items: =[]
      Width: =60
      Height: =300
'
WHERE id = 'comp-speed-dial-2-1772260068350';

-- Labeled Speed Dial (speedDial:default)
UPDATE components
SET yaml = '- CustomSpeedDial:
    Control: Gallery
    Properties:
      Items: =[]
      Width: =60
      Height: =300
'
WHERE id = 'comp-speed-dial-3-1772260068350';

-- Tab Bar (tab:basic)
UPDATE components
SET yaml = '- CustomTab:
    Control: Gallery
    Properties:
      Items: =[]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-tabs-1-1772260068350';

-- Tab Bar V2 (tab:v2)
UPDATE components
SET yaml = '- CustomTab:
    Control: Gallery
    Properties:
      Items: =[]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-tabs-2-1772260068350';

-- Pill Tabs (tab:pill)
UPDATE components
SET yaml = '- CustomTab:
    Control: Gallery
    Properties:
      Items: =[]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-tabs-3-1772260068350';

-- Segmented Tabs (tab:segmented)
UPDATE components
SET yaml = '- CustomTab:
    Control: Gallery
    Properties:
      Items: =[]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-tabs-4-1772260068350';

-- Animated Underline Tabs (tab:animated-underline)
UPDATE components
SET yaml = '- CustomTab:
    Control: Gallery
    Properties:
      Items: =[]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-tabs-5-1772260068350';

-- Animated Pill Tabs (tab:animated-pill)
UPDATE components
SET yaml = '- CustomTab:
    Control: Gallery
    Properties:
      Items: =[]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
'
WHERE id = 'comp-tabs-6-1772260068350';

-- Toast Notification (toast:default)
UPDATE components
SET yaml = '# Component YAML logic coming soon'
WHERE id = 'comp-toast-1-1772260068350';

-- Simple Notification (toast:default)
UPDATE components
SET yaml = '# Component YAML logic coming soon'
WHERE id = 'comp-toast-2-1772260068350';

-- Notification with Timer (toast:default)
UPDATE components
SET yaml = '# Component YAML logic coming soon'
WHERE id = 'comp-toast-3-1772260068350';

-- Status Notifications (toast:default)
UPDATE components
SET yaml = '# Component YAML logic coming soon'
WHERE id = 'comp-toast-4-1772260068350';

-- Queue Notifications (toast:default)
UPDATE components
SET yaml = '# Component YAML logic coming soon'
WHERE id = 'comp-toast-5-1772260068350';

-- Toggle (toggle:basic)
UPDATE components
SET yaml = '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =false
      OnFill: =RGBA(34, 197, 94, 1)
'
WHERE id = 'comp-toggles-1-1772260068350';

-- Toggle On/Off (toggle:on-off)
UPDATE components
SET yaml = '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =false
      OnFill: =RGBA(34, 197, 94, 1)
'
WHERE id = 'comp-toggles-2-1772260068350';

-- Toggle Square (toggle:square)
UPDATE components
SET yaml = '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =false
      OnFill: =RGBA(34, 197, 94, 1)
'
WHERE id = 'comp-toggles-3-1772260068350';

-- Toggle Lock (toggle:lock)
UPDATE components
SET yaml = '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =false
      OnFill: =RGBA(34, 197, 94, 1)
'
WHERE id = 'comp-toggles-4-1772260068350';

-- Toggle Check/X (toggle:check-x)
UPDATE components
SET yaml = '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =false
      OnFill: =RGBA(34, 197, 94, 1)
'
WHERE id = 'comp-toggles-5-1772260068350';

-- Toggle Outline (toggle:outline)
UPDATE components
SET yaml = '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =false
      OnFill: =RGBA(34, 197, 94, 1)
'
WHERE id = 'comp-toggles-6-1772260068350';

-- Input (inputField:default)
UPDATE components
SET yaml = '- CustomInput:
    Control: TextInput
    Properties:
      Default: =""
      HintText: ="Enter text"
      Width: =400
      Height: =45
      BorderThickness: =1
'
WHERE id = 'comp-input-fields-1-1772260068350';

-- Modern Input Label (inputField:default)
UPDATE components
SET yaml = '- CustomInput:
    Control: TextInput
    Properties:
      Default: =""
      HintText: ="Enter text"
      Width: =400
      Height: =45
      BorderThickness: =1
'
WHERE id = 'comp-input-fields-2-1772260068350';

