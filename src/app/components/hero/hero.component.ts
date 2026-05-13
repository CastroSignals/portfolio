import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  private readonly i18n = inject(LanguageService);
  readonly t = this.i18n.t.bind(this.i18n);
  readonly techStack: readonly string[] = [
    'Angular',
    'TypeScript',
    'RxJS',
    'NgRx',
    'Java',
    'Python',
    'D3.js'
  ];
}
