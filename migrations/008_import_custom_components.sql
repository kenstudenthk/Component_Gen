-- Migration 008: Import custom components from CSV
-- Generated automatically on 2026-02-28T23:24:24.755Z
-- Total components: 4
-- CSV file: Powerapps Component YAML.csv

-- Circle Progress Bar (17 editable properties)
INSERT INTO components (id, name, category_slug, description, yaml, tags, component_type, custom_properties, sort_order)
VALUES (
  'comp-custom-1',
  'Circle Progress Bar',
  'custom-components',
  'Circle Progress Chart Bar',
  'ComponentDefinitions:
  CircleProgressBar:
    DefinitionType: CanvasComponent
    CustomProperties:
      BarB:
        PropertyKind: Input
        DisplayName: BarB
        Description: Blue component for the progress bar color
        DataType: Number
        Default: =206
      BarBgB:
        PropertyKind: Input
        DisplayName: BarBgB
        Description: Blue component for the background bar color
        DataType: Number
        Default: =230
      BarBgG:
        PropertyKind: Input
        DisplayName: BarBgG
        Description: Green component for the background bar color
        DataType: Number
        Default: =230
      BarBgR:
        PropertyKind: Input
        DisplayName: BarBgR
        Description: Red component for the background bar color
        DataType: Number
        Default: =230
      BarBgWidth:
        PropertyKind: Input
        DisplayName: BarBgWidth
        Description: Width for the baground progress bar
        DataType: Number
        Default: =18
      BarG:
        PropertyKind: Input
        DisplayName: BarG
        Description: Green component for the progress bar color
        DataType: Number
        Default: =204
      BarR:
        PropertyKind: Input
        DisplayName: BarR
        Description: Red component for the progress bar color
        DataType: Number
        Default: =69
      BarWidth:
        PropertyKind: Input
        DisplayName: BarWidth
        Description: Width for the progress bar
        DataType: Number
        Default: =18
      Close:
        PropertyKind: Input
        DisplayName: Close
        Description: A custom property
        DataType: Number
        Default: =100
      LabelColor:
        PropertyKind: Input
        DisplayName: LabelColor
        Description: Color for the label in the center of the circle
        DataType: Color
        Default: =RGBA(0, 0, 0, 1)
      LabelSize:
        PropertyKind: Input
        DisplayName: LabelSize
        Description: Font size for the label
        DataType: Number
        Default: =20
      LineCapRound:
        PropertyKind: Input
        DisplayName: LineCapRound
        Description: If True, line cap effect used to draw the circles is round. Otherwise, it is square.
        DataType: Boolean
        Default: =true
      Max:
        PropertyKind: Input
        DisplayName: Max
        Description: Maximum value for the progress bar
        DataType: Number
        Default: =100
      PercentageDecimals:
        PropertyKind: Input
        DisplayName: PercentageDecimals
        Description: Number of decimals to display if ValueMode is Percentage
        DataType: Number
        Default: =0
      ShowLabel:
        PropertyKind: Input
        DisplayName: ShowLabel
        Description: Display a X/Y lable in the center of the progress bar
        DataType: Boolean
        Default: =true
      Value:
        PropertyKind: Input
        DisplayName: Value
        Description: Value for the progress bar (between 0 and 100)
        DataType: Number
        Default: =50
      ValueMode:
        PropertyKind: Input
        DisplayName: ValueMode
        Description: Choose whether you want to display the value as X/Y or as a percentage value
        DataType: Text
        Default: =CircleProgressBar.ValueModeEnum.MaxValue
      ValueModeEnum:
        PropertyKind: Output
        DisplayName: ValueModeEnum
        Description: Enumeration for the ValueMode property
        DataType: Record
    Properties:
      Height: =222
      ValueModeEnum: |-
        ={MaxValue: "MAX", Percentage: "PCTG"}
      Width: =240
    Children:
      - imgCPBProgressBarSVG:
          Control: Image@2.2.3
          Properties:
            BorderColor: =RGBA(0, 18, 107, 1)
            FocusedBorderColor: =imgCPBProgressBarSVG.BorderColor
            Height: =Parent.Height - 20
            HoverBorderColor: =ColorFade(imgCPBProgressBarSVG.BorderColor, 20%)
            HoverFill: =ColorFade(imgCPBProgressBarSVG.Fill, 20%)
            Image: |-
              ="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100px%22%20height%3D%22100px%22%3E" &
                  "%3Cpath%20fill%3D%22none%22%20style%3D%22stroke-width%3A" & CircleProgressBar.BarBgWidth & "%3Bstroke%3Argb%28" & CircleProgressBar.BarBgR & "%2C" & CircleProgressBar.BarBgG & "%2C" & CircleProgressBar.BarBgB & "%29%3Bstroke-linecap%3A" & If(CircleProgressBar.LineCapRound,"round","butt") & "%3B%22%20d%3D%22" &
                      "M%20" &
                      Text(50-40*Sin(Pi()/4),"[$-en-US]#.00000000","en-US") & "%20" & Text(50+40*Cos(Pi()/4),"[$-en-US]#.00000000","en-US") &
                      "%20A%20" &
                      "40%2040%200%201%201%20" & Text(50-40*Sin(2*Pi()-Pi()/4),"[$-en-US]#.00000000","en-US") & "%20" & Text(50+40*Cos(2*Pi()-Pi()/4),"[$-en-US]#.00000000","en-US") &
                      "%22%3E" &
                  "%3C%2Fpath%3E" &
                  "%3Cpath%20fill%3D%22none%22%20style%3D%22stroke-width%3A" & CircleProgressBar.BarWidth & "%3Bstroke%3Argb%28" & CircleProgressBar.BarR & "%2C" & CircleProgressBar.BarG & "%2C" & CircleProgressBar.BarB & "%29%3Bstroke-linecap%3A" & If(CircleProgressBar.LineCapRound,"round","butt") & "%3B%22%20d%3D%22" &
                      "M%20" &
                      Text(50-40*Sin(Pi()/4),"[$-en-US]#.00000000","en-US") & "%20" & Text(50+40*Cos(Pi()/4),"[$-en-US]#.00000000","en-US") &
                      "%20A%20" &
                      "40%2040%200%20" & If(CircleProgressBar.Value/If(IsBlank(CircleProgressBar.Max)||CircleProgressBar.Max=0, 1, CircleProgressBar.Max)>Pi()/(2*(Pi()-Pi()/4)),"1","0") & "%201%20" & Text(50-40*Sin(Pi()/4+2*(Pi()-Pi()/4)*CircleProgressBar.Value/If(IsBlank(CircleProgressBar.Max)||CircleProgressBar.Max=0, 1, CircleProgressBar.Max)),"[$-en-US]#.00000000","en-US") & "%20" & Text(50+40*Cos(Pi()/4+2*(Pi()-Pi()/4)*CircleProgressBar.Value/If(IsBlank(CircleProgressBar.Max)||CircleProgressBar.Max=0, 1, CircleProgressBar.Max)),"[$-en-US]#.00000000","en-US") &
                      "%22%3E" &
                  "%3C%2Fpath%3E" &
              "%3C%2Fsvg%3E"
            PressedBorderColor: =ColorFade(imgCPBProgressBarSVG.BorderColor, -20%)
            PressedFill: =ColorFade(imgCPBProgressBarSVG.Fill, -20%)
            Width: =Parent.Width - 40
            X: =20
            Y: =20
      - lblCPBProgressLabel:
          Control: Label@2.5.1
          Properties:
            Align: =Align.Center
            AutoHeight: =true
            BorderColor: =RGBA(0, 18, 107, 1)
            Color: =CircleProgressBar.LabelColor
            FocusedBorderColor: =lblCPBProgressLabel.BorderColor
            Font: =Font.''Open Sans''
            HoverBorderColor: =lblCPBProgressLabel.BorderColor
            HoverColor: =lblCPBProgressLabel.Color
            HoverFill: =lblCPBProgressLabel.Fill
            PressedBorderColor: =lblCPBProgressLabel.BorderColor
            PressedColor: =lblCPBProgressLabel.Color
            PressedFill: =lblCPBProgressLabel.Fill
            Size: =CircleProgressBar.LabelSize
            Text: |-
              =If(
                  CircleProgressBar.ValueMode = CircleProgressBar.ValueModeEnum.MaxValue,
                  CircleProgressBar.Value & " / " & CircleProgressBar.Max,
                  Text(
                      Round(
                          (CircleProgressBar.Value / CircleProgressBar.Max) * 100,
                          CircleProgressBar.PercentageDecimals
                      ),
                      "#" & If(
                          CircleProgressBar.PercentageDecimals > 0,
                          "." & Left(
                              "0000000000",
                              CircleProgressBar.PercentageDecimals
                          )
                      )
                  ) & " %"
              )
            Visible: =CircleProgressBar.ShowLabel
            Width: =CircleProgressBar.Width
            Y: =imgCPBProgressBarSVG.Y + (imgCPBProgressBarSVG.Height - lblCPBProgressLabel.Height) / 2 - 5',
  'custom,imported',
  'definition',
  '{"BarB":{"displayName":"BarB","description":"Blue component for the progress bar color","dataType":"Number","default":"=206"},"BarBgB":{"displayName":"BarBgB","description":"Blue component for the background bar color","dataType":"Number","default":"=230"},"BarBgG":{"displayName":"BarBgG","description":"Green component for the background bar color","dataType":"Number","default":"=230"},"BarBgR":{"displayName":"BarBgR","description":"Red component for the background bar color","dataType":"Number","default":"=230"},"BarBgWidth":{"displayName":"BarBgWidth","description":"Width for the baground progress bar","dataType":"Number","default":"=18"},"BarG":{"displayName":"BarG","description":"Green component for the progress bar color","dataType":"Number","default":"=204"},"BarR":{"displayName":"BarR","description":"Red component for the progress bar color","dataType":"Number","default":"=69"},"BarWidth":{"displayName":"BarWidth","description":"Width for the progress bar","dataType":"Number","default":"=18"},"Close":{"displayName":"Close","description":"A custom property","dataType":"Number","default":"=100"},"LabelColor":{"displayName":"LabelColor","description":"Color for the label in the center of the circle","dataType":"Color","default":"=RGBA(0, 0, 0, 1)"},"LabelSize":{"displayName":"LabelSize","description":"Font size for the label","dataType":"Number","default":"=20"},"LineCapRound":{"displayName":"LineCapRound","description":"If True, line cap effect used to draw the circles is round. Otherwise, it is square.","dataType":"Boolean","default":"=true"},"Max":{"displayName":"Max","description":"Maximum value for the progress bar","dataType":"Number","default":"=100"},"PercentageDecimals":{"displayName":"PercentageDecimals","description":"Number of decimals to display if ValueMode is Percentage","dataType":"Number","default":"=0"},"ShowLabel":{"displayName":"ShowLabel","description":"Display a X/Y lable in the center of the progress bar","dataType":"Boolean","default":"=true"},"Value":{"displayName":"Value","description":"Value for the progress bar (between 0 and 100)","dataType":"Number","default":"=50"},"ValueMode":{"displayName":"ValueMode","description":"Choose whether you want to display the value as X/Y or as a percentage value","dataType":"Text","default":"=CircleProgressBar.ValueModeEnum.MaxValue"}}',
  0
);

