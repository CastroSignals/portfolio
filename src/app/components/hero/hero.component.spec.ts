import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('exposes the user name', () => {
    expect(fixture.componentInstance.name).toBe('Gabriel Castro');
  });

  it('exposes a non-empty tagline', () => {
    expect(fixture.componentInstance.tagline.length).toBeGreaterThan(0);
  });

  it('renders the name in the template', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Gabriel Castro');
  });

  it('renders the tagline in the template', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain(fixture.componentInstance.tagline);
  });
});
