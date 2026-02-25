-- Seed: library content — 84 new distinct components
-- Generated: 2026-02-25

-- ============================================================
-- BUTTONS (7 new — total 8 with comp-button-primary)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-button-outline',
  'Outline Button',
  'buttons',
  'Transparent fill button with 2px blue border and colored text',
  '- CustomButton:
    Control: Button
    Properties:
      Text: ="Outline"
      Fill: =RGBA(255, 255, 255, 0)
      Color: =RGBA(59, 130, 246, 1)
      BorderColor: =RGBA(59, 130, 246, 1)
      BorderThickness: =2
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Width: =160
      Height: =40
',
  'button,outline,border,ghost',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-button-ghost',
  'Ghost Button',
  'buttons',
  'Subtle light-gray button with muted slate text and no border',
  '- CustomButton:
    Control: Button
    Properties:
      Text: ="Ghost"
      Fill: =RGBA(248, 250, 252, 1)
      Color: =RGBA(71, 85, 105, 1)
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Width: =160
      Height: =40
',
  'button,ghost,subtle,secondary',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-button-destructive',
  'Destructive Button',
  'buttons',
  'Red danger button for delete and destructive actions',
  '- CustomButton:
    Control: Button
    Properties:
      Text: ="Delete"
      Fill: =RGBA(239, 68, 68, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Width: =160
      Height: =40
',
  'button,destructive,danger,delete,red',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-button-success',
  'Success Button',
  'buttons',
  'Green confirm button for save, approve, and success actions',
  '- CustomButton:
    Control: Button
    Properties:
      Text: ="Confirm"
      Fill: =RGBA(34, 197, 94, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Width: =160
      Height: =40
',
  'button,success,confirm,green',
  5
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-button-pill',
  'Pill Button',
  'buttons',
  'Fully rounded pill-shape button for tags and modern UIs',
  '- CustomButton:
    Control: Button
    Properties:
      Text: ="Get Started"
      Fill: =RGBA(59, 130, 246, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =20
      RadiusTopRight: =20
      RadiusBottomLeft: =20
      RadiusBottomRight: =20
      Width: =160
      Height: =40
',
  'button,pill,rounded,modern',
  6
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-button-raised',
  'Raised Button',
  'buttons',
  'Primary button with drop shadow for elevated appearance',
  '- CustomButton:
    Control: Button
    Properties:
      Text: ="Elevated"
      Fill: =RGBA(59, 130, 246, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Width: =160
      Height: =40
      DropShadow: =DropShadow.Regular
',
  'button,raised,shadow,elevated',
  7
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-button-dark',
  'Dark Button',
  'buttons',
  'Deep slate dark-themed button for dark UI contexts',
  '- CustomButton:
    Control: Button
    Properties:
      Text: ="Continue"
      Fill: =RGBA(15, 23, 42, 1)
      Color: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Width: =160
      Height: =40
',
  'button,dark,slate,night',
  8
);

-- ============================================================
-- BADGES (3 new — total 4 with comp-badge-status)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-badge-info',
  'Info Badge',
  'badges',
  'Blue informational badge for pending or neutral states',
  '- BadgeContainer:
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
            Text: ="PENDING"
            Color: =RGBA(29, 78, 216, 1)
            FontWeight: =FontWeight.Bold
            Size: =10
            Align: =Align.Center
            Width: =120
            Height: =32
',
  'badge,info,pending,blue',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-badge-warning',
  'Warning Badge',
  'badges',
  'Amber warning badge for review or at-risk states',
  '- BadgeContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(234, 179, 8, 0.15)
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
            Text: ="WARNING"
            Color: =RGBA(161, 98, 7, 1)
            FontWeight: =FontWeight.Bold
            Size: =10
            Align: =Align.Center
            Width: =120
            Height: =32
',
  'badge,warning,review,amber,yellow',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-badge-error',
  'Error Badge',
  'badges',
  'Red error badge for failed or critical states',
  '- BadgeContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(239, 68, 68, 0.1)
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
            Text: ="ERROR"
            Color: =RGBA(185, 28, 28, 1)
            FontWeight: =FontWeight.Bold
            Size: =10
            Align: =Align.Center
            Width: =120
            Height: =32
',
  'badge,error,failed,red,critical',
  4
);

-- ============================================================
-- ACCORDIONS (3 new — total 4 with comp-accordion-faq)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-accordion-features',
  'Feature Accordion',
  'accordions',
  'Expandable feature highlights list for product or app pages',
  '- Accordion_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Width: =400
      Height: =180
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
                  Text: ="Real-time Preview"
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
                  Text: ="One-click YAML Export"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
      - AccItem_2:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =120
            Width: =400
            Height: =50
            Fill: =RGBA(248, 250, 252, 1)
          Children:
            - AccLabel_2:
                Control: Label
                Properties:
                  Text: ="AI-Assisted Generation"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
',
  'accordion,features,expand,product',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-accordion-settings',
  'Settings Accordion',
  'accordions',
  'Expandable settings categories for configuration panels',
  '- Accordion_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Width: =400
      Height: =180
    Children:
      - AccItem_0:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =0
            Width: =400
            Height: =50
            Fill: =RGBA(241, 245, 249, 1)
          Children:
            - AccLabel_0:
                Control: Label
                Properties:
                  Text: ="Account Settings"
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
            Fill: =RGBA(241, 245, 249, 1)
          Children:
            - AccLabel_1:
                Control: Label
                Properties:
                  Text: ="Notification Preferences"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
      - AccItem_2:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =120
            Width: =400
            Height: =50
            Fill: =RGBA(241, 245, 249, 1)
          Children:
            - AccLabel_2:
                Control: Label
                Properties:
                  Text: ="Privacy and Security"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
',
  'accordion,settings,config,preferences',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-accordion-help',
  'Help Center Accordion',
  'accordions',
  'Expandable help and support articles for self-service portals',
  '- Accordion_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Width: =400
      Height: =180
    Children:
      - AccItem_0:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =0
            Width: =400
            Height: =50
            Fill: =RGBA(255, 255, 255, 1)
          Children:
            - AccLabel_0:
                Control: Label
                Properties:
                  Text: ="Getting Started Guide"
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
            Fill: =RGBA(255, 255, 255, 1)
          Children:
            - AccLabel_1:
                Control: Label
                Properties:
                  Text: ="Billing and Subscription"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
      - AccItem_2:
          Control: GroupContainer
          Variant: ManualLayout
          Properties:
            Y: =120
            Width: =400
            Height: =50
            Fill: =RGBA(255, 255, 255, 1)
          Children:
            - AccLabel_2:
                Control: Label
                Properties:
                  Text: ="Contact Support"
                  X: =15
                  Width: =370
                  VerticalAlign: =VerticalAlign.Middle
                  Height: =50
',
  'accordion,help,support,faq,articles',
  4
);

-- ============================================================
-- APP SHELLS (3 new — total 4 with comp-shell-default)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-shell-dark',
  'Dark App Shell',
  'app-shells',
  'Deep slate dark-themed app header for night mode layouts',
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
  'shell,header,dark,night,nav,layout',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-shell-green',
  'Brand Green Shell',
  'app-shells',
  'Brand green app header for environment or sustainability apps',
  '- AppShell:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(22, 163, 74, 1)
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
  'shell,header,green,brand,nav,layout',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-shell-purple',
  'Purple Shell',
  'app-shells',
  'Purple-branded app header for creative and premium applications',
  '- AppShell:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(124, 58, 237, 1)
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
  'shell,header,purple,premium,nav,layout',
  4
);