-- Expand Menu Side Bar 1 (3 editable properties)
INSERT INTO components (id, name, category_slug, description, yaml, tags, component_type, custom_properties, sort_order)
VALUES (
  'comp-custom-2',
  'Expand Menu Side Bar 1',
  'custom-components',
  '2 level Expand Menu Bar',
  'ComponentDefinitions:
  Component2:
    DefinitionType: CanvasComponent
    CustomProperties:
      ExpandMenu:
        PropertyKind: Output
        DisplayName: ExpandMenu
        Description: A custom property
        DataType: Boolean
      colChildMenu:
        PropertyKind: Input
        DisplayName: colChildMenu
        Description: colChildMenuproperty
        DataType: Table
        Default: "=Table(\r\n    \r\n    {\r\n        Name: \"Stock Take Summary\",\r\n        ParentItem: \"Stock Take Summary\",\r\n        Screen: StockTakeSummaryScreen\r\n    },\r\n    {\r\n        Name: \"Outstanding Items\",\r\n        ParentItem: \"Stock Take Summary\",\r\n        Screen: Outstanding\r\n    },\r\n    {\r\n        Name: \"Duplicate Items\",\r\n        ParentItem: \"Stock Take Summary\",\r\n        Screen: Duplicate\r\n    }\r\n)"
      colIcons:
        PropertyKind: Input
        DisplayName: colIcons
        Description: Icon property
        DataType: Table
        Default: |-
          =Table(
              {
                  Name: "Item 1",
                  Icon: "data:image/svg+xml; utf-8, " & EncodeUrl("<svg xmlns=''http://www.w3.org/2000/svg'' width=''200'' height=''200'' viewBox=''0 0 24 24''><path fill=''#COLORHERE'' d=''m7.4 21.308l-.708-.708l6.208-6.213l3.5 3.5l5.175-5.175l.713.713l-5.888 5.883l-3.5-3.5l-5.5 5.5ZM4.615 20q-.69 0-1.152-.462Q3 19.075 3 18.385V5.615q0-.69.463-1.152Q3.925 4 4.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v4.2H4v8.57q0 .23.192.423q.193.192.423.192v1ZM4 8.815h14v-3.2q0-.23-.192-.423Q17.615 5 17.385 5H4.615q-.23 0-.423.192Q4 5.385 4 5.615v3.2Zm0 0V5v3.815Z''/></svg>")
              },
              {
                  Name: "Item 2",
                  Icon: "data:image/svg+xml; utf-8, " & EncodeUrl("<svg xmlns=''http://www.w3.org/2000/svg'' width=''200'' height=''200'' viewBox=''0 0 24 24''><path fill=''#COLORHERE'' d=''M10 16.038q2.5 0 4.25-1.755T16 10.019t-1.75-4.263T10 4T5.75 5.756T4 10.019t1.75 4.264T10 16.038m0-3.442q-.213 0-.357-.144t-.143-.356V7.135q0-.213.144-.357q.144-.143.357-.143t.356.143t.143.357v4.961q0 .213-.144.356q-.144.144-.357.144m-3.346 0q-.213 0-.356-.144t-.143-.356V9.038q0-.212.144-.356t.357-.144t.356.144t.143.356v3.058q0 .213-.144.356t-.357.144m6.692 0q-.212 0-.356-.144t-.143-.356V10q0-.213.144-.356t.357-.144t.356.144t.143.356v2.096q0 .213-.144.356q-.144.144-.357.144M10 17q-2.931 0-4.966-2.033Q3 12.933 3 10.003t2.033-4.966T9.997 3t4.966 2.034T17 10q0 1.317-.457 2.493t-1.256 2.086l5.378 5.379q.14.134.14.34t-.14.358t-.353.14t-.354-.15l-5.36-5.36q-.929.8-2.105 1.257T10 17''/></svg>")
              },
              {
                  Name: "Item 3",
                  Icon: "data:image/svg+xml; utf-8, " & EncodeUrl("<svg xmlns=''http://www.w3.org/2000/svg'' width=''200'' height=''200'' viewBox=''0 0 24 24''><path fill=''#COLORHERE'' d=''m7.4 21.308l-.708-.708l6.208-6.213l3.5 3.5l5.175-5.175l.713.713l-5.888 5.883l-3.5-3.5l-5.5 5.5ZM4.615 20q-.69 0-1.152-.462Q3 19.075 3 18.385V5.615q0-.69.463-1.152Q3.925 4 4.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v4.2H4v8.57q0 .23.192.423q.193.192.423.192v1ZM4 8.815h14v-3.2q0-.23-.192-.423Q17.615 5 17.385 5H4.615q-.23 0-.423.192Q4 5.385 4 5.615v3.2Zm0 0V5v3.815Z''/></svg>")
              }
          )
      colSideMenu:
        PropertyKind: Input
        DisplayName: colSideMenu
        Description: colSideMenu Property
        DataType: Table
        Default: |-
          =Table(
              {
                  Name: "Dashboard",
                  Category: "Home",
                  Screen: Screen2,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "Home"
                      ).IconData
                  )
              },
              {
                  Name: "Stock Take Summary",
                  Category: "Stock Take",
                  Screen: StockTakeSummaryScreen,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "Summary"
                      ).IconData
                  )
              },
              {
                  Name: "Items List",
                  Category: "Stock Take",
                  Screen: ProductList,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "List"
                      ).IconData
                  )
              },
              {
                  Name: "Outstanding Items",
                  Category: "Stock Take",
                  Screen: Outstanding,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "Outstanding_Red"
                      ).IconData
                  )
              },
              {
                  Name: "Duplicate",
                  Category: "Stock Take",
                  Screen: Duplicate,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "Duplicate"
                      ).IconData
                  )
              },
              {
                  Name: "Stock Take Schedule",
                  Category: "Stock Take",
                  Screen: Schedule,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "Schedule"
                      ).IconData
                  )
              },
              {
                  Name: "Punch Record",
                  Category: "Stock Take",
                  Screen: CheckInOut,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "TimeCard"
                      ).IconData
                  )
              },
              {
                  Name: "Shop List",
                  Category: "Shop Infomation",
                  Screen: ShopList,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "Shop"
                      ).IconData
                  )
              },
              {
                  Name: "Brand Report",
                  Category: "Shop Infomation",
                  Screen: BrandReport,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "Report"
                      ).IconData
                  )
              },
              {
                  Name: "Harware List",
                  Category: "Data",
                  Screen: HardwareList,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "Hareware"
                      ).IconData
                  )
              },
              {
                  Name: "Inventory List",
                  Category: "Data",
                  Screen: InventoryScreen,
                  MenuIcon: "data:image/svg+xml;utf8, " & EncodeUrl(
                      LookUp(
                          IconCollection,
                          IconName = "Inventory"
                      ).IconData
                  )
              }
          )
    Properties:
      ExpandMenu: =varExpandMenu
      Width: |-
        =If(Component2.ExpandMenu,
            250,
            100
        )
    Children:
      - body:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            DropShadow: =DropShadow.None
            Height: =Parent.Height
            Width: =Parent.Width
          Children:
            - content:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  Height: =Parent.Height
                  LayoutDirection: =LayoutDirection.Horizontal
                  Width: =Parent.Width
                Children:
                  - bodySideMenu:
                      Control: GroupContainer@1.3.0
                      Variant: ManualLayout
                      Properties:
                        DropShadow: =DropShadow.None
                        Height: =Parent.Height
                        RadiusBottomLeft: =0
                        RadiusBottomRight: =0
                        RadiusTopLeft: =0
                        RadiusTopRight: =0
                        Width: =sideMenu.Width+10
                      Children:
                        - sideMenu:
                            Control: GroupContainer@1.3.0
                            Variant: AutoLayout
                            Properties:
                              Fill: =ColorValue("#FFFFFF")
                              Height: =Parent.Height
                              LayoutDirection: =LayoutDirection.Vertical
                              RadiusBottomLeft: =0
                              RadiusBottomRight: =0
                              RadiusTopLeft: =0
                              RadiusTopRight: =0
                              Width: |-
                                =If(varExpandMenu,
                                    250,
                                    100
                                )
                            Children:
                              - headerSideMenu:
                                  Control: GroupContainer@1.3.0
                                  Variant: AutoLayout
                                  Properties:
                                    DropShadow: =DropShadow.None
                                    FillPortions: =0
                                    Height: =125
                                    LayoutAlignItems: =LayoutAlignItems.Center
                                    LayoutDirection: =LayoutDirection.Vertical
                                    LayoutGap: =16
                                    LayoutJustifyContent: =If(varExpandMenu,LayoutJustifyContent.Start ,LayoutJustifyContent.Center)
                                    LayoutMinWidth: =0
                                    PaddingTop: =16
                                    RadiusBottomLeft: =0
                                    RadiusBottomRight: =0
                                    RadiusTopLeft: =0
                                    RadiusTopRight: =0
                                  Children:
                                    - logoHeaderSideMenu:
                                        Control: GroupContainer@1.3.0
                                        Variant: AutoLayout
                                        Properties:
                                          AlignInContainer: =AlignInContainer.SetByContainer
                                          DropShadow: =DropShadow.None
                                          FillPortions: =0
                                          Height: =60
                                          LayoutDirection: =LayoutDirection.Horizontal
                                          LayoutGap: =6
                                          LayoutJustifyContent: =If(varExpandMenu,LayoutJustifyContent.Start ,LayoutJustifyContent.Center)
                                          LayoutMinWidth: =0
                                          RadiusBottomLeft: =0
                                          RadiusBottomRight: =0
                                          RadiusTopLeft: =0
                                          RadiusTopRight: =0
                                          Width: =Parent.Width-32
                                        Children:
                                          - imgLogoHeaderSideMenu:
                                              Control: Image@2.2.3
                                              Properties:
                                                BorderColor: =RGBA(0, 0, 0, 0)
                                                BorderStyle: =BorderStyle.None
                                                BorderThickness: =2
                                                DisabledBorderColor: =RGBA(0, 0, 0, 0)
                                                DisabledFill: =RGBA(0, 0, 0, 0)
                                                FocusedBorderThickness: =4
                                                Height: =60
                                                HoverBorderColor: =RGBA(0, 0, 0, 0)
                                                HoverFill: =RGBA(0, 0, 0, 0)
                                                Image: =美心集團
                                                PressedBorderColor: =RGBA(0, 0, 0, 0)
                                                PressedFill: =RGBA(0, 0, 0, 0)
                                                Width: =60
                                          - Label18:
                                              Control: Label@2.5.1
                                              Properties:
                                                BorderColor: =RGBA(0, 0, 0, 0)
                                                BorderStyle: =BorderStyle.None
                                                BorderThickness: =2
                                                Color: =RGBA(50, 49, 48, 1)
                                                DisabledBorderColor: =RGBA(0, 0, 0, 0)
                                                DisabledColor: =RGBA(161, 159, 157, 1)
                                                FillPortions: =1
                                                FocusedBorderThickness: =4
                                                Font: =Font.Verdana
                                                FontWeight: =FontWeight.Bold
                                                Height: =60
                                                Text: ="MX Stock Take"
                                                Visible: =varExpandMenu
                                                Width: =110
                                    - searchHeaderSideMenu:
                                        Control: GroupContainer@1.3.0
                                        Variant: AutoLayout
                                        Properties:
                                          AlignInContainer: =AlignInContainer.Center
                                          BorderColor: =ColorValue("#E5E6EA")
                                          BorderThickness: =1
                                          DropShadow: =DropShadow.None
                                          FillPortions: =0
                                          Height: =32
                                          LayoutAlignItems: =LayoutAlignItems.Center
                                          LayoutDirection: =LayoutDirection.Horizontal
                                          LayoutMinHeight: =0
                                          LayoutMinWidth: =0
                                          PaddingLeft: =5
                                          PaddingRight: =5
                                          Visible: =varExpandMenu
                                          Width: =Parent.Width-32
                                        Children:
                                          - txtSearchHeaderSideMenu:
                                              Control: Classic/TextInput@2.3.2
                                              Properties:
                                                BorderColor: =RGBA(245, 245, 245, 1)
                                                BorderThickness: =0
                                                Color: =ColorValue("#5A6873")
                                                Default: =
                                                DisabledBorderColor: =RGBA(0, 0, 0, 0)
                                                DisabledColor: =RGBA(161, 159, 157, 1)
                                                DisabledFill: =RGBA(242, 242, 241, 0)
                                                EnableSpellCheck: =true
                                                FillPortions: =1
                                                FocusedBorderThickness: =0
                                                Font: =Font.''Segoe UI''
                                                Height: =Parent.Height
                                                HintText: ="Search"
                                                HoverBorderColor: =RGBA(16, 110, 190, 1)
                                                HoverColor: =RGBA(50, 49, 48, 1)
                                                HoverFill: =RGBA(0, 0, 0, 0)
                                                LayoutMinWidth: =0
                                                PaddingLeft: =5
                                                PressedBorderColor: =RGBA(0, 120, 212, 1)
                                                PressedColor: =RGBA(50, 49, 48, 1)
                                                PressedFill: =RGBA(255, 255, 255, 1)
                                                RadiusBottomLeft: =0
                                                RadiusBottomRight: =0
                                                RadiusTopLeft: =0
                                                RadiusTopRight: =0
                                                Size: =10
                                                Width: =0
                                          - iconSearchHeaderSideMenu:
                                              Control: Icon@0.0.7
                                              Properties:
                                                Height: =20
                                                Icon: ="Search"
                                                IconColor: =ColorValue("#2E3A48")
                                                Width: =20
                              - contentSideMenu:
                                  Control: GroupContainer@1.3.0
                                  Variant: AutoLayout
                                  Properties:
                                    DropShadow: =DropShadow.None
                                    LayoutAlignItems: =If(varExpandMenu,LayoutJustifyContent.Start, LayoutJustifyContent.Center)
                                    LayoutDirection: =LayoutDirection.Vertical
                                    LayoutMinWidth: =0
                                    RadiusBottomLeft: =0
                                    RadiusBottomRight: =0
                                    RadiusTopLeft: =0
                                    RadiusTopRight: =0
                                  Children:
                                    - galleryItemsSideMenu:
                                        Control: Gallery@2.15.0
                                        Variant: VariableHeight
                                        Properties:
                                          BorderColor: =RGBA(245, 245, 245, 1)
                                          Height: =Parent.Height
                                          Items: |-
                                            =AddColumns(
                                                Component2.colSideMenu As _Parent, 
                                                Siblings, 
                                                Filter(Component2.colSideMenu, Category = _Parent.Category)
                                            )
                                          LayoutMinHeight: =0
                                          LayoutMinWidth: =0
                                          LoadingSpinner: =LoadingSpinner.None
                                          TemplatePadding: =0
                                          Width: =Parent.Width
                                        Children:
                                          - contentItemSideMenu:
                                              Control: GroupContainer@1.3.0
                                              Variant: AutoLayout
                                              Properties:
                                                DropShadow: =DropShadow.None
                                                Height: |-
                                                  =If(!IsBlank(LookUp(Component2.colChildMenu, ParentItem = ThisItem.Name)) && varExpandMenu && ((App.ActiveScreen = ThisItem.Screen) || App.ActiveScreen in Filter(Component2.colChildMenu, ParentItem = ThisItem.Name).Screen),
                                                      galleryChildsItemSideMenu.AllItemsCount*30+
                                                      If(!lblCategoryItemSideMenu.Visible = true, 
                                                          44,
                                                          80
                                                      ),
                                                      If(!lblCategoryItemSideMenu.Visible = true, 
                                                          44,
                                                          80
                                                      )
                                                  )
                                                LayoutAlignItems: =LayoutAlignItems.Center
                                                LayoutDirection: =LayoutDirection.Vertical
                                                LayoutJustifyContent: =LayoutJustifyContent.End
                                                RadiusBottomLeft: =0
                                                RadiusBottomRight: =0
                                                RadiusTopLeft: =0
                                                RadiusTopRight: =0
                                                Width: =Parent.Width
                                              Children:
                                                - lblCategoryItemSideMenu:
                                                    Control: Text@0.0.51
                                                    Properties:
                                                      Align: "=If(varExpandMenu,''TextCanvas.Align''.Start, ''TextCanvas.Align''.Center) "
                                                      AlignInContainer: =AlignInContainer.Start
                                                      FontColor: =ColorValue("#5A6873")
                                                      Height: =20
                                                      PaddingLeft: =16
                                                      PaddingRight: =16
                                                      Size: =10
                                                      Text: =Upper(ThisItem.Category)
                                                      Visible: =(First(ThisItem.''Siblings'').Name = ThisItem.Name)
                                                      Weight: =''TextCanvas.Weight''.Semibold
                                                      Width: =Parent.Width
                                                      Wrap: =false
                                                - ItemSideMenu:
                                                    Control: GroupContainer@1.3.0
                                                    Variant: ManualLayout
                                                    Properties:
                                                      AlignInContainer: =AlignInContainer.Start
                                                      DropShadow: =DropShadow.None
                                                      FillPortions: =0
                                                      Height: =wrapperItemSideMenu.Height
                                                      LayoutMinHeight: =0
                                                      LayoutMinWidth: =0
                                                      RadiusBottomLeft: =0
                                                      RadiusBottomRight: =0
                                                      RadiusTopLeft: =0
                                                      RadiusTopRight: =0
                                                      Width: =Parent.Width
                                                    Children:
                                                      - wrapperItemSideMenu:
                                                          Control: GroupContainer@1.3.0
                                                          Variant: AutoLayout
                                                          Properties:
                                                            DropShadow: =DropShadow.None
                                                            Fill: =If(App.ActiveScreen = ThisItem.Screen || App.ActiveScreen in Filter(Component2.colChildMenu, ParentItem = ThisItem.Name).Screen, ColorValue("#E7ECFD"), RGBA(0, 0, 0, 0))
                                                            Height: =44
                                                            LayoutAlignItems: =LayoutAlignItems.Center
                                                            LayoutDirection: =LayoutDirection.Horizontal
                                                            LayoutGap: =5
                                                            LayoutJustifyContent: =If(varExpandMenu,LayoutJustifyContent.Start, LayoutJustifyContent.Center)
                                                            PaddingLeft: =If(varExpandMenu, 12, 0)
                                                            PaddingRight: =If(varExpandMenu, 12, 0)
                                                            Width: =If(varExpandMenu,Parent.Width-32, Self.Height)
                                                            X: =Parent.Width/2-Self.Width/2
                                                          Children:
                                                            - imgItemSideMenu:
                                                                Control: Image@2.2.3
                                                                Properties:
                                                                  BorderColor: =RGBA(0, 0, 0, 0)
                                                                  BorderStyle: =BorderStyle.None
                                                                  BorderThickness: =2
                                                                  DisabledBorderColor: =RGBA(0, 0, 0, 0)
                                                                  DisabledFill: =RGBA(0, 0, 0, 0)
                                                                  FocusedBorderThickness: =4
                                                                  Height: =25
                                                                  HoverBorderColor: =RGBA(0, 0, 0, 0)
                                                                  HoverFill: =RGBA(0, 0, 0, 0)
                                                                  Image: =Substitute(LookUp(Component2.colIcons, Name = ThisItem.Name).Icon, "COLORHERE", If(ThisItem.Screen = App.ActiveScreen || App.ActiveScreen in Filter(Component2.colChildMenu, ParentItem = ThisItem.Name).Screen, "1A4DFC", "5A6873"))
                                                                  OnSelect: =
                                                                  PressedBorderColor: =RGBA(0, 0, 0, 0)
                                                                  PressedFill: =RGBA(0, 0, 0, 0)
                                                                  Width: =25
                                                                  X: =30
                                                                  Y: =18
                                                            - lblNameItemSideMenu:
                                                                Control: Text@0.0.51
                                                                Properties:
                                                                  FillPortions: =1
                                                                  FontColor: =If(App.ActiveScreen = ThisItem.Screen || App.ActiveScreen in Filter(Component2.colChildMenu, ParentItem = ThisItem.Name).Screen, ColorValue("#1A4DFC"), ColorValue("#2E3A48"))
                                                                  Height: =20
                                                                  LayoutMinWidth: =0
                                                                  Text: =ThisItem.Name
                                                                  VerticalAlign: =VerticalAlign.Middle
                                                                  Visible: =varExpandMenu = true
                                                                  Weight: =''TextCanvas.Weight''.Semibold
                                                      - btnItemSideMenu:
                                                          Control: Button@0.0.45
                                                          Properties:
                                                            Appearance: =''ButtonCanvas.Appearance''.Transparent
                                                            Height: =Parent.Height
                                                            Layout: =''ButtonCanvas.Layout''.IconBefore
                                                            OnSelect: =Navigate(ThisItem.Screen)
                                                            Text: =" "
                                                            Visible: =!(App.ActiveScreen.Name = ThisItem.Name)
                                                            Width: =wrapperItemSideMenu.Width
                                                            X: =wrapperItemSideMenu.X
                                                      - detailItemSideMenu:
                                                          Control: GroupContainer@1.3.0
                                                          Variant: ManualLayout
                                                          Properties:
                                                            DropShadow: =DropShadow.None
                                                            Fill: =ColorValue("#1A4DFC")
                                                            Height: =Parent.Height
                                                            Visible: =(App.ActiveScreen = ThisItem.Screen || App.ActiveScreen in Filter(Component2.colChildMenu, ParentItem = ThisItem.Name).Screen)
                                                            Width: =5
                                                            X: =-2
                                                      - Image7_2:
                                                          Control: Image@2.2.3
                                                          Properties:
                                                            BorderColor: =RGBA(0, 0, 0, 0)
                                                            BorderStyle: =BorderStyle.None
                                                            BorderThickness: =2
                                                            DisabledBorderColor: =RGBA(0, 0, 0, 0)
                                                            DisabledFill: =RGBA(0, 0, 0, 0)
                                                            FocusedBorderThickness: =4
                                                            Height: =Parent.Height / 2
                                                            HoverBorderColor: =RGBA(0, 0, 0, 0)
                                                            HoverFill: =RGBA(0, 0, 0, 0)
                                                            Image: =ThisItem.MenuIcon
                                                            PressedBorderColor: =RGBA(0, 0, 0, 0)
                                                            PressedFill: =RGBA(0, 0, 0, 0)
                                                            Width: =44
                                                            X: ''=wrapperItemSideMenu.X ''
                                                            Y: =(Parent.Height - Self.Height) / 2
                                                      - iconExpandItemSideMenu:
                                                          Control: Icon@0.0.7
                                                          Properties:
                                                            Height: =15
                                                            Icon: ="ChevronDown"
                                                            IconColor: =If(App.ActiveScreen = ThisItem.Screen || App.ActiveScreen in Filter(Component2.colChildMenu, ParentItem = ThisItem.Name).Screen, ColorValue("#1A4DFC"), ColorValue("#2E3A48"))
                                                            IconStyle: =''Icon.IconStyle''.Filled
                                                            Visible: =!IsBlank(LookUp(Component2.colChildMenu, ParentItem = ThisItem.Name)) And varExpandMenu
                                                            Width: =15
                                                            X: =lblNameItemSideMenu.X + lblNameItemSideMenu.Width
                                                            Y: =lblNameItemSideMenu.Y
                                                - galleryChildsItemSideMenu:
                                                    Control: Gallery@2.15.0
                                                    Variant: VariableHeight
                                                    Properties:
                                                      BorderColor: =RGBA(245, 245, 245, 1)
                                                      FillPortions: =0
                                                      Height: =Self.AllItemsCount*wrapperChildItemSideMenu.Height
                                                      Items: =Filter( Component2.colChildMenu, ParentItem = ThisItem.Name)
                                                      LayoutMinHeight: =0
                                                      LayoutMinWidth: =0
                                                      LoadingSpinner: =LoadingSpinner.None
                                                      TemplatePadding: =0
                                                      TemplateSize: =30
                                                      Visible: =!IsBlank(LookUp(Component2.colChildMenu, ParentItem = ThisItem.Name)) && varExpandMenu && ((App.ActiveScreen = ThisItem.Screen) || App.ActiveScreen in Filter(Component2.colChildMenu, ParentItem = ThisItem.Name).Screen)
                                                      Width: =Parent.Width
                                                    Children:
                                                      - bodyChildItemSideMenu:
                                                          Control: GroupContainer@1.3.0
                                                          Variant: ManualLayout
                                                          Properties:
                                                            DropShadow: =DropShadow.None
                                                            Height: =30
                                                            Width: |
                                                              =Parent.Width-32
                                                            X: =(Parent.Width/2-Self.Width/2)+10
                                                          Children:
                                                            - wrapperChildItemSideMenu:
                                                                Control: GroupContainer@1.3.0
                                                                Variant: AutoLayout
                                                                Properties:
                                                                  DropShadow: =DropShadow.None
                                                                  Height: =30
                                                                  LayoutAlignItems: =LayoutAlignItems.End
                                                                  LayoutDirection: =LayoutDirection.Horizontal
                                                                  RadiusBottomLeft: =0
                                                                  RadiusBottomRight: =0
                                                                  RadiusTopLeft: =0
                                                                  RadiusTopRight: =0
                                                                  Width: =Parent.Width
                                                                Children:
                                                                  - treeSchemaChildItemSideMenu:
                                                                      Control: GroupContainer@1.3.0
                                                                      Variant: AutoLayout
                                                                      Properties:
                                                                        AlignInContainer: =AlignInContainer.Start
                                                                        DropShadow: =DropShadow.None
                                                                        FillPortions: =0
                                                                        Height: =30
                                                                        LayoutAlignItems: =LayoutAlignItems.Center
                                                                        LayoutDirection: =LayoutDirection.Vertical
                                                                        LayoutMinHeight: =0
                                                                        RadiusBottomLeft: =0
                                                                        RadiusBottomRight: =0
                                                                        RadiusTopLeft: =0
                                                                        RadiusTopRight: =0
                                                                        Width: =30
                                                                      Children:
                                                                        - lineTopTreeSchema:
                                                                            Control: Rectangle@2.3.0
                                                                            Properties:
                                                                              BorderColor: =RGBA(0, 0, 0, 0)
                                                                              BorderStyle: =BorderStyle.None
                                                                              BorderThickness: =2
                                                                              DisabledFill: =RGBA(161, 159, 157, 1)
                                                                              Fill: =If(First(Filter(Component2.colChildMenu, ParentItem = ThisItem.ParentItem)).Name = ThisItem.Name, RGBA(0, 0, 0, 0), ColorValue("#E5E6EA"))
                                                                              FocusedBorderThickness: =4
                                                                              Height: =30/2-circleTreeSchema.Height
                                                                              HoverFill: =RGBA(0, 120, 212, 1)
                                                                              LayoutMinHeight: =0
                                                                              PressedFill: =RGBA(0, 120, 212, 1)
                                                                              Width: =1
                                                                        - circleTreeSchema:
                                                                            Control: Circle@2.3.0
                                                                            Properties:
                                                                              BorderColor: =ColorValue("#E5E6EA")
                                                                              BorderStyle: =BorderStyle.None
                                                                              BorderThickness: =If(App.ActiveScreen = ThisItem.Screen, 0, 1)
                                                                              DisabledFill: =RGBA(0, 120, 212, 1)
                                                                              Fill: =If(App.ActiveScreen = ThisItem.Screen, ColorValue("#1A4DFC"), RGBA(0, 0, 0, 0))
                                                                              Height: =7
                                                                              HoverFill: =RGBA(0, 120, 212, 1)
                                                                              PressedFill: =RGBA(0, 120, 212, 1)
                                                                              Width: =Self.Height
                                                                        - lineBottomTreeSchema:
                                                                            Control: Rectangle@2.3.0
                                                                            Properties:
                                                                              BorderColor: =RGBA(0, 0, 0, 0)
                                                                              BorderStyle: =BorderStyle.None
                                                                              BorderThickness: =2
                                                                              DisabledFill: =RGBA(161, 159, 157, 1)
                                                                              Fill: =If(Last(Filter(Component2.colChildMenu, ParentItem = ThisItem.ParentItem)).Name = ThisItem.Name, RGBA(0, 0, 0, 0), ColorValue("#E5E6EA"))
                                                                              FillPortions: =1
                                                                              FocusedBorderThickness: =4
                                                                              Height: =30/2-circleTreeSchema.Height
                                                                              HoverFill: =RGBA(0, 120, 212, 1)
                                                                              PressedFill: =RGBA(0, 120, 212, 1)
                                                                              Width: =1
                                                                  - lblNameChildItemSideMenu:
                                                                      Control: Text@0.0.51
                                                                      Properties:
                                                                        Align: =''TextCanvas.Align''.Start
                                                                        AlignInContainer: =AlignInContainer.Center
                                                                        FontColor: =If(App.ActiveScreen = ThisItem.Screen, ColorValue("#1A4DFC"), ColorValue("#2E3A48"))
                                                                        Height: =20
                                                                        Size: =12
                                                                        Text: =ThisItem.Name
                                                                        VerticalAlign: =VerticalAlign.Top
                                                                        Weight: =''TextCanvas.Weight''.Semibold
                                                                        Y: |
                                                                          =0
                                                            - btnChildItemSideMenu:
                                                                Control: Button@0.0.45
                                                                Properties:
                                                                  Appearance: =''ButtonCanvas.Appearance''.Transparent
                                                                  BorderThickness: =0
                                                                  Height: =20
                                                                  OnSelect: =Navigate(ThisItem.Screen)
                                                                  Text: =" "
                                                                  Width: =200
                                                                  Y: =Parent.Height/2-Self.Height/2
                              - footerSideMenu:
                                  Control: GroupContainer@1.3.0
                                  Variant: AutoLayout
                                  Properties:
                                    DropShadow: =DropShadow.None
                                    FillPortions: =0
                                    Height: =80
                                    LayoutDirection: =LayoutDirection.Vertical
                                    LayoutMinWidth: =0
                                    RadiusBottomLeft: =0
                                    RadiusBottomRight: =0
                                    RadiusTopLeft: =0
                                    RadiusTopRight: =0
                                    Width: =Parent.Width
                                  Children:
                                    - detailFooterSideMenu:
                                        Control: GroupContainer@1.3.0
                                        Variant: ManualLayout
                                        Properties:
                                          AlignInContainer: =AlignInContainer.Center
                                          DropShadow: =DropShadow.None
                                          Fill: =ColorValue("#E5E6EA")
                                          FillPortions: =0
                                          Height: =1
                                          LayoutMinHeight: =0
                                          RadiusBottomLeft: =0
                                          RadiusBottomRight: =0
                                          RadiusTopLeft: =0
                                          RadiusTopRight: =0
                                          Width: =Parent.Width-40
                                    - wrapperFooterSideMenu:
                                        Control: GroupContainer@1.3.0
                                        Variant: AutoLayout
                                        Properties:
                                          DropShadow: =DropShadow.None
                                          Height: =1
                                          LayoutDirection: =LayoutDirection.Horizontal
                                          LayoutGap: =5
                                          LayoutJustifyContent: =LayoutJustifyContent.Center
                                          LayoutMinHeight: =0
                                          LayoutMinWidth: =0
                                          PaddingLeft: =10
                                          PaddingRight: =10
                                          Width: =Parent.Width
                                        Children:
                                          - avatarFooterSideMenu:
                                              Control: Avatar@1.0.40
                                              Properties:
                                                AlignInContainer: =AlignInContainer.Center
                                                Appearance: =''Avatar.Appearance''.Neutral
                                                BasePaletteColor: =RGBA(189, 178, 176, 1)
                                                Height: =50
                                                Shape: =''Avatar.Shape''.Circular
                                          - detailsFooterSideMenu:
                                              Control: GroupContainer@1.3.0
                                              Variant: AutoLayout
                                              Properties:
                                                DropShadow: =DropShadow.None
                                                Height: =Parent.Height
                                                LayoutDirection: =LayoutDirection.Vertical
                                                LayoutJustifyContent: =LayoutJustifyContent.Center
                                                LayoutMinHeight: =0
                                                LayoutMinWidth: =0
                                                RadiusBottomLeft: =0
                                                RadiusBottomRight: =0
                                                RadiusTopLeft: =0
                                                RadiusTopRight: =0
                                                Visible: =varExpandMenu
                                                Width: =Parent.Width
                                              Children:
                                                - lblNameFooterSideMenu:
                                                    Control: Text@0.0.51
                                                    Properties:
                                                      AlignInContainer: =AlignInContainer.Stretch
                                                      FontColor: =ColorValue("#2E3A48")
                                                      Height: =20
                                                      LayoutMinWidth: =0
                                                      Text: =User().FullName
                                                      Weight: =''TextCanvas.Weight''.Semibold
                                                      Width: =
                                                - lblEmailFooterSideMenu:
                                                    Control: Text@0.0.51
                                                    Properties:
                                                      AlignInContainer: =AlignInContainer.Stretch
                                                      AutoHeight: =true
                                                      FontColor: =ColorValue("#5A6873")
                                                      Height: =14
                                                      LayoutMinWidth: =0
                                                      Size: =10
                                                      Text: =//User().Email
                                                      Weight: =''TextCanvas.Weight''.Regular
                                          - ButtonCanvas1_2:
                                              Control: Button@0.0.45
                                              Properties:
                                                Appearance: =''ButtonCanvas.Appearance''.Transparent
                                                Height: =Parent.Height
                                                Icon: ="MoreHorizontal"
                                                IconRotation: =90
                                                Layout: =''ButtonCanvas.Layout''.IconOnly
                                                OnSelect: =Set(varShowModalUser, !varShowModalUser)
                                                Visible: =varExpandMenu
                                                Width: =20
                        - buttonExpandSideMenu:
                            Control: GroupContainer@1.3.0
                            Variant: ManualLayout
                            Properties:
                              BorderColor: =ColorValue("#f7f7f7")
                              BorderThickness: =2
                              DropShadow: =DropShadow.None
                              Fill: =sideMenu.Fill
                              Height: =20
                              RadiusBottomLeft: =100
                              RadiusBottomRight: =100
                              RadiusTopLeft: =100
                              RadiusTopRight: =100
                              Width: =Self.Height
                              X: =sideMenu.Width-(Self.Width+Self.BorderThickness)/2 - 10
                              Y: =headerSideMenu.Height/2-(Self.Height+Self.BorderThickness)/2 - 20
                            Children:
                              - btnExpandSideMenu:
                                  Control: Button@0.0.45
                                  Properties:
                                    Appearance: =''ButtonCanvas.Appearance''.Transparent
                                    BorderThickness: =0
                                    Height: =20
                                    Icon: =If(varExpandMenu, "ChevronLeft", "ChevronRight")
                                    Layout: =''ButtonCanvas.Layout''.IconOnly
                                    OnSelect: =Set(varExpandMenu, !varExpandMenu)
                                    Text: =" "
                                    Width: =20
            - modalSideMenu:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  Fill: =RGBA(255, 255, 255, 1)
                  Height: =110
                  LayoutDirection: =LayoutDirection.Vertical
                  Visible: =varShowModalUser
                  Width: =200
                  X: =sideMenu.Width-10
                  Y: =Parent.Height-Self.Height-12
                Children:
                  - galleryModalSideMenu:
                      Control: Gallery@2.15.0
                      Variant: Vertical
                      Properties:
                        BorderColor: =RGBA(245, 245, 245, 1)
                        Items: |-
                          =[
                              {
                                  Text: "Outlook",
                                  Icon: "Mail",
                                  Link: "https://outlook.office.com/mail/"
                              },
                              {
                                  Text: "Teams",
                                  Icon: "People",
                                  Link: "https://teams.microsoft.com/v2/"
                              },
                              {
                                  Text: "Change Password",
                                  Icon: "Settings",
                                  Link: "https://passwordreset.microsoftonline.com/"
                              },
                          ]
                        LoadingSpinner: =LoadingSpinner.None
                        TemplateSize: =30
                      Children:
                        - btnModalSideMenu:
                            Control: Button@0.0.45
                            Properties:
                              Align: =Align.Left
                              Appearance: =''ButtonCanvas.Appearance''.Subtle
                              FontSize: =14
                              FontWeight: =FontWeight.Normal
                              Height: =30
                              Icon: =ThisItem.Icon
                              IconStyle: =''ButtonCanvas.IconStyle''.Outline
                              OnSelect: =Launch(ThisItem.Link)
                              Text: =ThisItem.Text
                              VerticalAlign: =VerticalAlign.Middle
                              Width: =190',
  'custom,imported',
  'definition',
  '{"colChildMenu":{"displayName":"colChildMenu","description":"colChildMenuproperty","dataType":"Table","default":"=Table(\r\n    \r\n    {\r\n        Name: \"Stock Take Summary\",\r\n        ParentItem: \"Stock Take Summary\",\r\n        Screen: StockTakeSummaryScreen\r\n    },\r\n    {\r\n        Name: \"Outstanding Items\",\r\n        ParentItem: \"Stock Take Summary\",\r\n        Screen: Outstanding\r\n    },\r\n    {\r\n        Name: \"Duplicate Items\",\r\n        ParentItem: \"Stock Take Summary\",\r\n        Screen: Duplicate\r\n    }\r\n)"},"colIcons":{"displayName":"colIcons","description":"Icon property","dataType":"Table","default":"=Table(\n    {\n        Name: \"Item 1\",\n        Icon: \"data:image/svg+xml; utf-8, \" & EncodeUrl(\"<svg xmlns=''http://www.w3.org/2000/svg'' width=''200'' height=''200'' viewBox=''0 0 24 24''><path fill=''#COLORHERE'' d=''m7.4 21.308l-.708-.708l6.208-6.213l3.5 3.5l5.175-5.175l.713.713l-5.888 5.883l-3.5-3.5l-5.5 5.5ZM4.615 20q-.69 0-1.152-.462Q3 19.075 3 18.385V5.615q0-.69.463-1.152Q3.925 4 4.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v4.2H4v8.57q0 .23.192.423q.193.192.423.192v1ZM4 8.815h14v-3.2q0-.23-.192-.423Q17.615 5 17.385 5H4.615q-.23 0-.423.192Q4 5.385 4 5.615v3.2Zm0 0V5v3.815Z''/></svg>\")\n    },\n    {\n        Name: \"Item 2\",\n        Icon: \"data:image/svg+xml; utf-8, \" & EncodeUrl(\"<svg xmlns=''http://www.w3.org/2000/svg'' width=''200'' height=''200'' viewBox=''0 0 24 24''><path fill=''#COLORHERE'' d=''M10 16.038q2.5 0 4.25-1.755T16 10.019t-1.75-4.263T10 4T5.75 5.756T4 10.019t1.75 4.264T10 16.038m0-3.442q-.213 0-.357-.144t-.143-.356V7.135q0-.213.144-.357q.144-.143.357-.143t.356.143t.143.357v4.961q0 .213-.144.356q-.144.144-.357.144m-3.346 0q-.213 0-.356-.144t-.143-.356V9.038q0-.212.144-.356t.357-.144t.356.144t.143.356v3.058q0 .213-.144.356t-.357.144m6.692 0q-.212 0-.356-.144t-.143-.356V10q0-.213.144-.356t.357-.144t.356.144t.143.356v2.096q0 .213-.144.356q-.144.144-.357.144M10 17q-2.931 0-4.966-2.033Q3 12.933 3 10.003t2.033-4.966T9.997 3t4.966 2.034T17 10q0 1.317-.457 2.493t-1.256 2.086l5.378 5.379q.14.134.14.34t-.14.358t-.353.14t-.354-.15l-5.36-5.36q-.929.8-2.105 1.257T10 17''/></svg>\")\n    },\n    {\n        Name: \"Item 3\",\n        Icon: \"data:image/svg+xml; utf-8, \" & EncodeUrl(\"<svg xmlns=''http://www.w3.org/2000/svg'' width=''200'' height=''200'' viewBox=''0 0 24 24''><path fill=''#COLORHERE'' d=''m7.4 21.308l-.708-.708l6.208-6.213l3.5 3.5l5.175-5.175l.713.713l-5.888 5.883l-3.5-3.5l-5.5 5.5ZM4.615 20q-.69 0-1.152-.462Q3 19.075 3 18.385V5.615q0-.69.463-1.152Q3.925 4 4.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v4.2H4v8.57q0 .23.192.423q.193.192.423.192v1ZM4 8.815h14v-3.2q0-.23-.192-.423Q17.615 5 17.385 5H4.615q-.23 0-.423.192Q4 5.385 4 5.615v3.2Zm0 0V5v3.815Z''/></svg>\")\n    }\n)"},"colSideMenu":{"displayName":"colSideMenu","description":"colSideMenu Property","dataType":"Table","default":"=Table(\n    {\n        Name: \"Dashboard\",\n        Category: \"Home\",\n        Screen: Screen2,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"Home\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Stock Take Summary\",\n        Category: \"Stock Take\",\n        Screen: StockTakeSummaryScreen,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"Summary\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Items List\",\n        Category: \"Stock Take\",\n        Screen: ProductList,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"List\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Outstanding Items\",\n        Category: \"Stock Take\",\n        Screen: Outstanding,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"Outstanding_Red\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Duplicate\",\n        Category: \"Stock Take\",\n        Screen: Duplicate,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"Duplicate\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Stock Take Schedule\",\n        Category: \"Stock Take\",\n        Screen: Schedule,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"Schedule\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Punch Record\",\n        Category: \"Stock Take\",\n        Screen: CheckInOut,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"TimeCard\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Shop List\",\n        Category: \"Shop Infomation\",\n        Screen: ShopList,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"Shop\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Brand Report\",\n        Category: \"Shop Infomation\",\n        Screen: BrandReport,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"Report\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Harware List\",\n        Category: \"Data\",\n        Screen: HardwareList,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"Hareware\"\n            ).IconData\n        )\n    },\n    {\n        Name: \"Inventory List\",\n        Category: \"Data\",\n        Screen: InventoryScreen,\n        MenuIcon: \"data:image/svg+xml;utf8, \" & EncodeUrl(\n            LookUp(\n                IconCollection,\n                IconName = \"Inventory\"\n            ).IconData\n        )\n    }\n)"}}',
  0
);

