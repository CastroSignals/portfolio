import { Component, HostListener, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  readonly isScrolled = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly isDarkTheme = signal(true);

  readonly navLinks = [
    { path: '/', label: 'Home', exact: true },
    { path: '/projects', label: 'Projects', exact: false }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  toggleTheme() {
    this.isDarkTheme.update(dark => !dark);
    const theme = this.isDarkTheme() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
}
