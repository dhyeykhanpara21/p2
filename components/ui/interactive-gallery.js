// Interactive Gallery Component
// Vanilla JavaScript implementation of the React component

class InteractiveGallery {
  constructor(container, items) {
    this.container = container;
    this.items = items;
    this.hoveredId = null;
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const galleryItems = this.container.querySelectorAll('.interactive-gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        const itemId = e.currentTarget.dataset.id;
        this.setHoveredId(itemId);
      });
      
      item.addEventListener('mouseleave', () => {
        this.setHoveredId(null);
      });
    });
  }

  setHoveredId(id) {
    this.hoveredId = id;
    this.updateHoverEffects();
  }

  updateHoverEffects() {
    const galleryItems = this.container.querySelectorAll('.interactive-gallery-item');
    
    galleryItems.forEach(item => {
      const itemId = item.dataset.id;
      
      // Remove existing classes
      item.classList.remove('hovered', 'blurred');
      
      // Add appropriate classes based on hover state
      if (this.hoveredId) {
        if (itemId === this.hoveredId) {
          item.classList.add('hovered');
        } else {
          item.classList.add('blurred');
        }
      }
    });
  }

  render() {
    const galleryHTML = `
      <div class="interactive-gallery">
        ${this.items.map(item => {
          if (item.type === 'image') {
            return `
              <div class="interactive-gallery-item image-type" data-id="${item.id}">
                ${item.src ? `<img src="${item.src}" alt="gallery item" class="interactive-gallery-image" loading="lazy">` : ''}
              </div>
            `;
          } else {
            return `
              <div class="interactive-gallery-item text-type" data-id="${item.id}">
                <div class="interactive-gallery-text-content">
                  ${item.text || ''}
                </div>
              </div>
            `;
          }
        }).join('')}
      </div>
    `;
    
    this.container.innerHTML = galleryHTML;
    this.setupEventListeners();
  }
}

// Export for use in other files
window.InteractiveGallery = InteractiveGallery;