-- Notification Bell Component for PowerApps (5 editable properties)
INSERT INTO components (id, name, category_slug, description, yaml, tags, component_type, custom_properties, sort_order)
VALUES (
  'comp-custom-31',
  'Notification Bell Component for PowerApps',
  'custom-components',
  'this component to provide a clean, customizable notification bell for PowerApps apps. The component takes simple input properties for notification state (HasNotifications, NotificationCount) and displays a bell icon with appropriate visual indicators.

Key Features:
Theme Support: Automatically adapts to Light/Dark themes with proper contrast

Smart Badges: Shows dots for general notifications, counts for specific numbers, "99+" for large counts

Smooth Animations: Pulsing red dot animation when notifications are present but no count is specified

Full Accessibility: Dynamic screen reader labels that describe current notification state

Click Handling: Configurable OnSelect event for navigation or actions

Scalable Design: Single Size property controls overall component dimensions',
  'ComponentDefinitions:
  NotificationBell:
    DefinitionType: CanvasComponent
    CustomProperties:
      HasNotifications:
        PropertyKind: Input
        DisplayName: HasNotifications
        Description: Shows red notification dot when true
        DataType: Boolean
        Default: =true
      NotificationCount:
        PropertyKind: Input
        DisplayName: NotificationCount
        Description: Number of notifications (shows count if > 0)
        DataType: Number
        Default: =0
      NotificationText:
        PropertyKind: Input
        DisplayName: NotificationText
        Description: A custom property for notification label text
        DataType: Text
        Default: ="Notifications"
      OnSelect:
        PropertyKind: Event
        DisplayName: OnSelect
        Description: Action to perform when bell is clicked
        ReturnType: None
        Default: =false
      Size:
        PropertyKind: Input
        DisplayName: Size
        Description: Size of the notification bell (width and height in pixels)
        DataType: Number
        Default: =45
      Theme:
        PropertyKind: Input
        DisplayName: Theme
        Description: Light or Dark theme for visual appearance
        DataType: Text
        Default: ="Light"
    Properties:
      Fill: |-
        =// Transparent background for root container
        Color.Transparent
      Height: |-
        =// Component height is controlled by Size property
        NotificationBell.Size
      Width: |-
        =// Component width is controlled by Size property
        NotificationBell.Size
    Children:
      - cntBellContainer:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            DropShadow: |-
              =// No shadow effect
              DropShadow.None
            Fill: |-
              =// Transparent container background
              Color.Transparent
            Height: |-
              =// Fill parent height
              Parent.Height
            RadiusBottomLeft: |-
              =// Rounded corners for modern appearance
              6
            RadiusBottomRight: =6
            RadiusTopLeft: =6
            RadiusTopRight: =6
            Width: |-
              =// Fill parent width
              Parent.Width
          Children:
            - imgBell:
                Control: Image@2.2.3
                Properties:
                  AccessibleLabel: |-
                    =// Dynamic accessibility label based on notification state
                    If(
                        NotificationBell.HasNotifications || NotificationBell.NotificationCount > 0,
                        // When notifications exist, describe count or general state
                        NotificationBell.NotificationText & " - " & If(
                            NotificationBell.NotificationCount > 0,
                            NotificationBell.NotificationCount & " new " & NotificationBell.NotificationText,
                            "You have new " & NotificationBell.NotificationText
                        ),
                        // When no notifications, indicate empty state
                        "No new " & NotificationBell.NotificationText
                    )
                  BorderColor: |-
                    =// Dark blue border
                    RGBA(0, 18, 107, 1)
                  Height: |-
                    =// Fill container height
                    Parent.Height
                  Image: |-
                    =// Dynamic SVG bell icon with theme-aware coloring
                    Concatenate(
                      "data:image/svg+xml;utf8,",
                      EncodeUrl(
                        "<svg xmlns=''http://www.w3.org/2000/svg'' width=''100%'' height=''100%'' viewBox=''0 0 24 24'' fill=''none'' stroke=''" &
                        // White stroke for dark theme, black for light theme
                        If(NotificationBell.Theme = "Dark", "#ffffff", "#000000") &
                        "'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''>" &
                        // Bell body path
                        "<path d=''M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9''/>" &
                        // Bell clapper/bottom curve
                        "<path d=''M10.3 21a1.94 1.94 0 0 0 3.4 0''/>" &
                        "</svg>"
                      )
                    )
                  PaddingBottom: |-
                    =// Padding around the bell icon (15% of container size)
                    Parent.Height * 0.15
                  PaddingLeft: =Parent.Width * 0.15
                  PaddingRight: =Parent.Width * 0.15
                  PaddingTop: =Parent.Height * 0.15
                  Width: |-
                    =// Fill container width
                    Parent.Width
            - cntPulseAnimation:
                Control: GroupContainer@1.3.0
                Variant: ManualLayout
                Properties:
                  DropShadow: =DropShadow.None
                  Fill: |-
                    =// Animated fill with opacity that fades based on timer progress
                    If(
                        NotificationBell.Theme = "Dark",
                        // Red color with animated opacity for dark theme
                        RGBA(
                            239,
                            68,
                            68,
                            Max(
                                0,
                                0.3 * (1 - tmrPulse.Value / tmrPulse.Duration)
                            )
                        ),
                        // Slightly different red for light theme
                        RGBA(
                            220,
                            38,
                            38,
                            Max(
                                0,
                                0.3 * (1 - tmrPulse.Value / tmrPulse.Duration)
                            )
                        )
                    )
                  Height: |-
                    =// Animated height that grows with timer progress
                    16 + 12 * With({p: tmrPulse.Value / tmrPulse.Duration}, Power(p, 0.6))
                  RadiusBottomLeft: |-
                    =// Circular shape with radius = half of height
                    Self.Height / 2
                  RadiusBottomRight: =Self.Height / 2
                  RadiusTopLeft: =Self.Height / 2
                  RadiusTopRight: =Self.Height / 2
                  Visible: |-
                    =// Only visible when there are notifications but no specific count
                    NotificationBell.HasNotifications && NotificationBell.NotificationCount = 0
                  Width: |-
                    =// Animated width that grows with timer progress
                    16 + 12 * With({p: tmrPulse.Value / tmrPulse.Duration}, Power(p, 0.6))
                  X: "=// Position in top-right corner\nParent.Width - Self.Width "
                Children:
                  - tmrPulse:
                      Control: Timer@2.1.0
                      Properties:
                        AutoPause: |-
                          =// Don''t pause automatically
                          false
                        AutoStart: |-
                          =// Start automatically when conditions met
                          true
                        BorderColor: =ColorFade(Self.Fill, -15%)
                        Color: =RGBA(255, 255, 255, 1)
                        DisabledBorderColor: =ColorFade(Self.BorderColor, 70%)
                        DisabledColor: =ColorFade(Self.Fill, 90%)
                        DisabledFill: =ColorFade(Self.Fill, 70%)
                        Duration: |-
                          =// 1 second pulse cycle
                          1000
                        Fill: =RGBA(56, 96, 178, 1)
                        Font: =Font.''Open Sans''
                        Height: |-
                          =// Fixed timer size
                          16
                        HoverBorderColor: =ColorFade(Self.BorderColor, 20%)
                        HoverColor: =RGBA(255, 255, 255, 1)
                        HoverFill: =ColorFade(RGBA(56, 96, 178, 1), -20%)
                        PressedBorderColor: =Self.Fill
                        PressedColor: =Self.Fill
                        PressedFill: =Self.Color
                        Repeat: |-
                          =// Repeat the pulse animation
                          true
                        Start: |-
                          =// Start timer only when notifications exist but no count is shown
                          NotificationBell.HasNotifications && NotificationBell.NotificationCount = 0
                        Visible: |-
                          =// Timer is hidden, only animation effect is visible
                          false
                        Width: |-
                          =// Fixed timer size
                          16
            - cntNotificationBadge:
                Control: GroupContainer@1.3.0
                Variant: ManualLayout
                Properties:
                  DropShadow: =DropShadow.None
                  Fill: |-
                    =// Red background for notification badge
                    RGBA(220, 38, 38, 1)
                  Height: |-
                    =// Dynamic height: larger if showing count, smaller for simple dot
                    If(NotificationBell.NotificationCount > 0, Min(20, Parent.Height * 0.45), 12)
                  RadiusBottomLeft: |-
                    =// Circular shape with radius = half of height
                    Self.Height / 2
                  RadiusBottomRight: =Self.Height / 2
                  RadiusTopLeft: =Self.Height / 2
                  RadiusTopRight: =Self.Height / 2
                  Visible: |-
                    =// Visible when there are notifications or a count to display
                    NotificationBell.HasNotifications || NotificationBell.NotificationCount > 0
                  Width: |-
                    =// Dynamic width based on notification count
                    If(
                        NotificationBell.NotificationCount > 0,
                        // When showing count, width adjusts based on number size
                        Max(
                            Self.Height,        // Minimum width = height (circular)
                            If(
                                NotificationBell.NotificationCount > 99,
                                24,             // Width for "99+" display
                                If(
                                    NotificationBell.NotificationCount > 9,
                                    20,         // Width for two-digit numbers
                                    Self.Height // Width for single digits (circular)
                                )
                            )
                        ),
                        12                      // Simple dot width when no count
                    )
                  X: |-
                    =// Position in top-right corner with small margin
                    Parent.Width - Self.Width - 2
                  Y: =2
                Children:
                  - lblNotificationCount:
                      Control: Text@0.0.51
                      Properties:
                        Align: |-
                          =// Center-align text
                          ''TextCanvas.Align''.Center
                        Font: =Font.''Segoe UI''
                        FontColor: |-
                          =// White text
                          RGBA(255, 255, 255, 1)
                        Height: |-
                          =// Fill badge height
                          Parent.Height
                        Size: |-
                          =// Dynamic font size
                          Max(7, Parent.Height * 0.5)
                        Text: |-
                          =// Display count with "99+" cap for large numbers
                          If(
                              NotificationBell.NotificationCount > 0,
                              If(
                                  NotificationBell.NotificationCount > 99,
                                  "99+",                              // Cap at 99+
                                  Text(NotificationBell.NotificationCount) // Show actual count
                              ),
                              ""                                      // Empty when no count
                          )
                        VerticalAlign: |-
                          =// Vertical center
                          VerticalAlign.Middle
                        Visible: |-
                          =// Only visible when there''s a count to show
                          NotificationBell.NotificationCount > 0
                        Weight: |-
                          =// Bold font weight
                          ''TextCanvas.Weight''.Bold
                        Width: |-
                          =// Fill badge width
                          Parent.Width
            - btnBell:
                Control: Classic/Button@2.2.0
                Properties:
                  BorderColor: |-
                    =// No border
                    Color.Transparent
                  Color: =RGBA(255, 255, 255, 1)
                  DisabledBorderColor: =RGBA(166, 166, 166, 1)
                  Fill: |-
                    =// Transparent background
                    Color.Transparent
                  FocusedBorderColor: |-
                    =// Focus border color based on theme
                    If(NotificationBell.Theme = "Dark", RGBA(255,255,255,0.3), RGBA(0,0,0,0.3))
                  Font: =Font.''Open Sans''
                  Height: |-
                    =// Cover entire bell area
                    Parent.Height
                  HoverBorderColor: =ColorFade(Self.BorderColor, 20%)
                  HoverColor: =RGBA(255, 255, 255, 1)
                  HoverFill: |-
                    =// Hover background color based on theme
                    If(NotificationBell.Theme = "Dark", RGBA(255,255,255,0.1), RGBA(0,0,0,0.1))
                  OnSelect: |-
                    =// Execute the OnSelect event when button is clicked
                    NotificationBell.OnSelect()
                  PressedBorderColor: =Self.Fill
                  PressedColor: =Self.Fill
                  PressedFill: |-
                    =// Pressed background color based on theme
                    If(NotificationBell.Theme = "Dark", RGBA(255,255,255,0.2), RGBA(0,0,0,0.2))
                  RadiusBottomLeft: |-
                    =// Rounded corners matching container
                    6
                  RadiusBottomRight: =6
                  RadiusTopLeft: =6
                  RadiusTopRight: =6
                  Text: |-
                    =// No button text (invisible overlay)
                    ""
                  Tooltip: |-
                    =// Use bell''s accessibility label
                    imgBell.AccessibleLabel
                  Width: |-
                    =// Cover entire bell area
                    Parent.Width',
  'custom,imported',
  'definition',
  '{"HasNotifications":{"displayName":"HasNotifications","description":"Shows red notification dot when true","dataType":"Boolean","default":"=true"},"NotificationCount":{"displayName":"NotificationCount","description":"Number of notifications (shows count if > 0)","dataType":"Number","default":"=0"},"NotificationText":{"displayName":"NotificationText","description":"A custom property for notification label text","dataType":"Text","default":"=\"Notifications\""},"Size":{"displayName":"Size","description":"Size of the notification bell (width and height in pixels)","dataType":"Number","default":"=45"},"Theme":{"displayName":"Theme","description":"Light or Dark theme for visual appearance","dataType":"Text","default":"=\"Light\""}}',
  0
);

