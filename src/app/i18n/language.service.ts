import { Injectable, computed, signal } from '@angular/core';

import en from './en.json';
import es from './es.json';

export type Language = 'en' | 'es';

type TranslationDict = Record<string, unknown>;

const DICTIONARIES: Record<Language, TranslationDict> = {
  en: en as TranslationDict,
  es: es as TranslationDict
};

const STORAGE_KEY = 'app-language';
const SUPPORTED: readonly Language[] = ['en', 'es'] as const;
const DEFAULT_LANGUAGE: Language = 'en';

function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (SUPPORTED as readonly string[]).includes(stored)) {
      return stored as Language;
    }
  } catch {
    // localStorage unavailable — fall through to navigator detection.
  }

  const navLang = window.navigator?.language?.slice(0, 2).toLowerCase();
  if (navLang && (SUPPORTED as readonly string[]).includes(navLang)) {
    return navLang as Language;
  }

  return DEFAULT_LANGUAGE;
}

function lookup(dict: TranslationDict, key: string): unknown {
  const parts = key.split('.');
  let cursor: unknown = dict;
  for (const part of parts) {
    if (cursor && typeof cursor === 'object' && part in (cursor as Record<string, unknown>)) {
      cursor = (cursor as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return cursor;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_match, name: string) =>
    name in params ? String(params[name]) : `{${name}}`
  );
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _language = signal<Language>(detectInitialLanguage());

  readonly language = this._language.asReadonly();
  readonly translations = computed(() => DICTIONARIES[this._language()]);

  constructor() {
    this.applyToDocument(this._language());
  }

  t(key: string, params?: Record<string, string | number>): string {
    const value = lookup(this.translations(), key);
    if (typeof value !== 'string') {
      return key;
    }
    return interpolate(value, params);
  }

  tList(key: string): string[] {
    const value = lookup(this.translations(), key);
    if (!Array.isArray(value)) return [];
    return value.filter((v): v is string => typeof v === 'string');
  }

  setLanguage(lang: Language): void {
    if (!SUPPORTED.includes(lang)) return;
    if (this._language() === lang) return;
    this._language.set(lang);
    this.persist(lang);
    this.applyToDocument(lang);
  }

  toggleLanguage(): void {
    this.setLanguage(this._language() === 'en' ? 'es' : 'en');
  }

  private persist(lang: Language): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Silent: persistence is best-effort.
    }
  }

  private applyToDocument(lang: Language): void {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('lang', lang);
  }
}