-- ============================================================
-- FORMS (4 new — total 5 with comp-form-contact)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-form-login',
  'Login Form',
  'forms',
  'Username and password login card with sign-in action button',
  '- Container_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Light
      Width: =500
      Height: =380
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Sign In"
            Size: =20
            FontWeight: =FontWeight.Bold
            X: =40
            Y: =40
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="Enter your credentials to continue"
            Size: =12
            Color: =RGBA(100, 116, 139, 1)
            X: =40
            Y: =80
      - Label_0:
          Control: Label
          Properties:
            Text: ="Username"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =130
      - Input_0:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Enter your username"
            X: =40
            Y: =160
            Width: =420
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - Label_1:
          Control: Label
          Properties:
            Text: ="Password"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =220
      - Input_1:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Enter your password"
            X: =40
            Y: =250
            Width: =420
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - BtnPrimary:
          Control: Button
          Properties:
            Text: ="Sign In"
            X: =40
            Y: =330
            Width: =420
            Height: =40
            Fill: =RGBA(59, 130, 246, 1)
            Color: =RGBA(255, 255, 255, 1)
',
  'form,login,auth,sign-in,credentials',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-form-register',
  'Registration Form',
  'forms',
  'Full registration card with name, email, password fields and create account button',
  '- Container_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Light
      Width: =500
      Height: =570
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Create Account"
            Size: =20
            FontWeight: =FontWeight.Bold
            X: =40
            Y: =40
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="Fill in your details to get started"
            Size: =12
            Color: =RGBA(100, 116, 139, 1)
            X: =40
            Y: =80
      - Label_0:
          Control: Label
          Properties:
            Text: ="Full Name"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =130
      - Input_0:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Enter your full name"
            X: =40
            Y: =160
            Width: =420
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - Label_1:
          Control: Label
          Properties:
            Text: ="Email"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =220
      - Input_1:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Enter your email address"
            X: =40
            Y: =250
            Width: =420
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - Label_2:
          Control: Label
          Properties:
            Text: ="Password"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =310
      - Input_2:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Create a password"
            X: =40
            Y: =340
            Width: =420
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - Label_3:
          Control: Label
          Properties:
            Text: ="Confirm Password"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =400
      - Input_3:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Confirm your password"
            X: =40
            Y: =430
            Width: =420
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - BtnPrimary:
          Control: Button
          Properties:
            Text: ="Create Account"
            X: =40
            Y: =510
            Width: =420
            Height: =40
            Fill: =RGBA(59, 130, 246, 1)
            Color: =RGBA(255, 255, 255, 1)
',
  'form,register,signup,create-account',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-form-search',
  'Search Form',
  'forms',
  'Minimal search card with a single text input and search button',
  '- Container_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Light
      Width: =500
      Height: =200
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Search"
            Size: =20
            FontWeight: =FontWeight.Bold
            X: =40
            Y: =40
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="Find anything in your workspace"
            Size: =12
            Color: =RGBA(100, 116, 139, 1)
            X: =40
            Y: =80
      - Label_0:
          Control: Label
          Properties:
            Text: ="Search Query"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =130
      - Input_0:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Type to search..."
            X: =40
            Y: =160
            Width: =300
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - BtnPrimary:
          Control: Button
          Properties:
            Text: ="Search"
            X: =360
            Y: =160
            Width: =100
            Height: =40
            Fill: =RGBA(59, 130, 246, 1)
            Color: =RGBA(255, 255, 255, 1)
