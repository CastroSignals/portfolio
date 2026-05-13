import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { ProjectsComponent } from './projects.component';
import { LanguageService } from '../../i18n/language.service';

describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  let component: ProjectsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    TestBed.inject(LanguageService).setLanguage('en');

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exposes timeline and detailed projects from ProjectService', () => {
    expect(component.timeline().length).toBeGreaterThan(0);
    expect(component.detailedProjects().length).toBeGreaterThan(0);
  });

  it('starts with no project expanded', () => {
    expect(component.expandedProject()).toBeNull();
  });

  it('toggleProject sets the expanded id on first call', () => {
    component.toggleProject(1);
    expect(component.expandedProject()).toBe(1);
  });

  it('toggleProject clears the expanded id when called again with the same id', () => {
    component.toggleProject(1);
    component.toggleProject(1);
    expect(component.expandedProject()).toBeNull();
  });

  it('toggleProject switches to a different id', () => {
    component.toggleProject(1);
    component.toggleProject(2);
    expect(component.expandedProject()).toBe(2);
  });

  it.each([
    ['work', 'Work'],
    ['project', 'Project'],
    ['education', 'Education']
  ] as const)('getTypeLabel returns "%s" → "%s" in English', (type, expected) => {
    expect(component.getTypeLabel(type)).toBe(expected);
  });

  it('getTypeLabel returns an empty string for an unknown type', () => {
    expect(component.getTypeLabel('unknown')).toBe('');
  });

  it('getTypeIcon delegates to ProjectService and returns a path for "work"', () => {
    expect(component.getTypeIcon('work')).toBeTruthy();
  });

  it('renders the page heading from i18n', () => {
    const root = fixture.nativeElement as HTMLElement;
    const h1 = root.querySelector('h1');
    expect(h1?.textContent).toContain('Journey');
  });
});