-- Calendar (10 editable properties)
INSERT INTO components (id, name, category_slug, description, yaml, tags, component_type, custom_properties, sort_order)
VALUES (
  'comp-custom-68',
  'Calendar',
  'custom-components',
  'Custom Power Apps component',
  'ComponentDefinitions:
  Component3_1:
    DefinitionType: CanvasComponent
    CustomProperties:
      CompHeight:
        PropertyKind: Input
        DisplayName: CompHeight
        Description: 自訂屬性
        DataType: Number
        Default: =100
      CompWidth:
        PropertyKind: Input
        DisplayName: ''CompWidth ''
        Description: 自訂屬性
        DataType: Number
        Default: =100
      PrimaryColor:
        PropertyKind: Input
        DisplayName: PrimaryColor
        Description: A custom property
        DataType: Color
        Default: =ColorValue("#0A6181")
      SecondaryColor:
        PropertyKind: Input
        DisplayName: SecondaryColor
        Description: A custom property
        DataType: Color
        Default: =ColorValue("#E41376")
      TableHolidays:
        PropertyKind: Input
        DisplayName: TableHolidays
        Description: A custom property
        DataType: Table
        Default: |-
          =Table({ date: Date(yearSelected, 12, 25), NameHoliday: "Christmas" }, { date: Date(yearSelected, 12, 31), NameHoliday: "New Year''s Eve" })
      TableMonths:
        PropertyKind: Input
        DisplayName: TableMonths
        Description: A custom property
        DataType: Table
        Default: |-
          =Table(
              {
                  monthName: "January",
                  monthNumber: 1
              },
              {
                  monthName: "February",
                  monthNumber: 2
              },
              {
                  monthName: "March",
                  monthNumber: 3
              },
              {
                  monthName: "April",
                  monthNumber: 4
              },
              {
                  monthName: "May",
                  monthNumber: 5
              },
              {
                  monthName: "June",
                  monthNumber: 6
              },
              {
                  monthName: "July",
                  monthNumber: 7
              },
              {
                  monthName: "August",
                  monthNumber: 8
              },
              {
                  monthName: "September",
                  monthNumber: 9
              },
              {
                  monthName: "October",
                  monthNumber: 10
              },
              {
                  monthName: "November",
                  monthNumber: 11
              },
              {
                  monthName: "December",
                  monthNumber: 12
              }
          )
      TableWeekDays:
        PropertyKind: Input
        DisplayName: TableWeekDays
        Description: A custom property
        DataType: Table
        Default: |-
          =Table({ WeekDay: "Monday", WeekDayNumber: 1 }, { WeekDay: "Tuesday", WeekDayNumber: 2 }, { WeekDay: "Wednesday", WeekDayNumber: 3 }, { WeekDay: "Thursday", WeekDayNumber: 4 }, { WeekDay: "Friday", WeekDayNumber: 5 }, { WeekDay: "Saturday", WeekDayNumber: 6 }, { WeekDay: "Sunday", WeekDayNumber: 7 })
      TableYears:
        PropertyKind: Input
        DisplayName: TableYears
        Description: A custom property
        DataType: Table
        Default: =Sequence(Sum(Value(Year(Today()) + 2), -Value(Year(Today()) - 10)), Year(Today()) - 10, 1)
      TertiaryColor:
        PropertyKind: Input
        DisplayName: TertiaryColor
        Description: A custom property
        DataType: Color
        Default: =ColorValue("#1CB3E0")
      ctxSelectedDate:
        PropertyKind: Input
        DisplayName: ctxSelectedDate
        Description: 自訂屬性
        DataType: Table
        Default: =
    Properties:
      Height: =App.Height
      Width: ''=App.Width ''
    Children:
      - containerMain_3:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            Height: |+
              =Parent.Height
            LayoutDirection: =LayoutDirection.Vertical
            PaddingBottom: =15
            PaddingLeft: =15
            PaddingRight: =15
            PaddingTop: =15
            Width: |+
              =Parent.Width
          Children:
            - containerHeader_3:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  DropShadow: =DropShadow.None
                  FillPortions: =0.1
                  Height: =100
                  LayoutAlignItems: =LayoutAlignItems.Center
                  LayoutDirection: =LayoutDirection.Horizontal
                  LayoutGap: =10
                  LayoutJustifyContent: =LayoutJustifyContent.End
                  LayoutMinHeight: =10
                  LayoutMinWidth: =0
                  PaddingLeft: =15
                  PaddingRight: =15
                Children:
                  - containerLabelDay_3:
                      Control: GroupContainer@1.3.0
                      Variant: AutoLayout
                      Properties:
                        DropShadow: =DropShadow.None
                        LayoutAlignItems: =LayoutAlignItems.Center
                        LayoutDirection: =LayoutDirection.Horizontal
                        LayoutMinHeight: =10
                        LayoutMinWidth: =10
                        Width: =0
                      Children:
                        - lblToday_5:
                            Control: Text@0.0.51
                            Properties:
                              AlignInContainer: =AlignInContainer.Stretch
                              FillPortions: =1
                              PaddingLeft: =0
                              Size: =20
                              Text: =Proper(Text(Today(),"dddd, mm/dd/yyyy","en-US"))
                  - cmbMonthsBackUp_3:
                      Control: Classic/ComboBox@2.4.0
                      Properties:
                        BorderColor: =Component3_1.PrimaryColor
                        ChevronBackground: =Component3_1.PrimaryColor
                        ChevronDisabledBackground: =RGBA(242, 242, 241, 0)
                        ChevronDisabledFill: =RGBA(161, 159, 157, 1)
                        ChevronFill: =RGBA(50, 49, 48, 1)
                        ChevronHoverBackground: =ColorFade(Self.ChevronBackground, -20%)
                        ChevronHoverFill: =RGBA(50, 49, 48, 1)
                        Color: =RGBA(50, 49, 48, 1)
                        DefaultSelectedItems: ={Value:LookUp(Component3_1.TableMonths,monthNumber=monthSelected_1).monthName}
                        DisabledBorderColor: =RGBA(0, 0, 0, 0)
                        DisabledColor: =RGBA(161, 159, 157, 1)
                        DisabledFill: =RGBA(242, 242, 241, 0)
                        DisplayFields: =["monthName"]
                        Fill: =RGBA(245, 245, 245, 1)
                        Font: =Font.''Segoe UI''
                        HoverBorderColor: =RGBA(16, 110, 190, 1)
                        HoverColor: =RGBA(50, 49, 48, 1)
                        HoverFill: =ColorFade(Self.ChevronBackground,70%)
                        IsSearchable: =false
                        Items: =Component3_1.TableMonths
                        OnChange: |-
                          =If(
                              IsBlank(Self.Selected),
                              Reset(Self);
                              Notify(
                                  "Impossibile inserire un valore vuoto",
                                  NotificationType.Error,
                                  5000
                              ),
                              Set(
                                  monthSelected_1,
                                  Coalesce(
                                      Self.Selected.monthNumber,
                                      monthSelected_1
                                  )
                              );
                              Clear(collDays);
                              ForAll(
                                  Sequence(
                                      Value(
                                          Day(
                                              EOMonth(
                                                  Date(
                                                      yearSelected,
                                                      monthSelected_1,
                                                      1
                                                  ),
                                                  0
                                              )
                                          )
                                      ),
                                      1,
                                      1
                                  ),
                                  Collect(
                                      collDays,
                                      {
                                          dateDay: Date(
                                              yearSelected,
                                              monthSelected_1,
                                              Value
                                          )
                                      }
                                  )
                              );
                              If(
                                  Weekday(
                                      First(collDays).dateDay,
                                      StartOfWeek.Monday
                                  ) <> 1,
                                  ForAll(
                                      Sequence(
                                          Weekday(
                                              First(collDays).dateDay,
                                              StartOfWeek.Tuesday
                                          ),
                                          1,
                                          1
                                      ),
                                      Collect(
                                          collDays,
                                          {
                                              dateDay: DateAdd(
                                                  First(collDays).dateDay,
                                                  -Value,
                                                  TimeUnit.Days
                                              )
                                          }
                                      )
                                  )
                              );
                              If(
                                  Weekday(
                                      Last(
                                          SortByColumns(
                                              Filter(
                                                  collDays,
                                                  Month(dateDay) = monthSelected_1
                                              ),
                                              "dateDay",
                                              SortOrder.Ascending
                                          )
                                      ).dateDay,
                                      StartOfWeek.Sunday
                                  ) <> 1,
                                  ForAll(
                                      Sequence(
                                          7 - Weekday(
                                              Last(
                                                  SortByColumns(
                                                      Filter(
                                                          collDays,
                                                          Month(dateDay) = monthSelected_1
                                                      ),
                                                      "dateDay",
                                                      SortOrder.Ascending
                                                  )
                                              ).dateDay,
                                              StartOfWeek.Monday
                                          ),
                                          1,
                                          1
                                      ),
                                      Collect(
                                          collDays,
                                          {
                                              dateDay: DateAdd(
                                                  Last(
                                                      SortByColumns(
                                                          Filter(
                                                              collDays,
                                                              Month(dateDay) = monthSelected_1
                                                          ),
                                                          "dateDay",
                                                          SortOrder.Ascending
                                                      )
                                                  ).dateDay,
                                                  Value,
                                                  TimeUnit.Days
                                              )
                                          }
                                      )
                                  )
                              )
                          )
                        PressedBorderColor: =RGBA(16, 110, 190, 1)
                        PressedColor: =RGBA(255, 255, 255, 1)
                        PressedFill: =Self.ChevronBackground
                        SearchFields: =["monthName"]
                        SelectMultiple: =false
                        SelectionColor: =RGBA(255, 255, 255, 1)
                        SelectionFill: =Self.ChevronBackground
                        Visible: =false
                        Width: =300
                  - cmbYearsBackUp_3:
                      Control: Classic/ComboBox@2.4.0
                      Properties:
                        BorderColor: =Component3_1.PrimaryColor
                        ChevronBackground: =Component3_1.PrimaryColor
                        ChevronDisabledBackground: =RGBA(242, 242, 241, 0)
                        ChevronDisabledFill: =RGBA(161, 159, 157, 1)
                        ChevronFill: =RGBA(50, 49, 48, 1)
                        ChevronHoverBackground: =ColorFade(Self.ChevronBackground, -20%)
                        ChevronHoverFill: =RGBA(50, 49, 48, 1)
                        Color: =RGBA(50, 49, 48, 1)
                        DefaultSelectedItems: ={Value:yearSelected}
                        DisabledBorderColor: =RGBA(0, 0, 0, 0)
                        DisabledColor: =RGBA(161, 159, 157, 1)
                        DisabledFill: =RGBA(242, 242, 241, 0)
                        DisplayFields: =["Value"]
                        Fill: =RGBA(245, 245, 245, 1)
                        FillPortions: =1
                        Font: =Font.''Segoe UI''
                        HoverBorderColor: =RGBA(16, 110, 190, 1)
                        HoverColor: =RGBA(50, 49, 48, 1)
                        HoverFill: =ColorFade(Self.ChevronBackground,70%)
                        IsSearchable: =false
                        Items: =Component3_1.TableYears
                        LayoutMinWidth: =0
                        OnChange: |-
                          =If(
                              IsBlank(Self.Selected),
                              Reset(Self);
                              Notify(
                                  "Impossibile inserire un valore vuoto",
                                  NotificationType.Error,
                                  5000
                              ),
                              Set(
                                  yearSelected,
                                  Coalesce(
                                      Self.Selected.Value,
                                      yearSelected
                                  )
                              );
                              Clear(collDays);
                              ForAll(
                                  Sequence(
                                      Value(
                                          Day(
                                              EOMonth(
                                                  Date(
                                                      yearSelected,
                                                      monthSelected_1,
                                                      1
                                                  ),
                                                  0
                                              )
                                          )
                                      ),
                                      1,
                                      1
                                  ),
                                  Collect(
                                      collDays,
                                      {
                                          dateDay: Date(
                                              yearSelected,
                                              monthSelected_1,
                                              Value
                                          )
                                      }
                                  )
                              );
                              If(
                                  Weekday(
                                      First(collDays).dateDay,
                                      StartOfWeek.Monday
                                  ) <> 1,
                                  ForAll(
                                      Sequence(
                                          Weekday(
                                              First(collDays).dateDay,
                                              StartOfWeek.Tuesday
                                          ),
                                          1,
                                          1
                                      ),
                                      Collect(
                                          collDays,
                                          {
                                              dateDay: DateAdd(
                                                  First(collDays).dateDay,
                                                  -Value,
                                                  TimeUnit.Days
                                              )
                                          }
                                      )
                                  )
                              );
                              If(
                                  Weekday(
                                      Last(
                                          SortByColumns(
                                              Filter(
                                                  collDays,
                                                  Month(dateDay) = monthSelected_1
                                              ),
                                              "dateDay",
                                              SortOrder.Ascending
                                          )
                                      ).dateDay,
                                      StartOfWeek.Sunday
                                  ) <> 1,
                                  ForAll(
                                      Sequence(
                                          7 - Weekday(
                                              Last(
                                                  SortByColumns(
                                                      Filter(
                                                          collDays,
                                                          Month(dateDay) = monthSelected_1
                                                      ),
                                                      "dateDay",
                                                      SortOrder.Ascending
                                                  )
                                              ).dateDay,
                                              StartOfWeek.Monday
                                          ),
                                          1,
                                          1
                                      ),
                                      Collect(
                                          collDays,
                                          {
                                              dateDay: DateAdd(
                                                  Last(
                                                      SortByColumns(
                                                          Filter(
                                                              collDays,
                                                              Month(dateDay) = monthSelected_1
                                                          ),
                                                          "dateDay",
                                                          SortOrder.Ascending
                                                      )
                                                  ).dateDay,
                                                  Value,
                                                  TimeUnit.Days
                                              )
                                          }
                                      )
                                  )
                              )
                          )
                        PressedBorderColor: =RGBA(16, 110, 190, 1)
                        PressedColor: =RGBA(255, 255, 255, 1)
                        PressedFill: =Self.ChevronBackground
                        SearchFields: =[""]
                        SelectMultiple: =false
                        SelectionColor: =RGBA(255, 255, 255, 1)
                        SelectionFill: =Self.ChevronBackground
                        Visible: =false
                        Width: =300
                        X: =2
                  - btnCalendarCollection_3:
                      Control: Button@0.0.45
                      Properties:
                        FillPortions: =1
                        OnSelect: |
                          =Set(
                              yearSelected,
                              Value(Year(Today()))
                          );
                          Set(
                              monthSelected_1,
                              Month(Today())
                          );

                          Clear(collDays);
                          ForAll(
                              Sequence(
                                  Value(
                                      Day(
                                          EOMonth(
                                              Date(
                                                  yearSelected,
                                                  monthSelected_1,
                                                  1
                                              ),
                                              0
                                          )
                                      )
                                  ),
                                  1,
                                  1
                              ),
                              Collect(
                                  collDays,
                                  {
                                      dateDay: Date(
                                          yearSelected,
                                          monthSelected_1,
                                          Value
                                      )
                                  }
                              )
                          );
                          If(
                              Weekday(
                                  First(collDays).dateDay,
                                  StartOfWeek.Monday
                              ) <> 1,
                              ForAll(
                                  Sequence(
                                      Weekday(
                                          First(collDays).dateDay,
                                          StartOfWeek.Tuesday
                                      ),
                                      1,
                                      1
                                  ),
                                  Collect(
                                      collDays,
                                      {
                                          dateDay: DateAdd(
                                              First(collDays).dateDay,
                                              -Value,
                                              TimeUnit.Days
                                          )
                                      }
                                  )
                              )
                          );
                          If(
                              Weekday(
                                  Last(
                                      SortByColumns(
                                          Filter(
                                              collDays,
                                              Month(dateDay) = monthSelected_1
                                          ),
                                          "dateDay",
                                          SortOrder.Ascending
                                      )
                                  ).dateDay,
                                  StartOfWeek.Sunday
                              ) <> 1,
                              ForAll(
                                  Sequence(
                                      7 - Weekday(
                                          Last(
                                              SortByColumns(
                                                  Filter(
                                                      collDays,
                                                      Month(dateDay) = monthSelected_1
                                                  ),
                                                  "dateDay",
                                                  SortOrder.Ascending
                                              )
                                          ).dateDay,
                                          StartOfWeek.Monday
                                      ),
                                      1,
                                      1
                                  ),
                                  Collect(
                                      collDays,
                                      {
                                          dateDay: DateAdd(
                                              Last(
                                                  SortByColumns(
                                                      Filter(
                                                          collDays,
                                                          Month(dateDay) = monthSelected_1
                                                      ),
                                                      "dateDay",
                                                      SortOrder.Ascending
                                                  )
                                              ).dateDay,
                                              Value,
                                              TimeUnit.Days
                                          )
                                      }
                                  )
                              )
                          );
                        Text: ="Calendar''s Collection"
                        Width: =200
                  - cmbMonthsModern_3:
                      Control: ComboBox@0.0.51
                      Properties:
                        DefaultSelectedItems: ={monthName:LookUp(Component3_1.TableMonths,monthNumber=monthSelected_1).monthName}
                        FillPortions: =1
                        Items: =Component3_1.TableMonths
                        LayoutMinWidth: =0
                        OnChange: |-
                          =If(
                              IsBlank(Self.Selected),
                              Reset(Self);
                              Notify(
                                  "Impossibile inserire un valore vuoto",
                                  NotificationType.Error,
                                  5000
                              ),
                              Set(
                                  monthSelected_1,
                                  Coalesce(
                                      Self.Selected.monthNumber,
                                      monthSelected_1
                                  )
                              );
                              Clear(collDays);
                              ForAll(
                                  Sequence(
                                      Value(
                                          Day(
                                              EOMonth(
                                                  Date(
                                                      yearSelected,
                                                      monthSelected_1,
                                                      1
                                                  ),
                                                  0
                                              )
                                          )
                                      ),
                                      1,
                                      1
                                  ),
                                  Collect(
                                      collDays,
                                      {
                                          dateDay: Date(
                                              yearSelected,
                                              monthSelected_1,
                                              Value
                                          )
                                      }
                                  )
                              );
                              If(
                                  Weekday(
                                      First(collDays).dateDay,
                                      StartOfWeek.Monday
                                  ) <> 1,
                                  ForAll(
                                      Sequence(
                                          Weekday(
                                              First(collDays).dateDay,
                                              StartOfWeek.Tuesday
                                          ),
                                          1,
                                          1
                                      ),
                                      Collect(
                                          collDays,
                                          {
                                              dateDay: DateAdd(
                                                  First(collDays).dateDay,
                                                  -Value,
                                                  TimeUnit.Days
                                              )
                                          }
                                      )
                                  )
                              );
                              If(
                                  Weekday(
                                      Last(
                                          SortByColumns(
                                              Filter(
                                                  collDays,
                                                  Month(dateDay) = monthSelected_1
                                              ),
                                              "dateDay",
                                              SortOrder.Ascending
                                          )
                                      ).dateDay,
                                      StartOfWeek.Sunday
                                  ) <> 1,
                                  ForAll(
                                      Sequence(
                                          7 - Weekday(
                                              Last(
                                                  SortByColumns(
                                                      Filter(
                                                          collDays,
                                                          Month(dateDay) = monthSelected_1
                                                      ),
                                                      "dateDay",
                                                      SortOrder.Ascending
                                                  )
                                              ).dateDay,
                                              StartOfWeek.Monday
                                          ),
                                          1,
                                          1
                                      ),
                                      Collect(
                                          collDays,
                                          {
                                              dateDay: DateAdd(
                                                  Last(
                                                      SortByColumns(
                                                          Filter(
                                                              collDays,
                                                              Month(dateDay) = monthSelected_1
                                                          ),
                                                          "dateDay",
                                                          SortOrder.Ascending
                                                      )
                                                  ).dateDay,
                                                  Value,
                                                  TimeUnit.Days
                                              )
                                          }
                                      )
                                  )
                              )
                          )
                      Children:
                        - monthName1_3:
                            Control: ComboBoxDataField@1.5.0
                            Variant: textualColumn
                            IsLocked: true
                            Properties:
                              FieldDisplayName: ="monthName"
                              FieldName: ="monthName"
                              FieldType: ="s"
                              Order: =1
                  - cmbYearsModern_3:
                      Control: ComboBox@0.0.51
                      Properties:
                        DefaultSelectedItems: ={Value:yearSelected}
                        FillPortions: =1
                        Height: =35
                        Items: =Component3_1.TableYears
                        LayoutMinWidth: =0
                        OnChange: |-
                          =If(
                              IsBlank(Self.Selected),
                              Reset(Self);
                              Notify(
                                  "Impossibile inserire un valore vuoto",
                                  NotificationType.Error,
                                  5000
                              ),
                              Set(
                                  yearSelected,
                                  Coalesce(
                                      Self.Selected.Value,
                                      yearSelected
                                  )
                              );
                              Clear(collDays);
                              ForAll(
                                  Sequence(
                                      Value(
                                          Day(
                                              EOMonth(
                                                  Date(
                                                      yearSelected,
                                                      monthSelected_1,
                                                      1
                                                  ),
                                                  0
                                              )
                                          )
                                      ),
                                      1,
                                      1
                                  ),
                                  Collect(
                                      collDays,
                                      {
                                          dateDay: Date(
                                              yearSelected,
                                              monthSelected_1,
                                              Value
                                          )
                                      }
                                  )
                              );
                              If(
                                  Weekday(
                                      First(collDays).dateDay,
                                      StartOfWeek.Monday
                                  ) <> 1,
                                  ForAll(
                                      Sequence(
                                          Weekday(
                                              First(collDays).dateDay,
                                              StartOfWeek.Tuesday
                                          ),
                                          1,
                                          1
                                      ),
                                      Collect(
                                          collDays,
                                          {
                                              dateDay: DateAdd(
                                                  First(collDays).dateDay,
                                                  -Value,
                                                  TimeUnit.Days
                                              )
                                          }
                                      )
                                  )
                              );
                              If(
                                  Weekday(
                                      Last(
                                          SortByColumns(
                                              Filter(
                                                  collDays,
                                                  Month(dateDay) = monthSelected_1
                                              ),
                                              "dateDay",
                                              SortOrder.Ascending
                                          )
                                      ).dateDay,
                                      StartOfWeek.Sunday
                                  ) <> 1,
                                  ForAll(
                                      Sequence(
                                          7 - Weekday(
                                              Last(
                                                  SortByColumns(
                                                      Filter(
                                                          collDays,
                                                          Month(dateDay) = monthSelected_1
                                                      ),
                                                      "dateDay",
                                                      SortOrder.Ascending
                                                  )
                                              ).dateDay,
                                              StartOfWeek.Monday
                                          ),
                                          1,
                                          1
                                      ),
                                      Collect(
                                          collDays,
                                          {
                                              dateDay: DateAdd(
                                                  Last(
                                                      SortByColumns(
                                                          Filter(
                                                              collDays,
                                                              Month(dateDay) = monthSelected_1
                                                          ),
                                                          "dateDay",
                                                          SortOrder.Ascending
                                                      )
                                                  ).dateDay,
                                                  Value,
                                                  TimeUnit.Days
                                              )
                                          }
                                      )
                                  )
                              )
                          )
            - glryWeekDays_3:
                Control: Gallery@2.15.0
                Variant: BrowseLayout_Vertical_TwoTextOneImageVariant_ver5.0
                Properties:
                  BorderColor: =RGBA(245, 245, 245, 1)
                  FillPortions: =0.1
                  Height: =40
                  Items: =Component3_1.TableWeekDays
                  LayoutMinHeight: =10
                  LayoutMinWidth: =10
                  TemplatePadding: =10
                  TemplateSize: =50
                  Width: =1366
                  WrapCount: =7
                  Y: =95
                Children:
                  - containerWeekDay_3:
                      Control: GroupContainer@1.3.0
                      Variant: AutoLayout
                      Properties:
                        Fill: =Color.Transparent
                        Height: =Parent.TemplateHeight
                        LayoutDirection: =LayoutDirection.Vertical
                        LayoutJustifyContent: =LayoutJustifyContent.Center
                        Width: =Parent.TemplateWidth
                      Children:
                        - btnShowWeekDay_3:
                            Control: Classic/Button@2.2.0
                            Properties:
                              AlignInContainer: =AlignInContainer.Stretch
                              BorderColor: =RGBA(0, 0, 0, 0)
                              BorderStyle: =BorderStyle.None
                              Color: =Color.White
                              DisabledBorderColor: =RGBA(0, 0, 0, 0)
                              DisabledColor: =RGBA(161, 159, 157, 1)
                              DisabledFill: =RGBA(242, 242, 241, 0)
                              DisplayMode: =DisplayMode.View
                              Fill: =Component3_1.SecondaryColor
                              FillPortions: =1
                              Font: =Font.''Segoe UI''
                              Height: =120
                              HoverBorderColor: =RGBA(0, 0, 0, 0)
                              HoverColor: =RGBA(255, 255, 255, 1)
                              HoverFill: =ColorFade(Self.Fill, -20%)
                              LayoutMinHeight: =10
                              LayoutMinWidth: =10
                              PressedBorderColor: =RGBA(0, 69, 120, 1)
                              PressedColor: =RGBA(255, 255, 255, 1)
                              PressedFill: =RGBA(16, 110, 190, 1)
                              RadiusBottomLeft: =0
                              RadiusBottomRight: =0
                              RadiusTopLeft: =0
                              RadiusTopRight: =0
                              Size: =12
                              Text: =ThisItem.WeekDay
                              Width: =120
            - glryCalendar_3:
                Control: Gallery@2.15.0
                Variant: BrowseLayout_Vertical_TwoTextOneImageVariant_ver5.0
                Properties:
                  BorderColor: =RGBA(245, 245, 245, 1)
                  FillPortions: =0.8
                  Height: =673
                  Items: =SortByColumns(collDays,"dateDay",SortOrder.Ascending)
                  LayoutMinHeight: =10
                  LayoutMinWidth: =10
                  TemplatePadding: =10
                  TemplateSize: =70
                  Width: =1366
                  WrapCount: =7
                  Y: =95
                Children:
                  - containerDays_3:
                      Control: GroupContainer@1.3.0
                      Variant: AutoLayout
                      Properties:
                        Fill: =Component3_1.PrimaryColor
                        Height: =Parent.TemplateHeight
                        LayoutDirection: =LayoutDirection.Vertical
                        LayoutJustifyContent: =LayoutJustifyContent.Center
                        Width: =Parent.TemplateWidth
                      Children:
                        - btnShowDay_3:
                            Control: Classic/Button@2.2.0
                            Properties:
                              AlignInContainer: =AlignInContainer.Stretch
                              BorderColor: =RGBA(0, 0, 0, 0)
                              BorderStyle: =BorderStyle.None
                              Color: =RGBA(255, 255, 255, 1)
                              DisabledBorderColor: =RGBA(0, 0, 0, 0)
                              DisabledColor: =RGBA(161, 159, 157, 1)
                              DisabledFill: =RGBA(242, 242, 241, 0)
                              DisplayMode: |-
                                =If(
                                    Month(ThisItem.dateDay) = monthSelected_1,
                                    DisplayMode.Edit,
                                    DisplayMode.Disabled
                                )
                              Fill: |
                                =If(
                                    ThisItem.dateDay = Today(),
                                    Component3_1.TertiaryColor,
                                    !IsBlankOrError(
                                        LookUp(
                                            Component3_1.TableHolidays,
                                            date = ThisItem.dateDay
                                        )
                                    ),
                                    Component3_1.SecondaryColor,
                                    ThisItem.IsSelected,
                                    ColorFade(
                                        Component3_1.PrimaryColor,
                                        50%
                                    ),
                                    Component3_1.PrimaryColor
                                )
                              FillPortions: =1
                              Font: =Font.''Segoe UI''
                              Height: =120
                              HoverBorderColor: =RGBA(0, 0, 0, 0)
                              HoverColor: =RGBA(255, 255, 255, 1)
                              HoverFill: =ColorFade(Self.Fill, -20%)
                              LayoutMinHeight: =10
                              LayoutMinWidth: =10
                              OnSelect: "=Set(ctxSelectedDate, ThisItem.dateDay);\nNotify(\n    Text(\n        ThisItem.dateDay,\n        \"mm/dd/yyyy\"\n    ) & If(\n        !IsBlankOrError(\n            LookUp(\n                Component3_1.TableHolidays,\n                date = ThisItem.dateDay\n            )\n        ),\n        $\"- {LookUp(\n            Component3_1.TableHolidays,\n            date = ThisItem.dateDay\n        ).NameHoliday}\"\n    )\n);\n \n\n"
                              PressedBorderColor: =RGBA(0, 69, 120, 1)
                              PressedColor: =RGBA(255, 255, 255, 1)
                              PressedFill: =RGBA(16, 110, 190, 1)
                              RadiusBottomLeft: =0
                              RadiusBottomRight: =0
                              RadiusTopLeft: =0
                              RadiusTopRight: =0
                              Text: ''=Day(ThisItem.dateDay) ''
                              Width: =120',
  'custom,imported',
  'definition',
  '{"CompHeight":{"displayName":"CompHeight","description":"自訂屬性","dataType":"Number","default":"=100"},"CompWidth":{"displayName":"CompWidth ","description":"自訂屬性","dataType":"Number","default":"=100"},"PrimaryColor":{"displayName":"PrimaryColor","description":"A custom property","dataType":"Color","default":"=ColorValue(\"#0A6181\")"},"SecondaryColor":{"displayName":"SecondaryColor","description":"A custom property","dataType":"Color","default":"=ColorValue(\"#E41376\")"},"TableHolidays":{"displayName":"TableHolidays","description":"A custom property","dataType":"Table","default":"=Table({ date: Date(yearSelected, 12, 25), NameHoliday: \"Christmas\" }, { date: Date(yearSelected, 12, 31), NameHoliday: \"New Year''s Eve\" })"},"TableMonths":{"displayName":"TableMonths","description":"A custom property","dataType":"Table","default":"=Table(\n    {\n        monthName: \"January\",\n        monthNumber: 1\n    },\n    {\n        monthName: \"February\",\n        monthNumber: 2\n    },\n    {\n        monthName: \"March\",\n        monthNumber: 3\n    },\n    {\n        monthName: \"April\",\n        monthNumber: 4\n    },\n    {\n        monthName: \"May\",\n        monthNumber: 5\n    },\n    {\n        monthName: \"June\",\n        monthNumber: 6\n    },\n    {\n        monthName: \"July\",\n        monthNumber: 7\n    },\n    {\n        monthName: \"August\",\n        monthNumber: 8\n    },\n    {\n        monthName: \"September\",\n        monthNumber: 9\n    },\n    {\n        monthName: \"October\",\n        monthNumber: 10\n    },\n    {\n        monthName: \"November\",\n        monthNumber: 11\n    },\n    {\n        monthName: \"December\",\n        monthNumber: 12\n    }\n)"},"TableWeekDays":{"displayName":"TableWeekDays","description":"A custom property","dataType":"Table","default":"=Table({ WeekDay: \"Monday\", WeekDayNumber: 1 }, { WeekDay: \"Tuesday\", WeekDayNumber: 2 }, { WeekDay: \"Wednesday\", WeekDayNumber: 3 }, { WeekDay: \"Thursday\", WeekDayNumber: 4 }, { WeekDay: \"Friday\", WeekDayNumber: 5 }, { WeekDay: \"Saturday\", WeekDayNumber: 6 }, { WeekDay: \"Sunday\", WeekDayNumber: 7 })"},"TableYears":{"displayName":"TableYears","description":"A custom property","dataType":"Table","default":"=Sequence(Sum(Value(Year(Today()) + 2), -Value(Year(Today()) - 10)), Year(Today()) - 10, 1)"},"TertiaryColor":{"displayName":"TertiaryColor","description":"A custom property","dataType":"Color","default":"=ColorValue(\"#1CB3E0\")"},"ctxSelectedDate":{"displayName":"ctxSelectedDate","description":"自訂屬性","dataType":"Table","default":"="}}',
  0
);
