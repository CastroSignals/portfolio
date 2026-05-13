import { Component, HostListener, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LanguageService } from '../../i18n/language.service';

interface NavLink {
  path: string;
  labelKey: string;
  exact: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly i18n = inject(LanguageService);
  readonly t = this.i18n.t.bind(this.i18n);
  readonly language = this.i18n.language;

  readonly isScrolled = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly isDarkTheme = signal(true);

  readonly navLinks: readonly NavLink[] = [
    { path: '/', labelKey: 'nav.links.home', exact: true },
    { path: '/projects', labelKey: 'nav.links.projects', exact: false }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  toggleTheme() {
    this.isDarkTheme.update((dark) => !dark);
    const theme = this.isDarkTheme() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleLanguage() {
    this.i18n.toggleLanguage();
  }
}
