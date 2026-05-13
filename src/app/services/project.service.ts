import { Injectable, computed, inject } from '@angular/core';

import { LanguageService } from '../i18n/language.service';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
}

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  type: 'work' | 'project' | 'education';
}

export interface DetailedProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  color: string;
  year: string;
}

// Structural data — language-neutral. Localized strings live in i18n JSON,
// aligned with these arrays by index.

interface ProjectMeta {
  id: number;
  image: string;
  tags: string[];
  color: string;
}

interface TimelineMeta {
  id: number;
  year: string;
  technologies: string[];
  type: TimelineItem['type'];
}

interface DetailedMeta {
  id: number;
  image: string;
  technologies: string[];
  color: string;
  year: string;
}

const PROJECT_META: readonly ProjectMeta[] = [
  { id: 1, image: '', tags: ['Angular', 'NgRx', 'D3.js', 'Java', 'Oracle'], color: '#06b6d4' },
  {
    id: 2,
    image: '',
    tags: ['Angular', 'Web Components', 'TypeScript', 'Azure DevOps'],
    color: '#7c3aed'
  },
  { id: 3, image: '', tags: ['Python', 'React', 'D3.js', 'Fourier analysis'], color: '#ec4899' },
  { id: 4, image: '', tags: ['React', 'D3.js', 'Node.js', 'OBD'], color: '#10b981' }
];

const TIMELINE_META: readonly TimelineMeta[] = [
  {
    id: 1,
    year: '2024',
    technologies: [
      'Angular',
      'Web Components',
      'TypeScript',
      'Node.js',
      'Azure DevOps',
      'SonarQube'
    ],
    type: 'work'
  },
  {
    id: 2,
    year: '2021',
    technologies: [
      'Angular',
      'NgRx',
      'RxJS',
      'D3.js',
      'Java',
      'C++',
      'Python',
      'Oracle',
      'MongoDB'
    ],
    type: 'work'
  },
  { id: 3, year: '2020', technologies: ['Django', 'Python', 'MySQL', 'HTML', 'CSS'], type: 'work' },
  {
    id: 4,
    year: '2020',
    technologies: ['Software Architecture', 'Distributed Systems', 'Research'],
    type: 'education'
  },
  {
    id: 5,
    year: '2019',
    technologies: ['Python', 'React', 'D3.js', 'Node.js', 'Scikit-learn'],
    type: 'education'
  },
  { id: 6, year: '2018', technologies: ['Bash', 'Linux', 'Shell scripting'], type: 'work' },
  {
    id: 7,
    year: '2015',
    technologies: ['Lego Mindstorms', 'Teaching', 'Project design'],
    type: 'work'
  },
  { id: 8, year: '2015', technologies: ['JavaScript', 'HTML', 'CSS', 'SCORM'], type: 'work' },
  { id: 9, year: '2015', technologies: ['Java', 'Visual Basic'], type: 'work' },
  { id: 10, year: '2015', technologies: ['Java', 'MySQL'], type: 'work' },
  {
    id: 11,
    year: '2010',
    technologies: ['Algorithms', 'Statistics', 'Linear Algebra', 'C++', 'Java'],
    type: 'education'
  }
];

const DETAILED_META: readonly DetailedMeta[] = [
  {
    id: 1,
    image: '',
    technologies: [
      'Angular',
      'NgRx',
      'RxJS',
      'D3.js',
      'Java',
      'C++',
      'Python',
      'Oracle',
      'MongoDB'
    ],
    color: '#06b6d4',
    year: '2021–2024'
  },
  {
    id: 2,
    image: '',
    technologies: [
      'Angular',
      'Web Components',
      'TypeScript',
      'Node.js',
      'Azure DevOps',
      'SonarQube'
    ],
    color: '#7c3aed',
    year: '2024–2026'
  },
  {
    id: 3,
    image: '',
    technologies: ['Python', 'React', 'D3.js', 'Fourier analysis', 'Web Audio API'],
    color: '#ec4899',
    year: '2019–2020'
  },
  {
    id: 4,
    image: '',
    technologies: ['React', 'D3.js', 'Node.js', 'OBD-II', 'WebSockets'],
    color: '#10b981',
    year: '2019–2020'
  }
];

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly i18n = inject(LanguageService);

  readonly projects = computed<Project[]>(() =>
    PROJECT_META.map((meta, i) => ({
      ...meta,
      title: this.i18n.t(`projectsPreview.items.${i}.title`),
      description: this.i18n.t(`projectsPreview.items.${i}.description`)
    }))
  );

  readonly timeline = computed<TimelineItem[]>(() =>
    TIMELINE_META.map((meta, i) => ({
      ...meta,
      title: this.i18n.t(`projectsPage.timeline.items.${i}.title`),
      company: this.i18n.t(`projectsPage.timeline.items.${i}.company`),
      description: this.i18n.t(`projectsPage.timeline.items.${i}.description`)
    }))
  );

  readonly detailedProjects = computed<DetailedProject[]>(() =>
    DETAILED_META.map((meta, i) => ({
      ...meta,
      title: this.i18n.t(`projectsPage.detailed.items.${i}.title`),
      subtitle: this.i18n.t(`projectsPage.detailed.items.${i}.subtitle`),
      description: this.i18n.t(`projectsPage.detailed.items.${i}.description`),
      longDescription: this.i18n.t(`projectsPage.detailed.items.${i}.longDescription`),
      features: this.i18n.tList(`projectsPage.detailed.items.${i}.features`)
    }))
  );

  readonly projectCount = computed(() => this.projects().length);
  readonly timelineCount = computed(() => this.timeline().length);

  getProjectById(id: number): Project | undefined {
    return this.projects().find((p) => p.id === id);
  }

  getDetailedProjectById(id: number): DetailedProject | undefined {
    return this.detailedProjects().find((p) => p.id === id);
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'work':
        return 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z';
      case 'project':
        return 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4';
      case 'education':
        return 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z';
      default:
        return '';
    }
  }
}
