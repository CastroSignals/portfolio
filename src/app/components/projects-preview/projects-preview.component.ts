import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../i18n/language.service';
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
  private readonly i18n = inject(LanguageService);

  readonly t = this.i18n.t.bind(this.i18n);
  readonly projects = this.projectService.projects;
}
