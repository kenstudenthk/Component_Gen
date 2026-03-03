-- Test Migration: Update Classic Button with real YAML
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