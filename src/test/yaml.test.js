import { describe, it, expect } from "vitest";
import {
  sanitizeYamlText,
  yamlSafeValue,
  yamlControl,
  generatePowerAppsYAML,
} from "../lib/yaml";

describe("sanitizeYamlText()", () => {
  it("removes # characters", () => {
    expect(sanitizeYamlText("Hello # world")).toBe("Hello  world");
  });

  it("replaces : with -", () => {
    expect(sanitizeYamlText("key: value")).toBe("key- value");
  });

  it("handles both # and : in same string", () => {
    expect(sanitizeYamlText("a: b #c")).toBe("a- b c");
  });

  it("coerces non-string to string", () => {
    expect(sanitizeYamlText(42)).toBe("42");
    expect(sanitizeYamlText(null)).toBe("null");
  });

  it("returns clean strings unchanged", () => {
    expect(sanitizeYamlText("Hello World")).toBe("Hello World");
  });
});

describe("yamlSafeValue()", () => {
  it('wraps values containing ": " in single quotes', () => {
    const result = yamlSafeValue("key: value");
    expect(result).toBe("'key: value'");
  });

  it('wraps values containing " #" in single quotes', () => {
    const result = yamlSafeValue("hello #world");
    expect(result).toBe("'hello #world'");
  });

  it("wraps values starting with [ in single quotes", () => {
    const result = yamlSafeValue("[item]");
    expect(result).toBe("'[item]'");
  });

  it("returns plain strings as-is", () => {
    expect(yamlSafeValue("hello")).toBe("hello");
    expect(yamlSafeValue("=RGBA(59,130,246,1)")).toBe("=RGBA(59,130,246,1)");
  });

  it("passes through non-string values unchanged", () => {
    expect(yamlSafeValue(42)).toBe(42);
    expect(yamlSafeValue(true)).toBe(true);
  });

  it("escapes single quotes inside wrapped values", () => {
    const result = yamlSafeValue("it's a: test");
    expect(result).toBe("'it''s a: test'");
  });
});

describe("yamlControl()", () => {
  it("produces a valid control block", () => {
    const output = yamlControl(0, "MyButton", "Button", { Text: '="Click"' });
    expect(output).toContain("- MyButton:");
    expect(output).toContain("Control: Button");
    expect(output).toContain('Text: ="Click"');
  });

  it("includes variant when provided", () => {
    const output = yamlControl(
      0,
      "Container",
      "GroupContainer",
      {},
      "",
      "ManualLayout",
    );
    expect(output).toContain("Variant: ManualLayout");
  });

  it("omits Properties block when no properties given", () => {
    const output = yamlControl(0, "Box", "Rectangle", {});
    expect(output).not.toContain("Properties:");
  });

  it("includes Children block when childrenYaml provided", () => {
    const output = yamlControl(
      0,
      "Parent",
      "GroupContainer",
      {},
      "  - Child:\n",
    );
    expect(output).toContain("Children:");
    expect(output).toContain("- Child:");
  });

  it("applies correct indentation", () => {
    const output = yamlControl(4, "Indented", "Label", { Text: '="hi"' });
    expect(output).toMatch(/^ {4}- Indented:/);
  });
});

describe("generatePowerAppsYAML()", () => {
  it("generates YAML for a button", () => {
    const settings = {
      type: "button",
      text: "Click Me",
      fillColor: "=RGBA(59, 130, 246, 1)",
      textColor: "=RGBA(255, 255, 255, 1)",
      radius: 4,
      width: 160,
    };
    const yaml = generatePowerAppsYAML("My Button", settings);
    expect(yaml).toContain("Control: Button");
    expect(yaml).toContain("Click Me");
  });

  it("generates YAML for a badge", () => {
    const settings = { type: "badge", text: "New", theme: "success" };
    const yaml = generatePowerAppsYAML("Badge", settings);
    expect(yaml).toContain("Control:");
    // Badge YAML uppercases the text label
    expect(yaml).toContain("NEW");
  });

  it("generates YAML for a form", () => {
    const settings = {
      type: "form",
      title: "Contact Us",
      subtitle: "Fill in the form",
      fields: [{ label: "Name", placeholder: "Your name", type: "text" }],
      primaryButtonText: "Submit",
      secondaryButtonText: "Cancel",
    };
    const yaml = generatePowerAppsYAML("Contact Form", settings);
    expect(yaml).toContain("Contact Us");
    expect(yaml).toContain("Submit");
    expect(yaml).toContain("Name");
  });

  it("sanitizes special characters in user text", () => {
    const settings = {
      type: "button",
      text: "Save: Draft #1",
      fillColor: "=RGBA(0,0,0,1)",
      textColor: "=RGBA(255,255,255,1)",
      radius: 4,
      width: 120,
    };
    const yaml = generatePowerAppsYAML("Button", settings);
    expect(yaml).not.toContain("#1");
    expect(yaml).toContain("Save- Draft 1");
  });

  it("generates YAML for accordion", () => {
    const settings = {
      type: "accordion",
      items: [
        { id: "1", title: "Section 1", content: "Details here" },
        { id: "2", title: "Section 2", content: "More details" },
      ],
    };
    const yaml = generatePowerAppsYAML("Accordion", settings);
    expect(yaml).toContain("Section 1");
    expect(yaml).toContain("Section 2");
  });

  it("generates YAML for toggle", () => {
    const settings = { type: "toggle", checked: false, label: "Enable" };
    const yaml = generatePowerAppsYAML("Toggle", settings);
    expect(yaml).toContain("Control:");
  });

  it("returns a non-empty string for all known types", () => {
    const typeExamples = {
      button: {
        type: "button",
        text: "OK",
        fillColor: "=RGBA(0,0,0,1)",
        textColor: "=RGBA(255,255,255,1)",
        radius: 4,
        width: 120,
      },
      badge: { type: "badge", text: "Tag", theme: "info" },
      accordion: {
        type: "accordion",
        items: [{ id: "1", title: "T", content: "C" }],
      },
      toggle: { type: "toggle", checked: false, label: "On" },
      dropdown: { type: "dropdown", label: "Pick", options: ["A", "B"] },
      inputField: {
        type: "inputField",
        label: "Name",
        placeholder: "Enter name",
      },
      modal: { type: "modal", title: "Alert", body: "Are you sure?" },
    };
    for (const [typeName, settings] of Object.entries(typeExamples)) {
      const yaml = generatePowerAppsYAML(typeName, settings);
      expect(yaml, `empty YAML for type "${typeName}"`).toBeTruthy();
      expect(typeof yaml).toBe("string");
    }
  });
});
