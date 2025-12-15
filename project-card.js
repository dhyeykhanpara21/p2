// Project Card Component
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
      <div class="project-card-grid">
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
        class="project-card" 
        onclick="window.open('${link}', '_blank')" 
        tabindex="0"
        role="button"
        aria-label="View project ${title}"
      >
        <div class="project-card__image">
          <img src="${imgSrc}" alt="${title}" loading="lazy" />
        </div>
        <div class="project-card__content">
          <h3 class="project-card__title">${title}</h3>
          <p class="project-card__description">${description}</p>
          <a 
            href="${link}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="project-card__link" 
            onclick="event.stopPropagation()"
          >
            ${linkText}
            <i data-lucide="arrow-right" class="arrow-icon"></i>
          </a>
        </div>
      </div>
    `;
  }
}

// Initialize project cards when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Sample projects data - in a real implementation, this would come from your data source
  const sampleProjects = [
    {
      title: "Aero Landing Page",
      description: "A comprehensive AI chatbot platform. This project focuses on the design and development of a user-friendly and visually appealing landing page.",
      imgSrc: "https://framerusercontent.com/images/hynA7mpUiyBRDcssvVKCDBT14IM.jpg",
      link: "#"
    },
    {
      title: "Dreamland App Concept",
      description: "A dreamy mobile app prototype designed for mindfulness and relaxation, featuring calming animations and a serene user interface.",
      imgSrc: "https://framerusercontent.com/images/D4M3JTkvSAJaqyRe9AzUnHvL8Ao.jpg",
      link: "#",
      linkText: "Explore Concept"
    },
    {
      title: "Quantum Analytics Dashboard",
      description: "A data visualization tool for quantum computing experiments, providing real-time insights and complex data analysis.",
      imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      link: "#"
    }
  ];

  // Get the project grid container
  const projectGrid = document.getElementById('projectGrid');
  
  // If we're on the projects page and have the grid container
  if (projectGrid) {
    // Use actual project data if available, otherwise use sample data
    const projectsData = window.PROJECTS && window.PROJECTS.length > 0 
      ? window.PROJECTS.map(p => ({
          title: p.title,
          description: p.desc,
          imgSrc: p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
          link: p.demo || '#'
        }))
      : sampleProjects;
    
    // Create and render the project cards
    new ProjectCard(projectGrid, projectsData);
  }
});