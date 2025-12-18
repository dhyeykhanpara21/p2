// components/ui/accordion.js
// Accordion Component for shadcn-style implementation

class Accordion {
  constructor(container, items, options = {}) {
    this.container = container;
    this.items = items || [];
    this.options = {
      collapsible: options.collapsible || true,
      defaultValue: options.defaultValue || null,
      ...options
    };
    this.activeIndex = this.getDefaultActiveIndex();
    this.init();
  }

  getDefaultActiveIndex() {
    if (this.options.defaultValue) {
      const index = parseInt(this.options.defaultValue.replace('item-', '')) - 1;
      return isNaN(index) ? null : index;
    }
    return null;
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    if (!this.container) return;

    const accordionItems = this.items.map((item, index) => this.createAccordionItem(item, index)).join('');
    this.container.innerHTML = `
      <div class="accordion">
        ${accordionItems}
      </div>
    `;
    
    // Initialize Lucide icons after rendering
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  createAccordionItem(item, index) {
    const itemId = `item-${index + 1}`;
    const isActive = this.activeIndex === index;
    const contentState = isActive ? 'open' : 'closed';
    const contentClass = `accordion-content accordion-content-${contentState}`;
    
    return `
      <div class="accordion-item border-b">
        <div class="accordion-header">
          <button 
            class="accordion-trigger flex w-full items-center justify-between py-4 font-medium transition-all hover:underline text-left"
            data-index="${index}"
            aria-expanded="${isActive}"
          >
            <span>${item.title}</span>
            <i data-lucide="chevron-down" class="h-4 w-4 shrink-0 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}"></i>
          </button>
        </div>
        <div 
          class="${contentClass} overflow-hidden text-sm transition-all"
          data-index="${index}"
          data-state="${contentState}"
        >
          <div class="pb-4 pt-0 text-muted-foreground">
            ${item.content}
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const triggers = this.container.querySelectorAll('.accordion-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(trigger.dataset.index);
        this.toggleItem(index);
      });
    });
  }

  toggleItem(index) {
    // If collapsible is false and trying to close the active item, do nothing
    if (!this.options.collapsible && this.activeIndex === index) {
      return;
    }

    const wasActive = this.activeIndex === index;
    
    // Close currently active item
    if (this.activeIndex !== null) {
      this.closeItem(this.activeIndex);
    }
    
    // Open clicked item if it wasn't active, or if collapsible is true
    if (!wasActive || this.options.collapsible) {
      this.openItem(index);
      this.activeIndex = wasActive ? null : index;
    } else {
      this.activeIndex = null;
    }
  }

  openItem(index) {
    const trigger = this.container.querySelector(`.accordion-trigger[data-index="${index}"]`);
    const content = this.container.querySelector(`.accordion-content[data-index="${index}"]`);
    const icon = trigger.querySelector('[data-lucide="chevron-down"]');
    
    if (trigger && content && icon) {
      trigger.setAttribute('aria-expanded', 'true');
      content.classList.remove('accordion-content-closed');
      content.classList.add('accordion-content-open');
      content.setAttribute('data-state', 'open');
      icon.classList.add('rotate-180');
    }
  }

  closeItem(index) {
    const trigger = this.container.querySelector(`.accordion-trigger[data-index="${index}"]`);
    const content = this.container.querySelector(`.accordion-content[data-index="${index}"]`);
    const icon = trigger.querySelector('[data-lucide="chevron-down"]');
    
    if (trigger && content && icon) {
      trigger.setAttribute('aria-expanded', 'false');
      content.classList.remove('accordion-content-open');
      content.classList.add('accordion-content-closed');
      content.setAttribute('data-state', 'closed');
      icon.classList.remove('rotate-180');
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Accordion;
} else {
  window.Accordion = Accordion;
}