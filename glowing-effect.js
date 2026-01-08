/**
 * GlowingEffect - Vanilla JavaScript implementation
 * Creates interactive glowing border effect on mouse movement
 */

class GlowingEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      blur: options.blur || 0,
      inactiveZone: options.inactiveZone || 0.7,
      proximity: options.proximity || 0,
      spread: options.spread || 20,
      variant: options.variant || 'default',
      glow: options.glow !== undefined ? options.glow : false,
      disabled: options.disabled !== undefined ? options.disabled : true,
      movementDuration: options.movementDuration || 2,
      borderWidth: options.borderWidth || 1,
    };

    this.lastPosition = { x: 0, y: 0 };
    this.animationFrameId = null;
    this.currentAngle = 0;
    this.targetAngle = 0;
    this.animationStartTime = null;
    this.animationStartAngle = 0;

    this.init();
  }

  init() { 
    
    this.createWrapper();
    

    this.applyStyles();

    
    if (!this.options.disabled) {
      this.bindEvents();
    }
  }

  createWrapper() {
    // Make sure parent has position relative
    const parent = this.element.parentElement;
    if (getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }

    // Create fallback border (shown when disabled or inactive)
    this.fallbackBorder = document.createElement('div');
    this.fallbackBorder.className = 'glowing-effect-fallback';
    
    // Create glowing container
    this.glowContainer = document.createElement('div');
    this.glowContainer.className = 'glowing-effect-container';
    
    // Create inner glow element
    this.glowInner = document.createElement('div');
    this.glowInner.className = 'glowing-effect-inner';
    
    this.glowContainer.appendChild(this.glowInner);
    
    // Insert before the target element
    this.element.parentElement.insertBefore(this.fallbackBorder, this.element);
    this.element.parentElement.insertBefore(this.glowContainer, this.element);
  }

  applyStyles() {
    // Set CSS custom properties
    const gradient = this.options.variant === 'white'
      ? `repeating-conic-gradient(
          from 236.84deg at 50% 50%,
          #000,
          #000 5%
        )`
      : `radial-gradient(circle, #ffffff 10%, #ffffff00 20%),
         radial-gradient(circle at 40% 40%, #e0e0e0 5%, #e0e0e000 15%),
         radial-gradient(circle at 60% 60%, #c0c0c0 10%, #c0c0c000 20%),
         radial-gradient(circle at 40% 60%, #a0a0a0 10%, #a0a0a000 20%),
         repeating-conic-gradient(
           from 236.84deg at 50% 50%,
           #ffffff 0%,
           #e0e0e0 5%,
           #c0c0c0 10%,
           #a0a0a0 15%,
           #ffffff 20%
         )`;

    this.glowContainer.style.setProperty('--blur', `${this.options.blur}px`);
    this.glowContainer.style.setProperty('--spread', this.options.spread);
    this.glowContainer.style.setProperty('--start', '0');
    this.glowContainer.style.setProperty('--active', '0');
    this.glowContainer.style.setProperty('--border-width', `${this.options.borderWidth}px`);
    this.glowContainer.style.setProperty('--gradient', gradient);

    // Apply visibility based on options
    if (this.options.disabled) {
      this.glowContainer.style.display = 'none';
      this.fallbackBorder.style.display = 'block';
    } else {
      this.glowContainer.style.display = 'block';
      this.fallbackBorder.style.display = 'none';
    }

    if (this.options.glow) {
      this.fallbackBorder.style.opacity = '1';
      this.glowContainer.style.opacity = '1';
    }

    if (this.options.blur > 0) {
      this.glowContainer.classList.add('blurred');
    }

    if (this.options.variant === 'white') {
      this.fallbackBorder.classList.add('white-variant');
    }
  }

  bindEvents() {
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    document.body.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  handlePointerMove(e) {
    this.handleMove({ x: e.clientX, y: e.clientY });
  }

  handleScroll() {
    this.handleMove();
  }

  handleMove(position) {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      const rect = this.element.getBoundingClientRect();
      const mouseX = position?.x ?? this.lastPosition.x;
      const mouseY = position?.y ?? this.lastPosition.y;

      if (position) {
        this.lastPosition = { x: mouseX, y: mouseY };
      }

      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;
      const distanceFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
      const inactiveRadius = 0.5 * Math.min(rect.width, rect.height) * this.options.inactiveZone;

      // Check if mouse is in inactive zone (center)
      if (distanceFromCenter < inactiveRadius) {
        this.glowContainer.style.setProperty('--active', '0');
        return;
      }

      // Check if mouse is within proximity
      const isActive =
        mouseX > rect.left - this.options.proximity &&
        mouseX < rect.left + rect.width + this.options.proximity &&
        mouseY > rect.top - this.options.proximity &&
        mouseY < rect.top + rect.height + this.options.proximity;

      this.glowContainer.style.setProperty('--active', isActive ? '1' : '0');

      if (!isActive) return;

      // Calculate angle
      this.targetAngle = (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90;

      // Start smooth animation
      this.animateAngle();
    });
  }

  animateAngle() {
    const angleDiff = ((this.targetAngle - this.currentAngle + 180) % 360) - 180;
    const newTargetAngle = this.currentAngle + angleDiff;

    this.animationStartTime = performance.now();
    this.animationStartAngle = this.currentAngle;
    
    const animate = (currentTime) => {
      const elapsed = (currentTime - this.animationStartTime) / 1000; // Convert to seconds
      const progress = Math.min(elapsed / this.options.movementDuration, 1);
      
      // Cubic bezier easing: [0.16, 1, 0.3, 1]
      const eased = this.cubicBezier(progress, 0.16, 1, 0.3, 1);
      
      this.currentAngle = this.animationStartAngle + (newTargetAngle - this.animationStartAngle) * eased;
      this.glowContainer.style.setProperty('--start', String(this.currentAngle));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  // Cubic bezier easing function
  cubicBezier(t, p1, p2, p3, p4) {
    const cX = 3 * p1;
    const bX = 3 * (p3 - p1) - cX;
    const aX = 1 - cX - bX;
    
    return ((aX * t + bX) * t + cX) * t;
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    document.body.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('scroll', this.handleScroll);

    if (this.fallbackBorder && this.fallbackBorder.parentElement) {
      this.fallbackBorder.parentElement.removeChild(this.fallbackBorder);
    }
    if (this.glowContainer && this.glowContainer.parentElement) {
      this.glowContainer.parentElement.removeChild(this.glowContainer);
    }
  }
}

// Auto-initialize elements with data-glowing-effect attribute
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-glowing-effect]');
  elements.forEach(element => {
    const options = {
      blur: parseInt(element.dataset.blur) || 0,
      inactiveZone: parseFloat(element.dataset.inactiveZone) || 0.7,
      proximity: parseInt(element.dataset.proximity) || 0,
      spread: parseInt(element.dataset.spread) || 20,
      variant: element.dataset.variant || 'default',
      glow: element.dataset.glow === 'true',
      disabled: element.dataset.disabled !== 'false',
      movementDuration: parseFloat(element.dataset.movementDuration) || 2,
      borderWidth: parseInt(element.dataset.borderWidth) || 1,
    };
    new GlowingEffect(element, options);
  });
});
