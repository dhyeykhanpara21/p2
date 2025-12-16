// Database Animation Component
class DatabaseAnimation {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      circleText: options.circleText || "SVG",
      badgeTexts: options.badgeTexts || {
        first: "GET",
        second: "POST",
        third: "PUT",
        fourth: "DELETE"
      },
      buttonTexts: options.buttonTexts || {
        first: "LegionDev",
        second: "v2_updates"
      },
      title: options.title || "Data exchange using a customized REST API",
      lightColor: options.lightColor || "#00A6F5",
      ...options
    };
    
    this.init();
  }

  init() {
    this.render();
    this.animatePaths();
  }

  render() {
    const svgContent = `
      <svg
        class="database-svg"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        <g class="database-paths">
          <path class="database-path" d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path class="database-path" d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path class="database-path" d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path class="database-path" d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
        </g>

        <!-- Blue Lights -->
        <g mask="url(#db-mask-1)">
          <circle
            class="database db-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            class="database db-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            class="database db-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            class="database db-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>

        <!-- Buttons -->
        <g stroke="currentColor" fill="none" stroke-width="0.4">
          <!-- First Button -->
          <g>
            <rect
              class="database-button-rect"
              x="14"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            ${this.getDatabaseIcon(18, 7.5)}
            <text
              class="database-button-text"
              x="28"
              y="12"
            >
              ${this.options.badgeTexts.first}
            </text>
          </g>

          <!-- Second Button -->
          <g>
            <rect
              class="database-button-rect"
              x="60"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            ${this.getDatabaseIcon(64, 7.5)}
            <text
              class="database-button-text"
              x="74"
              y="12"
            >
              ${this.options.badgeTexts.second}
            </text>
          </g>

          <!-- Third Button -->
          <g>
            <rect
              class="database-button-rect"
              x="108"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            ${this.getDatabaseIcon(112, 7.5)}
            <text
              class="database-button-text"
              x="122"
              y="12"
            >
              ${this.options.badgeTexts.third}
            </text>
          </g>

          <!-- Fourth Button -->
          <g>
            <rect
              class="database-button-rect"
              x="150"
              y="5"
              width="40"
              height="10"
              rx="5"
            ></rect>
            ${this.getDatabaseIcon(154, 7.5)}
            <text
              class="database-button-text"
              x="165"
              y="12"
            >
              ${this.options.badgeTexts.fourth}
            </text>
          </g>
        </g>

        <defs>
          <!-- 1 - user list -->
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              stroke-width="0.5"
              stroke="white"
            />
          </mask>

          <!-- 2 - task list -->
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              stroke-width="0.5"
              stroke="white"
            />
          </mask>

          <!-- 3 - backlogs -->
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              stroke-width="0.5"
              stroke="white"
            />
          </mask>

          <!-- 4 - misc -->
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              stroke-width="0.5"
              stroke="white"
            />
          </mask>

          <!-- Blue Grad -->
          <radialGradient id="db-blue-grad" fx="1">
            <stop class="db-blue-gradient" offset="0%" />
            <stop class="db-transparent" offset="100%" />
          </radialGradient>
        </defs>
      </svg>
    `;

    const mainBoxContent = `
      <div class="database-main-box">
        <!-- bottom shadow -->
        <div class="database-bottom-shadow"></div>

        <!-- box title -->
        <div class="database-box-title">
          <svg class="database-sparkles-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span class="database-title-text">${this.options.title}</span>
        </div>

        <!-- box outer circle -->
        <div class="database-outer-circle">
          ${this.options.circleText}
        </div>

        <!-- box content -->
        <div class="database-box-content">
          <!-- Badges -->
          <div class="database-badge">
            <svg class="database-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5z" />
            </svg>
            <span>${this.options.buttonTexts.first}</span>
          </div>

          <div class="database-badge database-badge-right">
            <svg class="database-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span>${this.options.buttonTexts.second}</span>
          </div>

          <!-- Circles -->
          <div class="database-circle"></div>
          <div class="database-circle database-circle-2"></div>
          <div class="database-circle database-circle-3"></div>
          <div class="database-circle database-circle-4"></div>
        </div>
      </div>
    `;

    this.container.innerHTML = `
      <div class="database-animation-wrapper">
        ${svgContent}
        ${mainBoxContent}
      </div>
    `;
  }

  getDatabaseIcon(x, y) {
    return `
      <svg
        x="${x}"
        y="${y}"
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    `;
  }

  animatePaths() {
    // Add animation class to paths after a short delay
    setTimeout(() => {
      const paths = this.container.querySelectorAll('.database-path');
      paths.forEach(path => {
        path.classList.add('database-path-animation');
      });
    }, 100);
  }
}

// Export for use in other files
window.DatabaseAnimation = DatabaseAnimation;