',
  'form,search,filter,find',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-form-feedback',
  'Feedback Form',
  'forms',
  'User feedback card with name, email, and message fields',
  '- Container_Main:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Light
      Width: =500
      Height: =480
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Send Feedback"
            Size: =20
            FontWeight: =FontWeight.Bold
            X: =40
            Y: =40
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="We value your thoughts and suggestions"
            Size: =12
            Color: =RGBA(100, 116, 139, 1)
            X: =40
            Y: =80
      - Label_0:
          Control: Label
          Properties:
            Text: ="Name"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =130
      - Input_0:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Your name"
            X: =40
            Y: =160
            Width: =420
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - Label_1:
          Control: Label
          Properties:
            Text: ="Email"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =220
      - Input_1:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="your@email.com"
            X: =40
            Y: =250
            Width: =420
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - Label_2:
          Control: Label
          Properties:
            Text: ="Message"
            FontWeight: =FontWeight.Semibold
            X: =40
            Y: =310
      - Input_2:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Tell us what you think..."
            X: =40
            Y: =340
            Width: =420
            Height: =80
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - BtnPrimary:
          Control: Button
          Properties:
            Text: ="Send Feedback"
            X: =40
            Y: =460
            Width: =200
            Height: =40
            Fill: =RGBA(59, 130, 246, 1)
            Color: =RGBA(255, 255, 255, 1)
      - BtnSecondary:
          Control: Button
          Properties:
            Text: ="Cancel"
            X: =260
            Y: =460
            Width: =200
            Height: =40
            Fill: =RGBA(241, 245, 249, 1)
            Color: =RGBA(71, 85, 105, 1)
',
  'form,feedback,survey,message',
  5
);

-- ============================================================
-- INPUT FIELDS (5 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-input-text',
  'Text Input',
  'input-fields',
  'Basic single-line text input with placeholder hint',
  '- CustomInput:
    Control: TextInput
    Properties:
      Default: =""
      HintText: ="Enter text here..."
      Width: =400
      Height: =45
      BorderThickness: =1
',
  'input,text,single-line,basic',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-input-email',
  'Email Input',
  'input-fields',
  'Email address input with email placeholder hint',
  '- CustomInput:
    Control: TextInput
    Properties:
      Default: =""
      HintText: ="Enter your email address"
      Width: =400
      Height: =45
      BorderThickness: =1
',
  'input,email,address',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-input-password',
  'Password Input',
  'input-fields',
  'Password field with secure entry hint',
  '- CustomInput:
    Control: TextInput
    Properties:
      Default: =""
      HintText: ="Enter your password"
      Width: =400
      Height: =45
      BorderThickness: =1
',
  'input,password,secure,auth',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-input-phone',
  'Phone Input',
  'input-fields',
  'Phone number input with format hint',
  '- CustomInput:
    Control: TextInput
    Properties:
      Default: =""
      HintText: ="+1 (555) 000-0000"
      Width: =400
      Height: =45
      BorderThickness: =1
',
  'input,phone,number,contact',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-input-search',
  'Search Input',
  'input-fields',
  'Search field with magnifier hint for filter and discovery UIs',
  '- CustomInput:
    Control: TextInput
    Properties:
      Default: =""
      HintText: ="Search..."
      Width: =400
      Height: =45
      BorderThickness: =1
',
  'input,search,filter,find',
  5
);

-- ============================================================
-- TOGGLES (5 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toggle-on-green',
  'Toggle On (Green)',
  'toggles',
  'Green active toggle switch — default ON state',
  '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =true
      OnFill: =RGBA(34, 197, 94, 1)
',
  'toggle,on,green,active,enabled',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toggle-off',
  'Toggle Off',
  'toggles',
  'Gray inactive toggle switch — default OFF state',
  '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =false
      OnFill: =RGBA(34, 197, 94, 1)
',
  'toggle,off,gray,inactive,disabled',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toggle-on-blue',
  'Toggle On (Blue)',
  'toggles',
  'Blue active toggle switch — brand blue ON state',
  '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =true
      OnFill: =RGBA(59, 130, 246, 1)
',
  'toggle,on,blue,brand,active',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toggle-on-red',
  'Toggle On (Red)',
  'toggles',
  'Red danger toggle for destructive or opt-out settings',
  '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =true
      OnFill: =RGBA(239, 68, 68, 1)
',
  'toggle,on,red,danger,warning',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toggle-on-purple',
  'Toggle On (Purple)',
  'toggles',
  'Purple premium toggle for pro or feature-flag settings',
  '- CustomToggle:
    Control: Toggle
    Properties:
      Default: =true
      OnFill: =RGBA(124, 58, 237, 1)
',
  'toggle,on,purple,premium,pro',
  5
);

