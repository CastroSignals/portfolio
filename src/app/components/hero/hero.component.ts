import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  readonly name = 'Gabriel Castro';
  readonly tagline = 'I build the dashboards airlines run their revenue on.';
}
