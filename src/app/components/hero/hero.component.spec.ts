import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HeroComponent } from './hero.component';
import { LanguageService } from '../../i18n/language.service';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent]
    }).compileComponents();

    TestBed.inject(LanguageService).setLanguage('en');

    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('renders the user name parts in the template', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Gabriel');
    expect(text).toContain('Castro');
  });

  it('renders the tagline in the template', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('dashboards');
  });

  it('renders the tech stack badges', () => {
    const root = fixture.nativeElement as HTMLElement;
    const badges = Array.from(root.querySelectorAll('.hero__tech-badge')).map(
      (n) => n.textContent?.trim() ?? ''
    );
    expect(badges).toContain('Angular');
    expect(badges).toContain('TypeScript');
  });

  it('renders both call-to-action buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const buttons = root.querySelectorAll('.hero__btn');
    expect(buttons.length).toBe(2);
  });
});
