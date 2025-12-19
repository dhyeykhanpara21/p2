// Utilities
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];

window.addEventListener('DOMContentLoaded', () => {
  // Loader
  setTimeout(() => { 
    const l = qs('#loader'); 
    if (l) l.style.display = 'none'; 
  }, 400);

  // Mobile menu toggle
  const mobileMenuToggle = qs('#mobileMenuToggle');
  const mobileMenuClose = qs('#mobileMenuClose');
  const mobileMenu = qs('#mobileMenu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
      document.body.style.overflow = '';
    });
  }
  
  // Close mobile menu when clicking a link
  qsa('.mobile-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // Mobile nav toggle (legacy)
  const navToggle = qs('#navToggle');
  const mobileNav = qs('#mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('show');
    });
    qsa('#mobileNav .nav-link').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('show'));
    });
  }

  // Intersection Observer fade-ins
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  qsa('.fade-in').forEach(el => io.observe(el));

  // Data-driven rendering (only on pages where elements exist)
  // Note: For certificates page, credly-fetch.js will handle rendering
  if (qs('#projectGrid')) {
      // On home page, show only first 3 projects; on projects page, show all
      if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '' || window.location.pathname.endsWith('/index.html')) {
        renderProjects(window.PROJECTS || [], 3);
      } else {
        renderProjects(window.PROJECTS || []);
      }
    }
  if (qs('#sideProjectsList')) renderSideProjects(window.SIDE_PROJECTS || []);
  if (qs('#expList')) renderExperience(window.EXPERIENCE || []);
  if (qs('#achievementsList')) renderAchievements(window.ACHIEVEMENTS || []);

  // Filters and search (only on certificates page)
  if (qs('.filter-btn')) {
    let activeFilter = 'all';
    let searchTerm = '';
    qsa('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
      qsa('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyCertFilters();
    }));
    qs('#certSearch')?.addEventListener('input', (e) => { 
      searchTerm = e.target.value.toLowerCase(); 
      applyCertFilters(); 
    });

    function applyCertFilters() {
      const filtered = (window.CERTS || []).filter(c => {
        const matchesCat = activeFilter === 'all' || c.category === activeFilter;
        const matchesText = [c.title, c.org, c.year, c.category].join(' ').toLowerCase().includes(searchTerm);
        return matchesCat && matchesText;
      });
      renderCertificates(filtered);
    }
  }

  // Contact form
  const form = qs('#contactForm');
  const formStatus = qs('#formStatus');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (formStatus) formStatus.textContent = 'Sending...';
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        // Demo only: replace with Formspree/EmailJS/serverless
        await new Promise(r => setTimeout(r, 800));
        form.reset();
        if (formStatus) formStatus.textContent = 'Message sent. I will get back to you soon.';
      } catch (err) {
        if (formStatus) formStatus.textContent = 'Something went wrong. Please try again later.';
      }
    });
  }

  // Footer year
  const y = qs('#year'); 
  if (y) y.textContent = new Date().getFullYear();

  // Dynamic day greeting
  const currentDayElement = qs('#currentDay');
  if (currentDayElement) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    currentDayElement.textContent = days[today.getDay()];
  }

  // Initialize side project modals after a short delay to ensure rendering
  setTimeout(initializeSideProjectModals, 100);
});

// Renderers
function renderCertificates(list) {
  const grid = qs('#certGrid'); 
  if (!grid) return;
  
  // Check if we have any certificates/badges to display
  if (list && list.length > 0) {
    grid.innerHTML = list.map(c => certCard(c)).join('');
    qsa('#certGrid > *').forEach((el, i) => { 
      el.style.transitionDelay = `${i*40}ms`; 
      el.classList.add('fade-in', 'appear'); 
    });
  } else {
    // Show a message when no certificates are available
    grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">No certificates or badges available at this time.</p>';
  }
}

function certCard(c) {
  // Check if this is a Credly badge (has imageUrl property)
  if (c.imageUrl) {
    // Enhanced card for Credly badges with image
    return `
      <article class="card fade-in">
        <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
          <div>
            <h3 class="card-title">${c.title}</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${c.org} • ${c.year}</p>
            <span class="badge">${c.category}</span>
          </div>
          <a href="${c.url}" target="_blank" rel="noopener" class="btn-secondary" style="white-space: nowrap; padding: 0.5rem 1rem; font-size: 0.85rem;">View</a>
        </div>
        <div style="margin-top: 1rem;">
          <img src="${c.imageUrl}" alt="${c.title}" style="max-width: 100%; height: auto; border-radius: 4px;">
        </div>
        ${c.description ? `<p style="margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-secondary);">${c.description}</p>` : ''}
      </article>
    `;
  } else {
    // Standard card for manually added certificates
    return `
      <article class="card fade-in">
        <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
          <div>
            <h3 class="card-title">${c.title}</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${c.org} • ${c.year}</p>
            <span class="badge">${c.category}</span>
          </div>
          <a href="${c.url}" target="_blank" rel="noopener" class="btn-secondary" style="white-space: nowrap; padding: 0.5rem 1rem; font-size: 0.85rem;">View</a>
        </div>
      </article>
    `;
  }
}

