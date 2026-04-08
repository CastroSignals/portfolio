import { TestBed } from '@angular/core/testing';
import { ProjectService, Project, DetailedProject, TimelineItem } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a non-empty list of projects', () => {
    const projects = service.projects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should return projects with the expected shape', () => {
    const project: Project = service.projects()[0];
    expect(project.id).toBeDefined();
    expect(typeof project.title).toBe('string');
    expect(typeof project.description).toBe('string');
    expect(typeof project.image).toBe('string');
    expect(Array.isArray(project.tags)).toBe(true);
    expect(project.tags.length).toBeGreaterThan(0);
    expect(typeof project.color).toBe('string');
  });

  it('should return a non-empty timeline', () => {
    const timeline = service.timeline();
    expect(timeline.length).toBeGreaterThan(0);
    const item: TimelineItem = timeline[0];
    expect(item.type).toMatch(/^(work|project|education)$/);
  });

  it('should return detailed projects with features array', () => {
    const detailed = service.detailedProjects();
    expect(detailed.length).toBeGreaterThan(0);
    const project: DetailedProject = detailed[0];
    expect(typeof project.longDescription).toBe('string');
    expect(Array.isArray(project.features)).toBe(true);
    expect(project.features.length).toBeGreaterThan(0);
  });

  it('should find a project by id', () => {
    const project = service.getProjectById(1);
    expect(project).toBeDefined();
    expect(project!.id).toBe(1);
  });

  it('should return undefined for a non-existent project id', () => {
    const project = service.getProjectById(999);
    expect(project).toBeUndefined();
  });

  it('should return a valid SVG path for known timeline types', () => {
    expect(service.getTypeIcon('work').length).toBeGreaterThan(0);
    expect(service.getTypeIcon('education').length).toBeGreaterThan(0);
    expect(service.getTypeIcon('project').length).toBeGreaterThan(0);
    expect(service.getTypeIcon('unknown')).toBe('');
  });
});
