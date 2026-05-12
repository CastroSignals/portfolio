import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { ProjectsPreviewComponent } from './projects-preview.component';

describe('ProjectsPreviewComponent', () => {
  let fixture: ComponentFixture<ProjectsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPreviewComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsPreviewComponent);
    fixture.detectChanges();
  });

  it('exposes a non-empty projects list', () => {
    expect(fixture.componentInstance.projects.length).toBeGreaterThan(0);
  });

  it('renders the first project title in the template', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    const firstTitle = fixture.componentInstance.projects[0].title;
    expect(text).toContain(firstTitle);
  });

  it('survives ngAfterViewInit with the IntersectionObserver stub', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
