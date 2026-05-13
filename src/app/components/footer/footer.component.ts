import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private readonly i18n = inject(LanguageService);
  readonly t = this.i18n.t.bind(this.i18n);
  readonly currentYear = new Date().getFullYear();
}
