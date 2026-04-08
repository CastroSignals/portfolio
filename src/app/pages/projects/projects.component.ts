import {
  Component,
  signal,
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
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);

  readonly expandedProject = signal<number | null>(null);

  readonly timeline = this.projectService.timeline;
  readonly detailedProjects = this.projectService.detailedProjects;

  toggleProject(id: number) {
    this.expandedProject.update(current => current === id ? null : id);
  }

  getTypeIcon(type: string): string {
    return this.projectService.getTypeIcon(type);
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'work': return 'Work';
      case 'project': return 'Project';
      case 'education': return 'Education';
      default: return '';
    }
  }
}
