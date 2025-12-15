// Utilities
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];

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

  // Add active class to current page link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  qsa('.mobile-menu-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/' && currentPage === 'index.html') {
      link.classList.add('active');
    } else if (href === `/${currentPage}`) {
      link.classList.add('active');
    }
  });
});