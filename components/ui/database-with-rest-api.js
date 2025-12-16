// DatabaseWithRestApi component for the portfolio
class DatabaseWithRestApi {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      circleText: 'SVG',
      badgeTexts: {
        first: 'GET',
        second: 'POST',
        third: 'PUT',
        fourth: 'DELETE'
      },
      buttonTexts: {
        first: 'LegionDev',
        second: 'v2_updates'
      },
      title: 'Data exchange using a customized REST API',
      lightColor: '#00A6F5',
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.render();
  }
  
  render() {
    const databaseHTML = `
      <div class="database-with-rest-api-container">
        <div class="database-with-rest-api">
          <!-- SVG Paths -->
          <div class="database-svg-container">
            <svg class="database-svg" width="100%" height="100%" viewBox="0 0 200 100">
              <g class="database-paths">
                <path class="database-path" d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
                <path class="database-path" d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
                <path class="database-path" d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
                <path class="database-path" d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
              </g>
              
              <!-- Animated Lights -->
              <g mask="url(#db-mask-1)">
                <circle class="database-light database-light-1 database-light-circle" cx="0" cy="0" r="12" />
              </g>
              <g mask="url(#db-mask-2)">
                <circle class="database-light database-light-2 database-light-circle" cx="0" cy="0" r="12" />
              </g>
              <g mask="url(#db-mask-3)">
                <circle class="database-light database-light-3 database-light-circle" cx="0" cy="0" r="12" />
              </g>
              <g mask="url(#db-mask-4)">
                <circle class="database-light database-light-4 database-light-circle" cx="0" cy="0" r="12" />
              </g>
              
              <!-- Buttons -->
              <g class="database-button-group">
                <!-- First Button -->
                <g>
                  <rect class="database-button-rect" x="14" y="5" width="34" height="10"></rect>
                  ${this.renderDatabaseIcon(18, 7.5)}
                  <text class="database-button-text" x="28" y="12">${this.options.badgeTexts.first}</text>
                </g>
                <!-- Second Button -->
                <g>
                  <rect class="database-button-rect" x="60" y="5" width="34" height="10"></rect>
                  ${this.renderDatabaseIcon(64, 7.5)}
                  <text class="database-button-text" x="74" y="12">${this.options.badgeTexts.second}</text>
                </g>
                <!-- Third Button -->
                <g>
                  <rect class="database-button-rect" x="108" y="5" width="34" height="10"></rect>
                  ${this.renderDatabaseIcon(112, 7.5)}
                  <text class="database-button-text" x="122" y="12">${this.options.badgeTexts.third}</text>
                </g>
                <!-- Fourth Button -->
                <g>
                  <rect class="database-button-rect" x="150" y="5" width="40" height="10"></rect>
                  ${this.renderDatabaseIcon(154, 7.5)}
                  <text class="database-button-text" x="165" y="12">${this.options.badgeTexts.fourth}</text>
                </g>
              </g>
              
              <defs>
                <!-- Masks -->
                <mask id="db-mask-1">
                  <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" stroke-width="0.5" stroke="white" />
                </mask>
                <mask id="db-mask-2">
                  <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" stroke-width="0.5" stroke="white" />
                </mask>
                <mask id="db-mask-3">
                  <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" stroke-width="0.5" stroke="white" />
                </mask>
                <mask id="db-mask-4">
                  <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" stroke-width="0.5" stroke="white" />
                </mask>
                
                <!-- Blue Gradient -->
                <radialGradient id="db-blue-grad" fx="1">
                  <stop offset="0%" stop-color="${this.options.lightColor}" />
                  <stop offset="100%" stop-color="transparent" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          
          <!-- Main Box -->
          <div class="database-main-box">
            <!-- Bottom shadow -->
            <div class="database-bottom-shadow"></div>
            
            <!-- Box title -->
            <div class="database-box-title">
              <svg class="database-sparkles-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span class="database-title-text">${this.options.title}</span>
            </div>
            
            <!-- Outer circle -->
            <div class="database-outer-circle">
              ${this.options.circleText}
            </div>
            
            <!-- Box content -->
            <div class="database-box-content">
              <!-- Badges -->
              <div class="database-badge database-badge-first">
                <svg class="database-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5" />
                  <path d="M12 18.5c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 1 8.5 13c1.76 0 3-.5 4.5-2 1.5 1.5 2.74 2 4.5 2a5.5 5.5 0 0 1 5.5 5.5c0 2.29-1.51 4.04-3 5.5" />
                </svg>
                <span>${this.options.buttonTexts.first}</span>
              </div>
              
              <div class="database-badge database-badge-second">
                <svg class="database-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span>${this.options.buttonTexts.second}</span>
              </div>
              
              <!-- Animated circles -->
              <div class="database-animated-circle database-circle-1"></div>
              <div class="database-animated-circle database-circle-2"></div>
              <div class="database-animated-circle database-circle-3"></div>
              <div class="database-animated-circle database-circle-4"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = databaseHTML;
  }
  
  renderDatabaseIcon(x, y) {
    return `
      <svg x="${x}" y="${y}" xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    `;
  }
}

// Export for use in other files
window.DatabaseWithRestApi = DatabaseWithRestApi;