-- ============================================================
-- DROPDOWNS (4 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-dropdown-region',
  'Region Dropdown',
  'dropdowns',
  'Geographic region selector with global regions',
  '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["North America", "Europe", "Asia Pacific", "Latin America"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'dropdown,region,geography,select',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-dropdown-status',
  'Status Dropdown',
  'dropdowns',
  'Work status selector for task and ticket management',
  '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["Active", "Pending", "On Hold", "Closed"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'dropdown,status,workflow,select',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-dropdown-priority',
  'Priority Dropdown',
  'dropdowns',
  'Issue priority picker for project and ticket workflows',
  '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["Critical", "High", "Medium", "Low"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'dropdown,priority,severity,select',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-dropdown-month',
  'Month Dropdown',
  'dropdowns',
  'Calendar month picker for date filtering and reporting',
  '- CustomDropdown:
    Control: Gallery
    Properties:
      Items: =["January", "February", "March", "April", "May", "June"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'dropdown,month,calendar,date,select',
  4
);

-- ============================================================
-- BUTTON GROUPS (3 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-btngroup-timerange',
  'Time Range Group',
  'button-group',
  'Segmented time range selector — Today, Week, Month, Year',
  '- CustomButtongroup:
    Control: Gallery
    Properties:
      Items: =["Today", "Week", "Month", "Year"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'button-group,time,range,segmented',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-btngroup-viewmode',
  'View Mode Group',
  'button-group',
  'Segmented view mode toggle — Grid, List, Table',
  '- CustomButtongroup:
    Control: Gallery
    Properties:
      Items: =["Grid", "List", "Table"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'button-group,view,layout,grid,list',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-btngroup-filter',
  'Filter Group',
  'button-group',
  'Segmented filter selector — All, Active, Draft, Archived',
  '- CustomButtongroup:
    Control: Gallery
    Properties:
      Items: =["All", "Active", "Draft", "Archived"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'button-group,filter,status,segmented',
  3
);

-- ============================================================
-- CARDS (5 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-card-content',
  'Content Card',
  'cards',
  'Standard content card with title, category label, and body text',
  '- CustomCard:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =12
      RadiusTopRight: =12
      RadiusBottomLeft: =12
      RadiusBottomRight: =12
      Width: =400
      Height: =200
      DropShadow: =DropShadow.Regular
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Project Alpha"
            FontWeight: =FontWeight.Bold
            Size: =16
            X: =20
            Y: =20
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="Web Development"
            Color: =RGBA(59, 130, 246, 1)
            Size: =11
            X: =20
            Y: =50
      - BodyLabel:
          Control: Label
          Properties:
            Text: ="Comprehensive suite of web components for Power Apps."
            Color: =RGBA(100, 116, 139, 1)
            Size: =12
            X: =20
            Y: =80
            Width: =360
',
  'card,content,project,text',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-card-stats',
  'Stats Card',
  'cards',
  'KPI metric card with large number, label, and trend indicator',
  '- CustomCard:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =12
      RadiusTopRight: =12
      RadiusBottomLeft: =12
      RadiusBottomRight: =12
      Width: =400
      Height: =200
      DropShadow: =DropShadow.Regular
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="1,284"
            FontWeight: =FontWeight.Bold
            Size: =32
            Color: =RGBA(15, 23, 42, 1)
            X: =20
            Y: =50
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="Total Users"
            Color: =RGBA(100, 116, 139, 1)
            Size: =12
            X: =20
            Y: =110
',
  'card,stats,kpi,metric,number',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-card-profile',
  'Profile Card',
  'cards',
  'User profile card with name, role, and contact info',
  '- CustomCard:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =12
      RadiusTopRight: =12
      RadiusBottomLeft: =12
      RadiusBottomRight: =12
      Width: =400
      Height: =200
      DropShadow: =DropShadow.Regular
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Sarah Johnson"
            FontWeight: =FontWeight.Bold
            Size: =16
            X: =20
            Y: =30
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="Senior Developer"
            Color: =RGBA(59, 130, 246, 1)
            Size: =12
            X: =20
            Y: =60
      - EmailLabel:
          Control: Label
          Properties:
            Text: ="sarah.johnson@company.com"
            Color: =RGBA(100, 116, 139, 1)
            Size: =11
            X: =20
            Y: =90
',
  'card,profile,user,person,contact',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-card-action',
  'Action Card',
  'cards',
  'Card with title, description, and primary action button',
  '- CustomCard:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      RadiusTopLeft: =12
      RadiusTopRight: =12
      RadiusBottomLeft: =12
      RadiusBottomRight: =12
      Width: =400
      Height: =200
      DropShadow: =DropShadow.Regular
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Deploy to Production"
            FontWeight: =FontWeight.Bold
            Size: =16
            X: =20
            Y: =20
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="This will push changes to all users"
            Color: =RGBA(100, 116, 139, 1)
            Size: =12
            X: =20
            Y: =55
      - ActionBtn:
          Control: Button
          Properties:
            Text: ="Deploy Now"
            X: =20
            Y: =140
            Width: =150
            Height: =36
            Fill: =RGBA(59, 130, 246, 1)
            Color: =RGBA(255, 255, 255, 1)
            RadiusTopLeft: =8
            RadiusTopRight: =8
            RadiusBottomLeft: =8
            RadiusBottomRight: =8
',
  'card,action,cta,button,deploy',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-card-minimal',
  'Minimal Card',
  'cards',
  'Clean minimal card with just a headline and subtitle, no shadow',
  '- CustomCard:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(248, 250, 252, 1)
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Width: =400
      Height: =200
    Children:
      - TitleLabel:
          Control: Label
          Properties:
            Text: ="Minimal Card"
            FontWeight: =FontWeight.Bold
            Size: =16
            Color: =RGBA(15, 23, 42, 1)
            X: =24
            Y: =24
      - SubtitleLabel:
          Control: Label
          Properties:
            Text: ="Clean and understated layout"
            Color: =RGBA(100, 116, 139, 1)
            Size: =12
            X: =24
            Y: =58
',
  'card,minimal,clean,simple',
  5
);

-- ============================================================
-- NAVIGATION (4 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-nav-app',
  'App Navigation',
  'navigation',
  'Main app top navigation bar — Dashboard, Projects, Reports, Settings',
  '- CustomNavigation:
    Control: Gallery
    Properties:
      Items: =["Dashboard", "Projects", "Reports", "Settings"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'navigation,topbar,main,menu',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-nav-admin',
  'Admin Navigation',
  'navigation',
  'Admin panel navigation bar — Users, Roles, Config, Audit Logs',
  '- CustomNavigation:
    Control: Gallery
    Properties:
      Items: =["Users", "Roles", "Config", "Audit Logs"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'navigation,admin,panel,menu',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-nav-docs',
  'Docs Navigation',
  'navigation',
  'Documentation site navigation — Overview, API, Examples, Support',
  '- CustomNavigation:
    Control: Gallery
    Properties:
      Items: =["Overview", "API", "Examples", "Support"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'navigation,docs,documentation,menu',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-nav-minimal',
  'Minimal Navigation',
  'navigation',
  'Simple three-item navigation for landing pages and marketing sites',
  '- CustomNavigation:
    Control: Gallery
    Properties:
      Items: =["Home", "About", "Contact"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'navigation,minimal,simple,landing',
  4
);

-- ============================================================
-- SIDEBARS (5 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-sidebar-app',
  'App Sidebar',
  'sidebars',
  'Standard app sidebar — Home, Analytics, Reports, Users, Settings',
  '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["Home", "Analytics", "Reports", "Users", "Settings"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
',
  'sidebar,app,navigation,vertical',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-sidebar-admin',
  'Admin Sidebar',
  'sidebars',
  'Admin control panel sidebar — Dashboard, Users, Roles, Config',
  '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["Dashboard", "Users", "Roles", "Config", "Logs"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
',
  'sidebar,admin,panel,control',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-sidebar-docs',
  'Docs Sidebar',
  'sidebars',
  'Documentation left navigation — Getting Started, Installation, Usage, API',
  '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["Getting Started", "Installation", "Usage", "API Reference"]
      Layout: =Layout.Vertical
      Width: =240
      Height: =768
',
  'sidebar,docs,documentation,reference',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-sidebar-narrow',
  'Narrow Sidebar',
  'sidebars',
  'Compact 150px icon sidebar for space-efficient layouts',
  '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["Home", "Stats", "Files", "Settings"]
      Layout: =Layout.Vertical
      Width: =150
      Height: =768
',
  'sidebar,narrow,compact,icon',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-sidebar-wide',
  'Wide Sidebar',
  'sidebars',
  'Wide 300px sidebar for rich navigation with descriptive labels',
  '- CustomSidebar:
    Control: Gallery
    Properties:
      Items: =["Overview", "Projects", "Reports", "Archive", "Admin"]
      Layout: =Layout.Vertical
      Width: =300
      Height: =768
',
  'sidebar,wide,expanded,full',
  5
);

-- ============================================================
-- TABS (5 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-tab-overview',
  'Overview Tabs',
  'tabs',
  'Standard three-tab strip — Overview, Details, History',
  '- CustomTab:
    Control: Gallery
    Properties:
      Items: =["Overview", "Details", "History"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'tabs,overview,standard,navigation',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-tab-settings',
  'Settings Tabs',
  'tabs',
  'Settings panel tab strip — Profile, Security, Notifications, Billing',
  '- CustomTab:
    Control: Gallery
    Properties:
      Items: =["Profile", "Security", "Notifications", "Billing"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'tabs,settings,preferences,panel',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-tab-admin',
  'Admin Tabs',
  'tabs',
  'Admin panel tab strip — Users, Roles, Permissions, Audit',
  '- CustomTab:
    Control: Gallery
    Properties:
      Items: =["Users", "Roles", "Permissions", "Audit"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'tabs,admin,roles,permissions',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-tab-analytics',
  'Analytics Tabs',
  'tabs',
  'Analytics dashboard tabs — Summary, Trends, Breakdown, Export',
  '- CustomTab:
    Control: Gallery
    Properties:
      Items: =["Summary", "Trends", "Breakdown", "Export"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'tabs,analytics,data,reports',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-tab-content',
  'Content Tabs',
  'tabs',
  'Content management tabs — Published, Drafts, Archived',
  '- CustomTab:
    Control: Gallery
    Properties:
      Items: =["Published", "Drafts", "Archived"]
      Layout: =Layout.Horizontal
      Width: =1366
      Height: =60
',
  'tabs,content,cms,publish',
  5
);

-- ============================================================
-- MODALS (6 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-modal-confirm',
  'Confirm Modal',
  'modals',
  'Standard confirm dialog with title, message, and two action buttons',
  '- CustomModal:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Bold
    Children:
      - ModalTitle:
          Control: Label
          Properties:
            Text: ="Confirm Action"
            FontWeight: =FontWeight.Bold
            Size: =18
            X: =30
            Y: =30
      - ModalBody:
          Control: Label
          Properties:
            Text: ="Are you sure you want to proceed? This cannot be undone."
            Color: =RGBA(100, 116, 139, 1)
            Size: =12
            X: =30
            Y: =75
            Width: =440
      - BtnConfirm:
          Control: Button
          Properties:
            Text: ="Confirm"
            X: =30
            Y: =220
            Width: =200
            Height: =40
            Fill: =RGBA(59, 130, 246, 1)
            Color: =RGBA(255, 255, 255, 1)
      - BtnCancel:
          Control: Button
          Properties:
            Text: ="Cancel"
            X: =250
            Y: =220
            Width: =200
            Height: =40
            Fill: =RGBA(241, 245, 249, 1)
            Color: =RGBA(71, 85, 105, 1)
',
  'modal,confirm,dialog,action',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-modal-delete',
  'Delete Modal',
  'modals',
  'Destructive delete confirmation dialog with red danger button',
  '- CustomModal:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Bold
    Children:
      - ModalTitle:
          Control: Label
          Properties:
            Text: ="Delete Item"
            FontWeight: =FontWeight.Bold
            Size: =18
            Color: =RGBA(239, 68, 68, 1)
            X: =30
            Y: =30
      - ModalBody:
          Control: Label
          Properties:
            Text: ="This item will be permanently deleted. This action cannot be undone."
            Color: =RGBA(100, 116, 139, 1)
            Size: =12
            X: =30
            Y: =75
            Width: =440
      - BtnDelete:
          Control: Button
          Properties:
            Text: ="Delete"
            X: =30
            Y: =220
            Width: =200
            Height: =40
            Fill: =RGBA(239, 68, 68, 1)
            Color: =RGBA(255, 255, 255, 1)
      - BtnCancel:
          Control: Button
          Properties:
            Text: ="Cancel"
            X: =250
            Y: =220
            Width: =200
            Height: =40
            Fill: =RGBA(241, 245, 249, 1)
            Color: =RGBA(71, 85, 105, 1)
',
  'modal,delete,destructive,danger',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-modal-success',
  'Success Modal',
  'modals',
  'Green success confirmation dialog for completed actions',
  '- CustomModal:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =260
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Bold
    Children:
      - ModalTitle:
          Control: Label
          Properties:
            Text: ="Success!"
            FontWeight: =FontWeight.Bold
            Size: =18
            Color: =RGBA(22, 163, 74, 1)
            X: =30
            Y: =30
      - ModalBody:
          Control: Label
          Properties:
            Text: ="Your changes have been saved successfully."
            Color: =RGBA(100, 116, 139, 1)
            Size: =12
            X: =30
            Y: =75
            Width: =440
      - BtnClose:
          Control: Button
          Properties:
            Text: ="Continue"
            X: =30
            Y: =190
            Width: =440
            Height: =40
            Fill: =RGBA(34, 197, 94, 1)
            Color: =RGBA(255, 255, 255, 1)
',
  'modal,success,saved,complete',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-modal-warning',
  'Warning Modal',
  'modals',
  'Amber warning dialog for cautionary actions requiring user awareness',
  '- CustomModal:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =300
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Bold
    Children:
      - ModalTitle:
          Control: Label
          Properties:
            Text: ="Warning"
            FontWeight: =FontWeight.Bold
            Size: =18
            Color: =RGBA(161, 98, 7, 1)
            X: =30
            Y: =30
      - ModalBody:
          Control: Label
          Properties:
            Text: ="This action may have unintended consequences. Please review before continuing."
            Color: =RGBA(100, 116, 139, 1)
            Size: =12
            X: =30
            Y: =75
            Width: =440
      - BtnProceed:
          Control: Button
          Properties:
            Text: ="I Understand"
            X: =30
            Y: =220
            Width: =200
            Height: =40
            Fill: =RGBA(234, 179, 8, 1)
            Color: =RGBA(255, 255, 255, 1)
      - BtnCancel:
          Control: Button
          Properties:
            Text: ="Cancel"
            X: =250
            Y: =220
            Width: =200
            Height: =40
            Fill: =RGBA(241, 245, 249, 1)
            Color: =RGBA(71, 85, 105, 1)
',
  'modal,warning,caution,alert',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-modal-info',
  'Info Modal',
  'modals',
  'Informational dialog for system messages and announcements',
  '- CustomModal:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =260
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Bold
    Children:
      - ModalTitle:
          Control: Label
          Properties:
            Text: ="System Update"
            FontWeight: =FontWeight.Bold
            Size: =18
            X: =30
            Y: =30
      - ModalBody:
          Control: Label
          Properties:
            Text: ="A new version is available. Update now for the latest features."
            Color: =RGBA(100, 116, 139, 1)
            Size: =12
            X: =30
            Y: =75
            Width: =440
      - BtnClose:
          Control: Button
          Properties:
            Text: ="Dismiss"
            X: =30
            Y: =190
            Width: =440
            Height: =40
            Fill: =RGBA(59, 130, 246, 1)
            Color: =RGBA(255, 255, 255, 1)
',
  'modal,info,announcement,update',
  5
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-modal-form',
  'Form Modal',
  'modals',
  'Modal dialog containing a form input for quick data capture',
  '- CustomModal:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Width: =500
      Height: =340
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Bold
    Children:
      - ModalTitle:
          Control: Label
          Properties:
            Text: ="New Project"
            FontWeight: =FontWeight.Bold
            Size: =18
            X: =30
            Y: =30
      - ModalLabel:
          Control: Label
          Properties:
            Text: ="Project Name"
            FontWeight: =FontWeight.Semibold
            Size: =12
            X: =30
            Y: =90
      - ModalInput:
          Control: TextInput
          Properties:
            Default: =""
            HintText: ="Enter project name"
            X: =30
            Y: =120
            Width: =440
            Height: =40
            BorderThickness: =1
            BorderColor: =RGBA(226, 232, 240, 1)
      - BtnCreate:
          Control: Button
          Properties:
            Text: ="Create"
            X: =30
            Y: =260
            Width: =200
            Height: =40
            Fill: =RGBA(59, 130, 246, 1)
            Color: =RGBA(255, 255, 255, 1)
      - BtnCancel:
          Control: Button
          Properties:
            Text: ="Cancel"
            X: =250
            Y: =260
            Width: =200
            Height: =40
            Fill: =RGBA(241, 245, 249, 1)
            Color: =RGBA(71, 85, 105, 1)
',
  'modal,form,input,create,dialog',
  6
);

-- ============================================================
-- TOAST (5 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toast-success',
  'Success Toast',
  'toast',
  'Green success notification banner for completed actions',
  '- CustomToast:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(34, 197, 94, 1)
      Width: =350
      Height: =60
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
    Children:
      - ToastLabel:
          Control: Label
          Properties:
            Text: ="Changes saved successfully"
            Color: =RGBA(255, 255, 255, 1)
            FontWeight: =FontWeight.Semibold
            X: =15
            Y: =18
            Size: =13
',
  'toast,success,saved,green,notification',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toast-error',
  'Error Toast',
  'toast',
  'Red error notification banner for failed or invalid actions',
  '- CustomToast:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(239, 68, 68, 1)
      Width: =350
      Height: =60
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
    Children:
      - ToastLabel:
          Control: Label
          Properties:
            Text: ="An error occurred. Please try again."
            Color: =RGBA(255, 255, 255, 1)
            FontWeight: =FontWeight.Semibold
            X: =15
            Y: =18
            Size: =13
',
  'toast,error,failed,red,alert',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toast-warning',
  'Warning Toast',
  'toast',
  'Amber warning notification banner for cautionary states',
  '- CustomToast:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(234, 179, 8, 1)
      Width: =350
      Height: =60
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
    Children:
      - ToastLabel:
          Control: Label
          Properties:
            Text: ="Your session will expire in 5 minutes"
            Color: =RGBA(255, 255, 255, 1)
            FontWeight: =FontWeight.Semibold
            X: =15
            Y: =18
            Size: =13
',
  'toast,warning,amber,caution',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toast-info',
  'Info Toast',
  'toast',
  'Blue informational notification banner for system messages',
  '- CustomToast:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(59, 130, 246, 1)
      Width: =350
      Height: =60
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
    Children:
      - ToastLabel:
          Control: Label
          Properties:
            Text: ="New features available — explore now"
            Color: =RGBA(255, 255, 255, 1)
            FontWeight: =FontWeight.Semibold
            X: =15
            Y: =18
            Size: =13
',
  'toast,info,blue,notice,system',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-toast-neutral',
  'Neutral Toast',
  'toast',
  'Slate dark neutral notification banner for general messages',
  '- CustomToast:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(71, 85, 105, 1)
      Width: =350
      Height: =60
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
    Children:
      - ToastLabel:
          Control: Label
          Properties:
            Text: ="Copied to clipboard"
            Color: =RGBA(255, 255, 255, 1)
            FontWeight: =FontWeight.Semibold
            X: =15
            Y: =18
            Size: =13
',
  'toast,neutral,slate,dark,message',
  5
);

-- ============================================================
-- SPEED DIAL (3 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-speeddial-create',
  'Create Speed Dial',
  'speed-dial',
  'Floating action button with create options — Document, Spreadsheet, Presentation',
  '- CustomSpeedDial:
    Control: Gallery
    Properties:
      Items: =["Document", "Spreadsheet", "Presentation"]
      Width: =60
      Height: =300
',
  'speed-dial,fab,create,new,floating',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-speeddial-share',
  'Share Speed Dial',
  'speed-dial',
  'Floating action button with share options — Email, Message, Post',
  '- CustomSpeedDial:
    Control: Gallery
    Properties:
      Items: =["Email", "Message", "Post"]
      Width: =60
      Height: =240
',
  'speed-dial,fab,share,social,floating',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-speeddial-files',
  'Files Speed Dial',
  'speed-dial',
  'Floating action button with file operations — Upload, Download, Share',
  '- CustomSpeedDial:
    Control: Gallery
    Properties:
      Items: =["Upload", "Download", "Share"]
      Width: =60
      Height: =240
',
  'speed-dial,fab,files,upload,download',
  3
);

-- ============================================================
-- DRAWERS (4 new — total 5 with comp-drawer-default)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-drawer-dark',
  'Dark Drawer',
  'drawers',
  'Deep navy dark side drawer for dark-themed applications',
  '- DrawerContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(15, 23, 42, 1)
      Width: =300
      Height: =768
    Children:
      - DrawerTitle:
          Control: Label
          Properties:
            Text: ="Main Menu"
            Color: =RGBA(255, 255, 255, 1)
            X: =20
            Y: =20
            Size: =18
            FontWeight: =FontWeight.Bold
',
  'drawer,dark,navy,side,panel',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-drawer-blue',
  'Blue Drawer',
  'drawers',
  'Brand blue side drawer matching primary action color',
  '- DrawerContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(59, 130, 246, 1)
      Width: =300
      Height: =768
    Children:
      - DrawerTitle:
          Control: Label
          Properties:
            Text: ="Navigation"
            Color: =RGBA(255, 255, 255, 1)
            X: =20
            Y: =20
            Size: =18
            FontWeight: =FontWeight.Bold
',
  'drawer,blue,brand,side,panel',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-drawer-light',
  'Light Drawer',
  'drawers',
  'Clean white light-themed drawer for light mode layouts',
  '- DrawerContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(248, 250, 252, 1)
      Width: =300
      Height: =768
    Children:
      - DrawerTitle:
          Control: Label
          Properties:
            Text: ="Navigation"
            Color: =RGBA(15, 23, 42, 1)
            X: =20
            Y: =20
            Size: =18
            FontWeight: =FontWeight.Bold
',
  'drawer,light,white,side,panel',
  4
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-drawer-green',
  'Green Drawer',
  'drawers',
  'Green-themed side drawer for environmental or health applications',
  '- DrawerContainer:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(22, 163, 74, 1)
      Width: =300
      Height: =768
    Children:
      - DrawerTitle:
          Control: Label
          Properties:
            Text: ="Main Menu"
            Color: =RGBA(255, 255, 255, 1)
            X: =20
            Y: =20
            Size: =18
            FontWeight: =FontWeight.Bold
',
  'drawer,green,brand,side,panel',
  5
);

-- ============================================================
-- GALLERY (4 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-gallery-grid',
  'Grid Gallery',
  'gallery',
  'Card-grid data gallery with default template size for image and list data',
  '- CustomGallery:
    Control: Gallery
    Properties:
      Items: =Filter(DataSource, true)
      TemplateSize: =120
',
  'gallery,grid,cards,data',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-gallery-list',
  'List Gallery',
  'gallery',
  'Compact list-style gallery with small template rows for dense data',
  '- CustomGallery:
    Control: Gallery
    Properties:
      Items: =Filter(DataSource, true)
      TemplateSize: =60
',
  'gallery,list,rows,data,compact',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-gallery-large',
  'Large Card Gallery',
  'gallery',
  'Large template gallery for rich media cards and featured content',
  '- CustomGallery:
    Control: Gallery
    Properties:
      Items: =Filter(DataSource, true)
      TemplateSize: =200
',
  'gallery,large,media,featured,rich',
  3
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-gallery-flex',
  'Flexible Gallery',
  'gallery',
  'Flexible 160px template gallery suitable for most content types',
  '- CustomGallery:
    Control: Gallery
    Properties:
      Items: =Filter(DataSource, true)
      TemplateSize: =160
',
  'gallery,flexible,general,content',
  4
);

-- ============================================================
-- CALENDARS (3 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-calendar-month',
  'Monthly Calendar',
  'calendars',
  'Full-width monthly calendar view for event and schedule management',
  '- CustomCalendar:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Width: =640
      Height: =480
',
  'calendar,month,schedule,events,full',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-calendar-week',
  'Weekly Calendar',
  'calendars',
  'Compact weekly view for daily task and appointment scheduling',
  '- CustomCalendar:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Width: =640
      Height: =320
',
  'calendar,week,compact,appointments',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-calendar-mini',
  'Mini Calendar',
  'calendars',
  'Small sidebar calendar widget for date picking and quick reference',
  '- CustomCalendar:
    Control: GroupContainer
    Variant: ManualLayout
    Properties:
      Width: =300
      Height: =300
',
  'calendar,mini,widget,picker,small',
  3
);

-- ============================================================
-- ANIMATIONS (3 new)
-- ============================================================
INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-animation-spinner',
  'Loading Spinner',
  'animations',
  'Fast 300ms repeating timer for loading spinners and activity indicators',
  '- CustomAnimation:
    Control: Timer
    Properties:
      Duration: =300
      Repeat: =true
      AutoStart: =true
',
  'animation,spinner,loading,fast,timer',
  1
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-animation-progress',
  'Progress Animation',
  'animations',
  'Normal 1000ms repeating timer for progress bars and status indicators',
  '- CustomAnimation:
    Control: Timer
    Properties:
      Duration: =1000
      Repeat: =true
      AutoStart: =true
',
  'animation,progress,bar,normal,timer',
  2
);

INSERT INTO components (id, name, category_slug, description, yaml, tags, sort_order) VALUES (
  'comp-animation-pulse',
  'Pulse Animation',
  'animations',
  'Slow 2000ms repeating timer for breathing effects and skeleton loaders',
  '- CustomAnimation:
    Control: Timer
    Properties:
      Duration: =2000
      Repeat: =true
      AutoStart: =true
',
  'animation,pulse,slow,skeleton,breathe',
  3
);
