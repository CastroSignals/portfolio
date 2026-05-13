import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { NavbarComponent } from './navbar.component';
import { LanguageService } from '../../i18n/language.service';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let lang: LanguageService;

  beforeEach(async () => {
    window.localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    lang = TestBed.inject(LanguageService);
    lang.setLanguage('en');

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('lang');
    window.localStorage.clear();
  });

  it('exposes Home and Projects nav link keys', () => {
    const keys = component.navLinks.map((l) => l.labelKey);
    expect(keys).toEqual(['nav.links.home', 'nav.links.projects']);
  });

  it('renders the resolved nav link labels in English', () => {
    const root = fixture.nativeElement as HTMLElement;
    const labels = Array.from(root.querySelectorAll('.navbar__link')).map(
      (n) => n.textContent?.trim() ?? ''
    );
    expect(labels).toContain('Home');
    expect(labels).toContain('Projects');
  });

  it('initial isScrolled is false', () => {
    expect(component.isScrolled()).toBe(false);
  });

  it('onScroll sets isScrolled when window.scrollY exceeds 50', () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 100 });
    component.onScroll();
    expect(component.isScrolled()).toBe(true);
  });

  it('onScroll keeps isScrolled false when window.scrollY is below the threshold', () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 10 });
    component.onScroll();
    expect(component.isScrolled()).toBe(false);
  });

  it('toggleMobileMenu flips isMobileMenuOpen', () => {
    expect(component.isMobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('closeMobileMenu sets isMobileMenuOpen to false', () => {
    component.toggleMobileMenu();
    component.closeMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('toggleTheme flips isDarkTheme and writes data-theme on the document root', () => {
    expect(component.isDarkTheme()).toBe(true);

    component.toggleTheme();
    expect(component.isDarkTheme()).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    component.toggleTheme();
    expect(component.isDarkTheme()).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggleLanguage swaps the active language via the service', () => {
    expect(component.language()).toBe('en');
    component.toggleLanguage();
    expect(component.language()).toBe('es');
    component.toggleLanguage();
    expect(component.language()).toBe('en');
  });
});
