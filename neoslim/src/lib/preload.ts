let projectsPreloaded = false;

export function preloadProjectsPage(): void {
  if (!projectsPreloaded) {
    projectsPreloaded = true;
    import('../sections/ProjectsPage');
  }
}
