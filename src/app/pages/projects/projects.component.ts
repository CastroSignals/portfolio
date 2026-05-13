import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../i18n/language.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);
  private readonly i18n = inject(LanguageService);

  readonly t = this.i18n.t.bind(this.i18n);

  readonly expandedProject = signal<number | null>(null);

  readonly timeline = this.projectService.timeline;
  readonly detailedProjects = this.projectService.detailedProjects;

  toggleProject(id: number) {
    this.expandedProject.update((current) => (current === id ? null : id));
  }

  getTypeIcon(type: string): string {
    return this.projectService.getTypeIcon(type);
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'work':
        return this.t('projectsPage.timeline.type.work');
      case 'project':
        return this.t('projectsPage.timeline.type.project');
      case 'education':
        return this.t('projectsPage.timeline.type.education');
      default:
        return '';
    }
  }
}
