import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
  inject,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projects-preview.component.html',
  styleUrl: './projects-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  private readonly projectService = inject(ProjectService);
  private readonly ngZone = inject(NgZone);

  readonly projects = this.projectService.projects;

  private observer: IntersectionObserver | null = null;
  private tiltCleanupFns: (() => void)[] = [];

  ngAfterViewInit() {
    this.initScrollReveal();
    this.initTiltEffect();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.tiltCleanupFns.forEach(fn => fn());
    this.tiltCleanupFns = [];
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

    // Use ViewChildren to find reveal elements within the component host
    const hostEl = this.projectCards.first?.nativeElement?.closest('.projects-preview');
    if (hostEl) {
      hostEl.querySelectorAll('.reveal').forEach((el: Element) => this.observer!.observe(el));
    }
  }

  private initTiltEffect() {
    this.ngZone.runOutsideAngular(() => {
      this.projectCards.forEach(cardRef => {
        const card = cardRef.nativeElement;

        const onMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        };

        const onMouseLeave = () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        };

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);

        this.tiltCleanupFns.push(() => {
          card.removeEventListener('mousemove', onMouseMove);
          card.removeEventListener('mouseleave', onMouseLeave);
        });
      });
    });
  }
}
