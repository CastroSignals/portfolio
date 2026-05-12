import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
  });

  it('renders the 404 error label', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('404');
  });

  it('renders the page title as an h1', () => {
    const h1 = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(h1?.textContent).toMatch(/page.*not.*found/i);
  });

  it('renders a link back to /', () => {
    const root = fixture.nativeElement as HTMLElement;
    const homeLink = Array.from(root.querySelectorAll<HTMLAnchorElement>('a')).find(
      (a) => a.getAttribute('href') === '/'
    );
    expect(homeLink).toBeTruthy();
  });

  it('renders a link to /projects', () => {
    const root = fixture.nativeElement as HTMLElement;
    const projectsLink = Array.from(root.querySelectorAll<HTMLAnchorElement>('a')).find(
      (a) => a.getAttribute('href') === '/projects'
    );
    expect(projectsLink).toBeTruthy();
  });

  it('wraps the page in a <main> landmark', () => {
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('main')).toBeTruthy();
  });
});
