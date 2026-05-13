import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
  });

  it('defaults to a supported language', () => {
    const svc = TestBed.runInInjectionContext(() => TestBed.inject(LanguageService));
    expect(['en', 'es']).toContain(svc.language());
  });

  it('returns the key when the lookup misses', () => {
    const svc = TestBed.runInInjectionContext(() => TestBed.inject(LanguageService));
    expect(svc.t('this.key.does.not.exist')).toBe('this.key.does.not.exist');
  });

  it('looks up a flat dotted key', () => {
    const svc = TestBed.runInInjectionContext(() => TestBed.inject(LanguageService));
    svc.setLanguage('en');
    expect(svc.t('hero.tagline')).toContain('dashboards');
  });

  it('interpolates {name} placeholders', () => {
    const svc = TestBed.runInInjectionContext(() => TestBed.inject(LanguageService));
    svc.setLanguage('en');
    expect(svc.t('footer.copyright', { year: 2026 })).toBe('© 2026 Gabriel Castro');
  });

  it('toggleLanguage swaps en <-> es', () => {
    const svc = TestBed.runInInjectionContext(() => TestBed.inject(LanguageService));
    svc.setLanguage('en');
    svc.toggleLanguage();
    expect(svc.language()).toBe('es');
    svc.toggleLanguage();
    expect(svc.language()).toBe('en');
  });

  it('setLanguage persists to localStorage', () => {
    const svc = TestBed.runInInjectionContext(() => TestBed.inject(LanguageService));
    svc.setLanguage('es');
    expect(window.localStorage.getItem('app-language')).toBe('es');
  });

  it('writes lang attribute on <html>', () => {
    const svc = TestBed.runInInjectionContext(() => TestBed.inject(LanguageService));
    svc.setLanguage('es');
    expect(document.documentElement.getAttribute('lang')).toBe('es');
    svc.setLanguage('en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  it('English and Spanish tagline differ', () => {
    const svc = TestBed.runInInjectionContext(() => TestBed.inject(LanguageService));
    svc.setLanguage('en');
    const en = svc.t('hero.tagline');
    svc.setLanguage('es');
    const es = svc.t('hero.tagline');
    expect(en).not.toBe(es);
    expect(es.length).toBeGreaterThan(0);
  });
});
