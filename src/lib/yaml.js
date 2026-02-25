// --- YAML Generation Logic ---
// No version pins — Power Apps will use the current version for the environment
const CONTROL_VERSIONS = {};

export const yamlSafeValue = (value) => {
  if (typeof value !== "string") return value;
  if (value.includes(": ") || value.includes(" #") || /^[[\]{},]/.test(value)) {
    return `'${value.replace(/'/g, "''")}'`;
  }
  return value;
};

export const yamlControl = (
  indent,
  name,
  controlType,
  properties,
  childrenYaml = "",
  variant = null,
) => {
  const pad = " ".repeat(indent);
  const inner = " ".repeat(indent + 4);
  const propPad = " ".repeat(indent + 6);
  const version = CONTROL_VERSIONS[controlType];
  const controlValue = version ? `${controlType}@${version}` : controlType;

  let yaml = `${pad}- ${name}:\n`;
  yaml += `${inner}Control: ${controlValue}\n`;
  if (variant) yaml += `${inner}Variant: ${variant}\n`;

  const propEntries = Object.entries(properties);
  if (propEntries.length > 0) {
    yaml += `${inner}Properties:\n`;
    for (const [key, value] of propEntries) {
      yaml += `${propPad}${key}: ${yamlSafeValue(value)}\n`;
    }
  }
  if (childrenYaml) {
    yaml += `${inner}Children:\n${childrenYaml}`;
  }
  return yaml;
};

