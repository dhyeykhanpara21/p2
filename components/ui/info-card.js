// components/ui/info-card.js
// Info Card Component for shadcn-style implementation

class InfoCard {
  constructor(container, cards) {
    this.container = container;
    this.cards = cards || [];
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const infoCards = this.cards.map(card => this.createInfoCard(card)).join('');
    this.container.innerHTML = `
      <div class="grid-responsive">
        ${infoCards}
      </div>
    `;
    
    // Initialize Lucide icons after rendering
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Add mouse move event listeners for the 3D effect
    this.addMouseEffects();
  }

  createInfoCard(card) {
    const {
      title,
      description,
      icon = null,
      link = "#",
      linkText = "Learn More"
    } = card;

    // Check if we have an icon to display
    const iconHtml = icon ? `
      <div class="info-card-icon mb-4">
        <i data-lucide="${icon}" class="h-8 w-8 text-primary"></i>
      </div>
    ` : '';

    return `
      <div 
        class="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl info-card"
        onclick="window.open('${link}', '_blank')" 
        tabindex="0"
        role="button"
        aria-label="View ${title}"
        data-tilt
        data-tilt-max="5"
        data-tilt-speed="400"
        data-tilt-perspective="500"
      >
        <div class="flex flex-1 flex-col p-6">
          ${iconHtml}
          <h3 class="text-xl font-semibold transition-colors duration-300 group-hover:text-primary mb-3">
            ${title}
          </h3>
          <p class="flex-1 text-muted-foreground mb-4">
            ${description}
          </p>
          <a 
            href="${link}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="group/button inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:underline mt-auto"
            onclick="event.stopPropagation()"
          >
            ${linkText}
            <i data-lucide="arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1"></i>
          </a>
        </div>
      </div>
    `;
  }

  addMouseEffects() {
    // Add 3D tilt effect to cards
    const cards = document.querySelectorAll('.info-card[data-tilt]');
    
    cards.forEach(card => {
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;
      let animationId;

      // Get settings from data attributes
      const maxTilt = parseFloat(card.dataset.tiltMax) || 5;
      const speed = parseFloat(card.dataset.tiltSpeed) || 400;
      const perspective = parseFloat(card.dataset.tiltPerspective) || 500;

      // Set perspective on parent
      card.style.transformStyle = 'preserve-3d';

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate rotation values (-1 to 1) based on mouse position
        const mouseX = (e.clientX - centerX) / (rect.width / 2);
        const mouseY = (e.clientY - centerY) / (rect.height / 2);
        
        // Apply max tilt
        targetX = mouseY * maxTilt;
        targetY = -mouseX * maxTilt;
      };

      const handleMouseLeave = () => {
        targetX = 0;
        targetY = 0;
      };

      const animate = () => {
        // Smooth interpolation
        currentX += (targetX - currentX) / (speed / 16);
        currentY += (targetY - currentY) / (speed / 16);
        
        // Apply transform
        card.style.transform = `perspective(${perspective}px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        
        // Continue animation if not at target
        if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
          animationId = requestAnimationFrame(animate);
        }
      };

      // Start animation loop
      const startAnimation = () => {
        if (!animationId) {
          animationId = requestAnimationFrame(animate);
        }
      };

      card.addEventListener('mousemove', (e) => {
        handleMouseMove(e);
        startAnimation();
      });
      
      card.addEventListener('mouseleave', () => {
        handleMouseLeave();
        startAnimation();
      });
    });
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InfoCard;
} else {
  window.InfoCard = InfoCard;
}