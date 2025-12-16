// components/ui/project-card.js
// Project Card Component for shadcn-style implementation

class ProjectCard {
  constructor(container, projects) {
    this.container = container;
    this.projects = projects || [];
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const projectCards = this.projects.map(project => this.createProjectCard(project)).join('');
    this.container.innerHTML = `
      <div class="grid-responsive">
        ${projectCards}
      </div>
    `;
    
    // Initialize Lucide icons after rendering
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  createProjectCard(project) {
    const {
      title,
      description,
      imgSrc,
      link,
      linkText = "View Project"
    } = project;

    return `
      <div 
        class="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl"
        onclick="window.open('${link}', '_blank')" 
        tabindex="0"
        role="button"
        aria-label="View project ${title}"
      >
        <div class="aspect-video overflow-hidden">
          <img 
            src="${imgSrc}" 
            alt="${title}" 
            class="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy" 
          />
        </div>
        <div class="flex flex-1 flex-col p-6">
          <h3 class="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
            ${title}
          </h3>
          <p class="mt-3 flex-1 text-muted-foreground">
            ${description}
          </p>
          <a 
            href="${link}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:underline"
            onclick="event.stopPropagation()"
          >
            ${linkText}
            <i data-lucide="arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1"></i>
          </a>
        </div>
      </div>
    `;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectCard;
} else {
  window.ProjectCard = ProjectCard;
}