// Sanitize user text: # breaks YAML single-line formulas (treated as comment)
// and : can be misread as a YAML key. Strip both characters.
export const sanitizeYamlText = (text) =>
  String(text).replace(/#/g, "").replace(/:/g, "-");

export const generatePowerAppsYAML = (activeComponentName, settings) => {
  const type = settings.type;

  if (type === "form") {
    const { title, subtitle, fields, primaryButtonText, secondaryButtonText } =
      settings;
    let children = "";
    children += yamlControl(6, "TitleLabel", "Label", {
      Text: `="${sanitizeYamlText(title)}"`,
      Size: "=20",
      FontWeight: "=FontWeight.Bold",
      X: "=40",
      Y: "=40",
    });
    children += yamlControl(6, "SubtitleLabel", "Label", {
      Text: `="${sanitizeYamlText(subtitle)}"`,
      Size: "=12",
      Color: "=RGBA(100, 116, 139, 1)",
      X: "=40",
      Y: "=80",
    });
    fields.forEach((field, index) => {
      const yPos = 130 + index * 90;
      children += yamlControl(6, `Label_${index}`, "Label", {
        Text: `="${sanitizeYamlText(field.label)}"`,
        FontWeight: "=FontWeight.Semibold",
        X: "=40",
        Y: `=${yPos}`,
      });
      children += yamlControl(6, `Input_${index}`, "TextInput", {
        Default: '=""',
        HintText: `="${sanitizeYamlText(field.placeholder)}"`,
        X: "=40",
        Y: `=${yPos + 30}`,
        Width: "=420",
        Height: "=40",
        BorderThickness: "=1",
        BorderColor: "=RGBA(226, 232, 240, 1)",
      });
    });
    const btnY = 150 + fields.length * 90;
    children += yamlControl(6, "BtnPrimary", "Button", {
      Text: `="${sanitizeYamlText(primaryButtonText)}"`,
      X: "=40",
      Y: `=${btnY}`,
      Width: "=200",
      Height: "=40",
      Fill: "=RGBA(59, 130, 246, 1)",
    });
    children += yamlControl(6, "BtnSecondary", "Button", {
      Text: `="${sanitizeYamlText(secondaryButtonText)}"`,
      X: "=260",
      Y: `=${btnY}`,
      Width: "=200",
      Height: "=40",
      Fill: "=RGBA(241, 245, 249, 1)",
      Color: "=RGBA(71, 85, 105, 1)",
    });
    return yamlControl(
      0,
      "Container_Main",
      "GroupContainer",
      {
        Fill: "=RGBA(255, 255, 255, 1)",
        RadiusTopLeft: "=16",
        RadiusTopRight: "=16",
        RadiusBottomLeft: "=16",
        RadiusBottomRight: "=16",
        DropShadow: "=DropShadow.Light",
        Width: "=500",
        Height: `=${btnY + 80}`,
      },
      children,
      "ManualLayout",
    );
  }

  if (type === "button") {
    const props = {
      Text: `="${sanitizeYamlText(settings.text)}"`,
      Fill: `=${settings.fillColor || "RGBA(59, 130, 246, 1)"}`,
      Color: `=${settings.textColor || "RGBA(255, 255, 255, 1)"}`,
      RadiusTopLeft: `=${settings.radius || 4}`,
      RadiusTopRight: `=${settings.radius || 4}`,
      RadiusBottomLeft: `=${settings.radius || 4}`,
      RadiusBottomRight: `=${settings.radius || 4}`,
      Width: `=${settings.width || 160}`,
      Height: "=40",
    };

    if (settings.borderColor) props.BorderColor = `=${settings.borderColor}`;
    if (settings.borderThickness) props.BorderThickness = `=${settings.borderThickness}`;
    if (settings.dropShadow) props.DropShadow = "=DropShadow.Regular";
    
    // Gradient logic (Power Apps uses Fill for gradients too if specified as linear gradient, 
    // but in standard YAML it's often simpler to just use Fill. 
    // We'll stick to properties for now)

    return yamlControl(0, "CustomButton", "Button", props);
  }

  if (type === "badge") {
    const colors =
      settings.theme === "success"
        ? "RGBA(34, 197, 94, 0.1)"
        : "RGBA(59, 130, 246, 0.1)";
    const textColors =
      settings.theme === "success"
        ? "RGBA(21, 128, 61, 1)"
        : "RGBA(29, 78, 216, 1)";
    const children = yamlControl(6, "BadgeLabel", "Label", {
      Text: `="${sanitizeYamlText(settings.text).toUpperCase()}"`,
      Color: `=${textColors}`,
      FontWeight: "=FontWeight.Bold",
      Size: "=10",
      Align: "=Align.Center",
      Width: "=120",
      Height: "=32",
    });
    return yamlControl(
      0,
      "BadgeContainer",
      "GroupContainer",
      {
        Fill: `=${colors}`,
        RadiusTopLeft: "=4",
        RadiusTopRight: "=4",
        RadiusBottomLeft: "=4",
        RadiusBottomRight: "=4",
        Width: "=120",
        Height: "=32",
      },
      children,
      "ManualLayout",
    );
  }

  if (type === "accordion") {
    let outerChildren = "";
    settings.items.forEach((item, index) => {
      const grandchild = yamlControl(12, `AccLabel_${index}`, "Label", {
        Text: `="${sanitizeYamlText(item.title)}"`,
        X: "=15",
        Width: "=370",
        VerticalAlign: "=VerticalAlign.Middle",
        Height: "=50",
      });
      outerChildren += yamlControl(
        6,
        `AccItem_${index}`,
        "GroupContainer",
        {
          Y: `=${index * 60}`,
          Width: "=400",
          Height: "=50",
          Fill: "=RGBA(248, 250, 252, 1)",
        },
        grandchild,
        "ManualLayout",
      );
    });
    return yamlControl(
      0,
      "Accordion_Main",
      "GroupContainer",
      {
        Width: "=400",
        Height: `=${settings.items.length * 60}`,
      },
      outerChildren,
      "ManualLayout",
    );
  }

  if (type === "shell") {
    const children = yamlControl(6, "AppTitle", "Label", {
      Text: `="${sanitizeYamlText(settings.appName)}"`,
      Color: "=RGBA(255, 255, 255, 1)",
      X: "=20",
      Y: "=20",
      Size: "=20",
      FontWeight: "=FontWeight.Bold",
    });
    return yamlControl(
      0,
      "AppShell",
      "GroupContainer",
      {
        Fill: `=${settings.primaryColor}`,
        Width: "=1366",
        Height: "=80",
      },
      children,
      "ManualLayout",
    );
  }

  if (type === "drawer") {
    const children = yamlControl(6, "DrawerTitle", "Label", {
      Text: `="${sanitizeYamlText(settings.title || "Menu")}"`,
      Color: "=RGBA(255, 255, 255, 1)",
      X: "=20",
      Y: "=20",
      Size: "=18",
      FontWeight: "=FontWeight.Bold",
    });
    return yamlControl(
      0,
      "DrawerContainer",
      "GroupContainer",
      {
        Fill: `=${settings.primaryColor || "RGBA(30, 41, 59, 1)"}`,
        Width: "=300",
        Height: "=768",
      },
      children,
      "ManualLayout",
    );
  }

  if (type === "inputField") {
    return yamlControl(0, "CustomInput", "TextInput", {
      Default: '=""',
      HintText: `="${sanitizeYamlText(settings.placeholder)}"`,
      Width: "=400",
      Height: "=45",
      BorderThickness: "=1",
    });
  }

  if (type === "toggle") {
    return yamlControl(0, "CustomToggle", "Toggle", {
      Default: settings.isOn ? "=true" : "=false",
      OnFill: `=${settings.activeColor || "RGBA(34, 197, 94, 1)"}`,
    });
  }

  if (type === "dropdown" || type === "buttonGroup" || type === "navigation" || type === "sidebar" || type === "tab") {
    const itemsList = (settings.items || []).map(i => `"${sanitizeYamlText(i)}"`).join(", ");
    const isVertical = type === "sidebar";
    return yamlControl(0, `Custom${type.charAt(0).toUpperCase() + type.slice(1)}`, "Gallery", {
      Items: `=[${itemsList}]`,
      Layout: isVertical ? "=Layout.Vertical" : "=Layout.Horizontal",
      Width: isVertical ? `=${settings.width || 240}` : "=1366",
      Height: isVertical ? "=768" : "=60",
    });
  }

  if (type === "card") {
    let children = "";
    children += yamlControl(6, "TitleLabel", "Label", {
      Text: `="${sanitizeYamlText(settings.title)}"`,
      FontWeight: "=FontWeight.Bold",
      X: "=20", Y: "=20",
    });
    children += yamlControl(6, "SubtitleLabel", "Label", {
      Text: `="${sanitizeYamlText(settings.subtitle)}"`,
      Color: "=RGBA(59, 130, 246, 1)",
      X: "=20", Y: "=50",
    });
    return yamlControl(0, "CustomCard", "GroupContainer", {
      Fill: "=RGBA(255, 255, 255, 1)",
      RadiusTopLeft: "=12",
      Width: "=400",
      Height: "=200",
      DropShadow: "=DropShadow.Regular",
    }, children, "ManualLayout");
  }

  return "# Component YAML logic coming soon";
};

// Extremely basic regex parser to extract properties from PowerApps YAML
// so that the Preview and Settings panels can display components loaded from the database.
export const parsePowerAppsYAMLToSettings = (yaml, defaultType = "button", name = "Component") => {
  const settings = { type: defaultType, name };

  if (!yaml || typeof yaml !== "string") return settings;

  if (defaultType === "button") {
    const textMatch = yaml.match(/Text:\s*="([^"]+)"/);
    settings.text = textMatch ? textMatch[1] : name;

    const fillMatch = yaml.match(/Fill:\s*([^\n]+)/);
    if (fillMatch) settings.fillColor = fillMatch[1].trim().replace(/^['"]|['"]$/g, "").replace(/^=/, "");

    const colorMatch = yaml.match(/Color:\s*([^\n]+)/);
    if (colorMatch) settings.textColor = colorMatch[1].trim().replace(/^['"]|['"]$/g, "").replace(/^=/, "");

    const radiusMatch = yaml.match(/RadiusTopLeft:\s*([^\n]+)/);
    if (radiusMatch) settings.radius = parseInt(radiusMatch[1].trim().replace(/^['"]|['"]$/g, "").replace(/^=/, ""), 10);

    const widthMatch = yaml.match(/Width:\s*([^\n]+)/);
    if (widthMatch) settings.width = parseInt(widthMatch[1].trim().replace(/^['"]|['"]$/g, "").replace(/^=/, ""), 10);

    const borderMatch = yaml.match(/BorderColor:\s*([^\n]+)/);
    if (borderMatch) settings.borderColor = borderMatch[1].trim().replace(/^['"]|['"]$/g, "").replace(/^=/, "");

    const borderThickMatch = yaml.match(/BorderThickness:\s*([^\n]+)/);
    if (borderThickMatch) settings.borderThickness = parseInt(borderThickMatch[1].trim().replace(/^['"]|['"]$/g, "").replace(/^=/, ""), 10);

    if (yaml.includes("DropShadow")) {
      settings.dropShadow = true;
    }
  }

  if (defaultType === "badge") {
    const textMatch = yaml.match(/Text:\s*="([^"]+)"/);
    settings.text = textMatch ? textMatch[1] : name;

    const fillMatch = yaml.match(/Fill:\s*=([^\n]+)/);
    if (fillMatch && fillMatch[1].includes("197, 94")) {
      settings.theme = "success";
    } else if (fillMatch && fillMatch[1].includes("59, 130, 246")) {
      settings.theme = "info";
    } else {
      settings.theme = "success";
    }
  }

  if (defaultType === "shell") {
    const textMatch = yaml.match(/Text:\s*="([^"]+)"/);
    settings.appName = textMatch ? textMatch[1] : name;

    const fillMatch = yaml.match(/Fill:\s*([^\n]+)/);
    if (fillMatch) settings.primaryColor = fillMatch[1].trim().replace(/^['"]|['"]$/g, "").replace(/^=/, "");
    settings.showSidebar = true;
  }

  if (defaultType === "drawer") {
    const textMatch = yaml.match(/Text:\s*="([^"]+)"/);
    settings.title = textMatch ? textMatch[1] : name;

    const fillMatch = yaml.match(/Fill:\s*([^\n]+)/);
    if (fillMatch) settings.primaryColor = fillMatch[1].trim().replace(/^['"]|['"]$/g, "").replace(/^=/, "");
    settings.items = [{ id: "1", title: "Home" }, { id: "2", title: "Profile" }];
  }
  
  if (defaultType === "form") {
    const titleMatch = yaml.match(/Text:\s*="([^"]+)"/); // First text usually title
    settings.title = titleMatch ? titleMatch[1] : name;
    settings.subtitle = "Description";
    settings.primaryButtonText = "Submit";
    settings.secondaryButtonText = "Cancel";
    settings.fields = []; // Hard to parse fields from YAML simply
  }

  if (defaultType === "accordion") {
     settings.items = [{ id: "1", title: name, content: "Details" }];
  }

  if (defaultType === "inputField") {
    const hintMatch = yaml.match(/HintText:\s*="([^"]+)"/);
    settings.placeholder = hintMatch ? hintMatch[1] : "Enter value...";
    settings.label = name;
  }

  if (defaultType === "toggle") {
    settings.isOn = yaml.includes("Default: =true");
    const colorMatch = yaml.match(/OnFill:\s*([^\n]+)/);
    if (colorMatch) settings.activeColor = colorMatch[1].trim().replace(/^['"]|['"]$/g, "").replace(/^=/, "");
    settings.label = name;
  }

  if (defaultType === "dropdown" || defaultType === "buttonGroup" || defaultType === "navigation" || defaultType === "sidebar" || defaultType === "tab") {
    const itemsMatch = yaml.match(/Items:\s*=\[([^\]]+)\]/);
    if (itemsMatch) {
      settings.items = itemsMatch[1].split(",").map(i => i.trim().replace(/^"|"$/g, ""));
    }
    if (defaultType === "sidebar") {
      const widthMatch = yaml.match(/Width:\s*=?([0-9]+)/);
      if (widthMatch) settings.width = parseInt(widthMatch[1], 10);
    }
    settings.label = name;
  }

  if (defaultType === "card") {
    const titleMatch = yaml.match(/Text:\s*="([^"]+)"/);
    settings.title = titleMatch ? titleMatch[1] : name;
    settings.subtitle = "Subtitle";
    settings.body = "Body content text.";
  }

  return settings;
};