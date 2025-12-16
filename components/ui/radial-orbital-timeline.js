// Radial Orbital Timeline Component
// Converted from React/Tailwind to vanilla JavaScript

class RadialOrbitalTimeline {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.expandedItems = {};
    this.viewMode = "orbital";
    this.rotationAngle = 0;
    this.autoRotate = true;
    this.pulseEffect = {};
    this.centerOffset = { x: 0, y: 0 };
    this.activeNodeId = null;
    this.containerRef = null;
    this.orbitRef = null;
    this.nodeRefs = {};
    
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
    this.startAutoRotation();
    
    // Add resize listener for better responsiveness
    window.addEventListener('resize', () => {
      this.updateNodePositions();
    });
  }

  setupEventListeners() {
    // We'll set up event listeners after rendering
  }

  setupLucideIcons() {
    // Add Lucide icons to each node circle
    this.data.forEach(item => {
      const nodeElement = this.nodeRefs[item.id];
      if (nodeElement) {
        const iconContainer = nodeElement.querySelector('.rot-node-circle');
        if (iconContainer) {
          // Clear any existing content
          iconContainer.innerHTML = '';
          
          // Create Lucide icon
          const iconElement = document.createElement('i');
          iconElement.setAttribute('data-lucide', item.lucideIcon || 'check');
          iconElement.style.width = '16px';
          iconElement.style.height = '16px';
          iconContainer.appendChild(iconElement);
        }
      }
    });
  }

  startAutoRotation() {
    if (this.autoRotate && this.viewMode === "orbital") {
      setInterval(() => {
        this.rotationAngle = (this.rotationAngle + 0.3) % 360;
        this.updateNodePositions();
      }, 50);
    }
  }

  handleContainerClick(e) {
    if (e.target === this.containerRef || e.target === this.orbitRef) {
      this.expandedItems = {};
      this.activeNodeId = null;
      this.pulseEffect = {};
      this.autoRotate = true;
      this.updateNodePositions();
    }
  }

  toggleItem(id) {
    // Close all other items
    Object.keys(this.expandedItems).forEach((key) => {
      if (parseInt(key) !== id) {
        this.expandedItems[parseInt(key)] = false;
      }
    });

    // Toggle the clicked item
    this.expandedItems[id] = !this.expandedItems[id];

    if (!this.expandedItems[id]) {
      // Closing item
      this.activeNodeId = null;
      this.autoRotate = true;
      this.pulseEffect = {};
    } else {
      // Opening item
      this.activeNodeId = id;
      this.autoRotate = false;

      // Apply pulse effect to related items
      const relatedItems = this.getRelatedItems(id);
      this.pulseEffect = {};
      relatedItems.forEach((relId) => {
        this.pulseEffect[relId] = true;
      });

      this.centerViewOnNode(id);
    }

    this.updateNodePositions();
  }

  centerViewOnNode(nodeId) {
    if (this.viewMode !== "orbital") return;

    const nodeIndex = this.data.findIndex((item) => item.id === nodeId);
    const totalNodes = this.data.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    this.rotationAngle = 270 - targetAngle;
    this.updateNodePositions();
  }

  calculateNodePosition(index, total) {
    const angle = ((index / total) * 360 + this.rotationAngle) % 360;
    // Adjust radius based on screen size for better mobile responsiveness
    const baseRadius = 200;
    const radius = window.innerWidth < 768 ? baseRadius * 0.8 : baseRadius;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + this.centerOffset.x;
    const y = radius * Math.sin(radian) + this.centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  }

  getRelatedItems(itemId) {
    const currentItem = this.data.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  }

  isRelatedToActive(itemId) {
    if (!this.activeNodeId) return false;
    const relatedItems = this.getRelatedItems(this.activeNodeId);
    return relatedItems.includes(itemId);
  }

  getStatusStyles(status) {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  }

  updateNodePositions() {
    this.data.forEach((item, index) => {
      const position = this.calculateNodePosition(index, this.data.length);
      const isExpanded = this.expandedItems[item.id];
      const isRelated = this.isRelatedToActive(item.id);
      const isPulsing = this.pulseEffect[item.id];
      
      const nodeElement = this.nodeRefs[item.id];
      if (nodeElement) {
        // Update node position
        nodeElement.style.transform = `translate(${position.x}px, ${position.y}px)`;
        nodeElement.style.zIndex = isExpanded ? 200 : position.zIndex;
        nodeElement.style.opacity = isExpanded ? 1 : position.opacity;
        
        // Update node styles
        const nodeCircle = nodeElement.querySelector('.rot-node-circle');
        if (nodeCircle) {
          if (isExpanded) {
            nodeCircle.className = 'rot-node-circle rot-expanded';
          } else if (isRelated) {
            nodeCircle.className = 'rot-node-circle rot-related';
          } else {
            nodeCircle.className = 'rot-node-circle';
          }
        }
        
        // Update pulse effect
        const pulseElement = nodeElement.querySelector('.rot-pulse');
        if (pulseElement) {
          if (isPulsing) {
            pulseElement.classList.add('rot-pulse-active');
          } else {
            pulseElement.classList.remove('rot-pulse-active');
          }
        }
        
        // Update title
        const titleElement = nodeElement.querySelector('.rot-node-title');
        if (titleElement) {
          titleElement.className = isExpanded ? 'rot-node-title rot-title-expanded' : 'rot-node-title';
        }
        
        // Show/hide card
        const cardElement = nodeElement.querySelector('.rot-node-card');
        if (cardElement) {
          if (isExpanded) {
            cardElement.style.display = 'block';
          } else {
            cardElement.style.display = 'none';
          }
        }
      }
    });
  }

  render() {
    const timelineHTML = `
      <div class="rot-container">
        <div class="rot-wrapper">
          <div class="rot-orbit" id="rot-orbit">
            <!-- Center Core -->
            <div class="rot-core">
              <div class="rot-core-ping"></div>
              <div class="rot-core-ping rot-core-ping-delayed"></div>
              <div class="rot-core-inner"></div>
            </div>
            
            <!-- Orbit Ring -->
            <div class="rot-orbit-ring"></div>
            
            <!-- Nodes -->
            ${this.data.map((item, index) => {
              return `
                <div class="rot-node" data-id="${item.id}" id="rot-node-${item.id}">
                  <!-- Pulse Effect -->
                  <div class="rot-pulse"></div>
                  
                  <!-- Node Circle -->
                  <div class="rot-node-circle" data-lucide-icon="${item.lucideIcon || 'check'}">
                    <!-- Icon will be initialized with Lucide -->
                  </div>
                  
                  <!-- Node Title -->
                  <div class="rot-node-title">${item.title}</div>
                  
                  <!-- Node Card (Hidden by default) -->
                  <div class="rot-node-card">
                    <div class="rot-card-connector"></div>
                    <div class="rot-card-header">
                      <span class="rot-card-badge ${this.getStatusStyles(item.status)}">
                        ${item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                      </span>
                      <span class="rot-card-date">${item.date}</span>
                    </div>
                    <div class="rot-card-title">${item.title}</div>
                    <div class="rot-card-content">${item.content}</div>
                    
                    <div class="rot-card-energy">
                      <div class="rot-energy-label">
                        <svg class="rot-energy-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 2v10l4-2" />
                          <path d="M12 22c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                        </svg>
                        Energy Level
                      </div>
                      <span class="rot-energy-value">${item.energy}%</span>
                      <div class="rot-energy-bar">
                        <div class="rot-energy-fill" style="width: ${item.energy}%"></div>
                      </div>
                    </div>
                    
                    ${item.relatedIds.length > 0 ? `
                      <div class="rot-card-related">
                        <div class="rot-related-label">Related Items</div>
                        <div class="rot-related-items">
                          ${item.relatedIds.map(relatedId => {
                            const relatedItem = this.data.find(i => i.id === relatedId);
                            return relatedItem ? `<span class="rot-related-item">${relatedItem.title}</span>` : '';
                          }).join('')}
                        </div>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = timelineHTML;
    
    // Set up references
    this.containerRef = this.container;
    this.orbitRef = this.container.querySelector('#rot-orbit');
    
    // Set up node references
    this.data.forEach(item => {
      this.nodeRefs[item.id] = this.container.querySelector(`#rot-node-${item.id}`);
    });
    
    // Add event listeners
    this.container.addEventListener('click', (e) => {
      // Handle clicks on nodes
      const nodeElement = e.target.closest('.rot-node');
      if (nodeElement) {
        e.stopPropagation();
        const nodeId = parseInt(nodeElement.getAttribute('data-id'));
        this.toggleItem(nodeId);
      } else if (e.target === this.container || e.target === this.orbitRef) {
        this.handleContainerClick(e);
      }
    });
    
    // Set up Lucide icons
    this.setupLucideIcons();
    
    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Update positions after initial render
    setTimeout(() => {
      this.updateNodePositions();
    }, 100);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RadialOrbitalTimeline;
} else {
  window.RadialOrbitalTimeline = RadialOrbitalTimeline;
}