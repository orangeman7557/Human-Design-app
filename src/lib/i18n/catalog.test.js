// Catalog parity (Phase M). Guards the thing that silently rots when a
// language is added or a key renamed: a string that exists in one language and
// not in another. The UI catalogs must have identical shapes; the content packs
// must resolve every key the Spanish base defines (the deep merge guarantees
// this, so a failure here means the merge itself broke).

import { describe, it, expect } from 'vitest';
import uiEs from './ui/es.js';
import uiEn from './ui/en.js';
import contentEs from '../hd/content/es.js';
import contentEn from '../hd/content/en.js';
import { LOCALES, LOCALE_CODES, DEFAULT_LOCALE, isLocale, negotiateLocale } from './locales.js';

/** Every leaf path in an object (strings and array items). */
function leafPaths(obj, prefix = '', acc = []) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') acc.push(path);
    else if (Array.isArray(value)) value.forEach((_, i) => acc.push(`${path}[${i}]`));
    else if (value && typeof value === 'object') leafPaths(value, path, acc);
  }
  return acc;
}

describe('i18n catalogs', () => {
  it('UI catalogs have the same keys in every language', () => {
    const es = leafPaths(uiEs);
    const en = new Set(leafPaths(uiEn));
    expect(es.filter((k) => !en.has(k))).toEqual([]);
    const esSet = new Set(es);
    expect(leafPaths(uiEn).filter((k) => !esSet.has(k))).toEqual([]);
  });

  it('content packs resolve every key of the Spanish base', () => {
    const es = leafPaths(contentEs);
    const en = new Set(leafPaths(contentEn));
    expect(es.filter((k) => !en.has(k))).toEqual([]);
  });

  it('the English content is actually translated, not a Spanish fallback', () => {
    // Identical leaves are legitimate only for words that are the same in both
    // languages (proper nouns, cognates) and for language-neutral values.
    const same = leafPaths(contentEs).filter((path) => {
      const read = (o) => path.split(/\.|\[/).reduce((v, k) => v?.[k.replace(']', '')], o);
      return read(contentEs) === read(contentEn);
    });
    // Guard the ratio rather than an exact list, so wording tweaks don't break
    // the build but a wholesale fallback (a broken merge) does.
    expect(same.length / leafPaths(contentEs).length).toBeLessThan(0.1);
  });
});

describe('locale registry', () => {
  it('every locale has the fields the app derives from', () => {
    for (const l of LOCALES) {
      expect(l.code).toBeTruthy();
      expect(l.label).toBeTruthy();
      expect(l.htmlLang).toBeTruthy();
      expect(l.ogLocale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
    }
    expect(LOCALE_CODES).toContain(DEFAULT_LOCALE);
    expect(isLocale('zz')).toBe(false);
  });

  it('negotiates the root redirect from cookie, then Accept-Language', () => {
    expect(negotiateLocale('es', 'en-GB,en;q=0.9')).toBe('es'); // cookie wins
    expect(negotiateLocale(null, 'es-ES,es;q=0.9')).toBe('es');
    expect(negotiateLocale(null, 'en-US,en;q=0.9')).toBe('en');
    expect(negotiateLocale(null, 'fr-FR,fr;q=0.9')).toBe(DEFAULT_LOCALE); // unknown → default
    expect(negotiateLocale(null, null)).toBe(DEFAULT_LOCALE);
    expect(negotiateLocale('zz', 'es')).toBe('es'); // invalid cookie ignored
  });
});
