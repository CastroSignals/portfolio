import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  it('wraps content in a main landmark', () => {
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('main')).toBeTruthy();
  });

  it('renders the hero section', () => {
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('app-hero')).toBeTruthy();
  });

  it('renders the projects-preview section', () => {
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('app-projects-preview')).toBeTruthy();
  });
});