function renderProjects(list, limit = null) {
  const grid = qs('#projectGrid'); 
  if (!grid) return;
  
  // If limit is specified, only show that many projects
  const projectsToShow = limit ? list.slice(0, limit) : list;
  
  grid.classList.add('pin-projects-grid');
  grid.innerHTML = projectsToShow.map(p => projectCard(p)).join('');
  qsa('#projectGrid > *').forEach((el, i) => { 
    el.style.transitionDelay = `${i*40}ms`; 
    el.classList.add('fade-in', 'appear'); 
  });
}

function projectCard(p) {
  const tech = p.tech.map(t => `<span class="project-pin-tech-tag">${t}</span>`).join('');
  return `
    <a class="pin-container fade-in" href="${p.demo}" target="_blank" rel="noopener">
      <!-- Pin Hover Effect Area -->
      <div class="pin-hover-area">
        <div class="pin-hover-inner">
          <!-- Title Link -->
          <div class="pin-title-wrapper">
            <span class="pin-title-link">
              <span class="pin-title-text">${p.title}</span>
              <span class="pin-title-glow"></span>
            </span>
          </div>
          
          <!-- Animated Circles -->
          <div class="pin-circles-wrapper">
            <div class="pin-circle"></div>
            <div class="pin-circle"></div>
            <div class="pin-circle"></div>
          </div>
          
          <!-- Pin Lines -->
          <div class="pin-line pin-line-blur"></div>
          <div class="pin-line pin-line-solid"></div>
          <div class="pin-dot pin-dot-blur"></div>
          <div class="pin-dot pin-dot-solid"></div>
        </div>
      </div>
      
      <!-- 3D Perspective Card -->
      <div class="pin-perspective-wrapper" style="transform: rotateX(70deg) translateZ(0deg);">
        <div class="pin-card">
          <div class="pin-card-content">
            <div class="project-pin-card">
              <div class="project-pin-header">
                <div class="project-pin-indicator"></div>
                <span class="project-pin-status">Live Project</span>
              </div>
              <div class="project-pin-content">
                <h3 class="project-pin-title">${p.title}</h3>
                <p class="project-pin-description">${p.desc}</p>
                <div class="project-pin-tech">${tech}</div>
                <div class="project-pin-footer">
                  <span class="project-pin-meta">View Project</span>
                  <span class="project-pin-link">Explore →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
}

function renderExperience(list) {
  const wrap = qs('#expList'); 
  if (!wrap) return;
  wrap.innerHTML = list.map(e => `
    <article class="card fade-in">
      <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem; margin-bottom: 1rem;">
        <div>
          <h3 class="card-title">${e.role}</h3>
          <p style="color: var(--text-secondary);">${e.company}</p>
        </div>
        <span style="font-size: 0.85rem; color: var(--text-light); white-space: nowrap;">${e.duration}</span>
      </div>
      <ul style="list-style: disc; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
        ${e.bullets.map(b => `<li style="color: var(--text-secondary);">${b}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}

function renderAchievements(list) {
  const ul = qs('#achievementsList'); 
  if (!ul) return;
  ul.innerHTML = list.map(a => `<div class="card fade-in"><p>${a}</p></div>`).join('');
}

// Side Projects Icons
const sideProjectIcons = {
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  'bar-chart': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`,
  discord: `<svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  car: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17H3v-6l2-4h12l2 4v6h-2M5 17h10"/><path d="M5 7l1-2h12l1 2"/></svg>`,
  courses: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  podcast: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M12 1a9 9 0 0 0-9 9v7a3 3 0 0 0 3 3h3V10a6 6 0 1 1 12 0v10h3a3 3 0 0 0 3-3v-7a9 9 0 0 0-9-9z"/></svg>`
};

function renderSideProjects(list) {
  const wrap = qs('#sideProjectsList'); 
  if (!wrap) return;
  wrap.innerHTML = list.map(p => sideProjectCard(p)).join('');
  qsa('#sideProjectsList > *').forEach((el, i) => { 
    el.style.transitionDelay = `${i*60}ms`; 
    el.classList.add('fade-in', 'appear'); 
  });
}

function sideProjectCard(p) {
  const icon = sideProjectIcons[p.icon] || sideProjectIcons.courses;
  return `
    <div class="side-project-item fade-in" data-project-id="${p.id}">
      <div class="side-project-icon">
        ${icon}
      </div>
      <div class="side-project-info">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
      <div class="side-project-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  `;
}

// Add event listeners for side project items after rendering
function initializeSideProjectModals() {
  const sideProjectItems = document.querySelectorAll('.side-project-item');
  
  sideProjectItems.forEach(item => {
    item.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project-id');
      const project = window.SIDE_PROJECTS.find(p => p.id == projectId);
      
      if (project) {
        const modal = document.getElementById('sideProjectModal');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDescription = modal.querySelector('.modal-description');
        const modalIcon = modal.querySelector('.modal-icon');
        const modalLink = modal.querySelector('.modal-link');
        
        // Set modal content
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.details || project.desc;
        modalIcon.innerHTML = sideProjectIcons[project.icon] || sideProjectIcons.courses;
        modalLink.href = project.url;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close modal when clicking on close button
  const closeBtn = document.querySelector('#sideProjectModal .close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      const modal = document.getElementById('sideProjectModal');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  // Close modal when clicking outside of modal content
  const modal = document.getElementById('sideProjectModal');
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
}

// Call initializeSideProjectModals after rendering side projects
document.addEventListener('DOMContentLoaded', () => {
  // Loader
  setTimeout(() => { 
    const l = qs('#loader'); 
    if (l) l.style.display = 'none'; 
  }, 400);

  // Mobile menu toggle
  const mobileMenuToggle = qs('#mobileMenuToggle');
  const mobileMenuClose = qs('#mobileMenuClose');
  const mobileMenu = qs('#mobileMenu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
      document.body.style.overflow = '';
    });
  }
  
  // Close mobile menu when clicking a link
  qsa('.mobile-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // Mobile nav toggle (legacy)
  const navToggle = qs('#navToggle');
  const mobileNav = qs('#mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('show');
    });
    qsa('#mobileNav .nav-link').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('show'));
    });
  }

  // Intersection Observer fade-ins
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  qsa('.fade-in').forEach(el => io.observe(el));

  // Data-driven rendering (only on pages where elements exist)
  // Note: For certificates page, credly-fetch.js will handle rendering
  if (qs('#projectGrid')) {
      // On home page, show only first 3 projects; on projects page, show all
      if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '' || window.location.pathname.endsWith('/index.html')) {
        renderProjects(window.PROJECTS || [], 3);
      } else {
        renderProjects(window.PROJECTS || []);
      }
    }
  if (qs('#sideProjectsList')) renderSideProjects(window.SIDE_PROJECTS || []);
  if (qs('#expList')) renderExperience(window.EXPERIENCE || []);
  if (qs('#achievementsList')) renderAchievements(window.ACHIEVEMENTS || []);

  // Filters and search (only on certificates page)
  if (qs('.filter-btn')) {
    let activeFilter = 'all';
    let searchTerm = '';
    qsa('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
      qsa('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyCertFilters();
    }));
    qs('#certSearch')?.addEventListener('input', (e) => { 
      searchTerm = e.target.value.toLowerCase(); 
      applyCertFilters(); 
    });

    function applyCertFilters() {
      const filtered = (window.CERTS || []).filter(c => {
        const matchesCat = activeFilter === 'all' || c.category === activeFilter;
        const matchesText = [c.title, c.org, c.year, c.category].join(' ').toLowerCase().includes(searchTerm);
        return matchesCat && matchesText;
      });
      renderCertificates(filtered);
    }
  }

  // Contact form
  const form = qs('#contactForm');
  const formStatus = qs('#formStatus');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (formStatus) formStatus.textContent = 'Sending...';
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        // Demo only: replace with Formspree/EmailJS/serverless
        await new Promise(r => setTimeout(r, 800));
        form.reset();
        if (formStatus) formStatus.textContent = 'Message sent. I will get back to you soon.';
      } catch (err) {
        if (formStatus) formStatus.textContent = 'Something went wrong. Please try again later.';
      }
    });
  }

  // Footer year
  const y = qs('#year'); 
  if (y) y.textContent = new Date().getFullYear();

  // Dynamic day greeting
  const currentDayElement = qs('#currentDay');
  if (currentDayElement) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    currentDayElement.textContent = days[today.getDay()];
  }

  // Initialize side project modals after a short delay to ensure rendering
  setTimeout(initializeSideProjectModals, 100);
});
