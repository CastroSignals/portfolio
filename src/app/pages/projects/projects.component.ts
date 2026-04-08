import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private readonly projectService = inject(ProjectService);

  readonly scrollY = signal(0);
  readonly expandedProject = signal<number | null>(null);

  readonly timeline = this.projectService.timeline;
  readonly detailedProjects = this.projectService.detailedProjects;

  private observer: IntersectionObserver | null = null;
  private revealTimeoutId: ReturnType<typeof setTimeout> | null = null;

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY.set(window.scrollY);
  }

  ngAfterViewInit() {
    this.initScrollReveal();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.revealTimeoutId !== null) {
      clearTimeout(this.revealTimeoutId);
      this.revealTimeoutId = null;
    }
  }

  private initScrollReveal() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const obs = this.observer;
    this.revealTimeoutId = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }, 100);
  }

  toggleProject(id: number) {
    this.expandedProject.update(current => current === id ? null : id);
  }

  getTypeIcon(type: string): string {
    return this.projectService.getTypeIcon(type);
  }
}
