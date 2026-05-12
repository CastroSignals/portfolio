import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('exposes Home and Projects nav links', () => {
    const labels = component.navLinks.map((l) => l.label);
    expect(labels).toEqual(['Home', 'Projects']);
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
});
