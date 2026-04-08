import {
  Component,
  inject,
  ChangeDetectionStrategy
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
export class ProjectsPreviewComponent {
  private readonly projectService = inject(ProjectService);
  readonly projects = this.projectService.projects;
}
