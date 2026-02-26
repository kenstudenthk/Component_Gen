import { describe, it, expect } from 'vitest';
import {
  CATEGORY_SLUGS,
  SLUG_TO_TYPE,
  TYPE_DEFAULTS,
  defaultSettings,
  slugLabel,
} from '../lib/categoryMappings';

describe('CATEGORY_SLUGS', () => {
  it('contains exactly 20 slugs', () => {
    expect(CATEGORY_SLUGS).toHaveLength(20);
  });

  it('has no duplicates', () => {
    expect(new Set(CATEGORY_SLUGS).size).toBe(CATEGORY_SLUGS.length);
  });
});

describe('SLUG_TO_TYPE', () => {
  it('maps every slug in CATEGORY_SLUGS', () => {
    for (const slug of CATEGORY_SLUGS) {
      expect(SLUG_TO_TYPE[slug], `missing mapping for slug "${slug}"`).toBeDefined();
    }
  });

  it('maps known slugs to expected types', () => {
    expect(SLUG_TO_TYPE['buttons']).toBe('button');
    expect(SLUG_TO_TYPE['app-shells']).toBe('shell');
    expect(SLUG_TO_TYPE['button-group']).toBe('buttonGroup');
    expect(SLUG_TO_TYPE['input-fields']).toBe('inputField');
    expect(SLUG_TO_TYPE['speed-dial']).toBe('speedDial');
  });
});

describe('TYPE_DEFAULTS', () => {
  it('has a default template name for every type in SLUG_TO_TYPE', () => {
    const types = new Set(Object.values(SLUG_TO_TYPE));
    for (const type of types) {
      expect(TYPE_DEFAULTS[type], `missing TYPE_DEFAULTS for type "${type}"`).toBeDefined();
    }
  });
});

describe('defaultSettings()', () => {
  it('returns a settings object with a type property', () => {
    const settings = defaultSettings('buttons');
    expect(settings).toHaveProperty('type');
  });

  it('returns button type for "buttons" slug', () => {
    const settings = defaultSettings('buttons');
    expect(settings.type).toBe('button');
  });

  it('returns shell type for "app-shells" slug', () => {
    const settings = defaultSettings('app-shells');
    expect(settings.type).toBe('shell');
  });

  it('falls back to button type for unknown slug', () => {
    const settings = defaultSettings('unknown-slug');
    expect(settings.type).toBe('button');
  });

  it('returns settings for every known slug without throwing', () => {
    for (const slug of CATEGORY_SLUGS) {
      expect(() => defaultSettings(slug)).not.toThrow();
      expect(defaultSettings(slug)).toHaveProperty('type');
    }
  });
});

describe('slugLabel()', () => {
  it('capitalizes single word slugs', () => {
    expect(slugLabel('buttons')).toBe('Buttons');
  });

  it('capitalizes and joins hyphenated slugs', () => {
    expect(slugLabel('app-shells')).toBe('App Shells');
    expect(slugLabel('button-group')).toBe('Button Group');
    expect(slugLabel('input-fields')).toBe('Input Fields');
    expect(slugLabel('speed-dial')).toBe('Speed Dial');
  });

  it('handles all known category slugs without throwing', () => {
    for (const slug of CATEGORY_SLUGS) {
      expect(() => slugLabel(slug)).not.toThrow();
      expect(slugLabel(slug).length).toBeGreaterThan(0);
    }
  });
});
