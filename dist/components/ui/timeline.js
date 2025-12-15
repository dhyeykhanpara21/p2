// Timeline component for experience section
// Converted from React/Tailwind to vanilla JavaScript with your CSS variables

class Timeline {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.height = 0;
    this.init();
  }

  init() {
    this.render();
    this.calculateHeight();
    this.setupScrollListener();
  }

  calculateHeight() {
    const timelineElement = this.container.querySelector('.timeline-container');
    if (timelineElement) {
      this.height = timelineElement.offsetHeight;
    }
  }

  setupScrollListener() {
    // Simple scroll effect implementation
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
      
      const progressBar = this.container.querySelector('.timeline-progress');
      if (progressBar && this.height > 0) {
        const progressHeight = Math.min(scrollPercentage * 1.5, 1) * this.height;
        progressBar.style.height = `${progressHeight}px`;
      }
    });
  }

  render() {
    const timelineHTML = `
      <div class="timeline-wrapper">
        <div class="timeline-header">
          <h2 class="timeline-title">My Journey</h2>
          <p class="timeline-subtitle">Key milestones in my career and development</p>
        </div>
        
        <div class="timeline-container">
          ${this.data.map((item, index) => `
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="timeline-dot"></div>
                <h3 class="timeline-year desktop-only">${item.title}</h3>
              </div>
              
              <div class="timeline-content">
                <h3 class="timeline-year mobile-only">${item.title}</h3>
                <div class="timeline-details">${item.content}</div>
              </div>
            </div>
          `).join('')}
          
          <div class="timeline-bar">
            <div class="timeline-progress"></div>
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = timelineHTML;
  }
}

// Export for use in other files
window.Timeline = Timeline;