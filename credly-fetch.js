// credly-fetch.js
// Script to fetch badges from Credly and integrate them into the portfolio

class CredlyBadgeFetcher {
  constructor(username) {
    this.username = username;
    this.baseUrl = 'https://www.credly.com/users';
  }

  // Fetch badges from Credly with proxy fallback for CORS issues
  async fetchBadges() {
    try {
      // Try direct fetch first
      const directUrl = `${this.baseUrl}/${this.username}/badges.json`;
      console.log('Attempting direct fetch from:', directUrl);
      
      const response = await fetch(directUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Direct fetch successful, badges found:', data.data?.length || 0);
      return data.data || [];
    } catch (error) {
      console.warn('Direct fetch failed, trying proxy method:', error.message);
      
      // If direct fetch fails (likely due to CORS), try a proxy
      try {
        // Using AllOrigins proxy as a fallback
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`${this.baseUrl}/${this.username}/badges.json`)}`;
        console.log('Attempting proxy fetch from:', proxyUrl);
        
        const proxyResponse = await fetch(proxyUrl);
        if (!proxyResponse.ok) {
          throw new Error(`Proxy HTTP error! status: ${proxyResponse.status}`);
        }
        
        const proxyData = await proxyResponse.json();
        const jsonData = JSON.parse(proxyData.contents);
        console.log('Proxy fetch successful, badges found:', jsonData.data?.length || 0);
        return jsonData.data || [];
      } catch (proxyError) {
        console.error('Both direct and proxy fetch failed:', proxyError.message);
        // Return empty array to trigger fallback to manual certificates
        return [];
      }
    }
  }

  // Transform Credly badge data to match portfolio format
  transformBadgeData(badge) {
    return {
      id: badge.id,
      title: badge.badge_template.name,
      org: badge.issuer.entities[0]?.entity.name || 'Unknown Organization',
      year: new Date(badge.issued_at).getFullYear(),
      category: this.determineCategory(badge.badge_template),
      url: badge.badge_template.url,
      imageUrl: badge.badge_template.image_url,
      description: badge.badge_template.description,
      issuedAt: badge.issued_at,
      expiresAt: badge.expires_at
    };
  }

  // Determine category based on badge properties
  determineCategory(badgeTemplate) {
    const name = badgeTemplate.name.toLowerCase();
    const description = badgeTemplate.description.toLowerCase();
    
    if (name.includes('google') || name.includes('cloud') || name.includes('aws') || name.includes('azure')) {
      return 'Cloud';
    } else if (name.includes('javascript') || name.includes('python') || name.includes('java') || 
               name.includes('react') || name.includes('angular') || name.includes('node')) {
      return 'Development';
    } else if (name.includes('security') || name.includes('cyber')) {
      return 'Security';
    } else if (name.includes('data') || name.includes('sql') || name.includes('database')) {
      return 'Data';
    } else if (name.includes('ai') || name.includes('machine') || name.includes('ml')) {
      return 'AI/ML';
    } else {
      // Check description for keywords
      if (description.includes('cloud') || description.includes('gcp') || description.includes('aws')) {
        return 'Cloud';
      } else if (description.includes('web') || description.includes('frontend') || description.includes('backend')) {
        return 'Development';
      } else {
        return 'General';
      }
    }
  }

  // Get all badges transformed for the portfolio
  async getPortfolioBadges() {
    const badges = await this.fetchBadges();
    return badges.map(badge => this.transformBadgeData(badge));
  }
}

// Function to initialize Credly badge fetching
async function initCredlyBadges() {
  // Check if we're on the certificates page
  const certGrid = document.getElementById('certGrid');
  if (!certGrid) return;

  // Show loading message
  certGrid.innerHTML = '<p>Loading badges from Credly...</p>';

  try {
    const fetcher = new CredlyBadgeFetcher('dhyey-khanpara');
    const badges = await fetcher.getPortfolioBadges();

    if (badges.length > 0) {
      // Update the window.CERTS array with fetched badges
      window.CERTS = badges;
      
      // Re-render certificates with the new data
      renderCertificates(badges);
      console.log(`Successfully loaded ${badges.length} badges from Credly`);
    } else {
      // Fallback to existing data if no badges fetched
      console.log('No badges found, falling back to manual certificates');
      renderCertificates(window.CERTS || []);
      certGrid.innerHTML = '<p>No badges found on Credly. Showing default certificates.</p>';
    }
  } catch (error) {
    console.error('Error initializing Credly badges:', error);
    // Fallback to existing data if there's an error
    renderCertificates(window.CERTS || []);
    certGrid.innerHTML = '<p>Error loading badges from Credly. Showing default certificates.</p>';
  }
}

// Enhanced certificate card renderer to show badge images
function credlyCertCard(c) {
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
      ${c.imageUrl ? `<div style="margin-top: 1rem;"><img src="${c.imageUrl}" alt="${c.title}" style="max-width: 100%; height: auto; border-radius: 4px;"></div>` : ''}
      ${c.description ? `<p style="margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-secondary);">${c.description}</p>` : ''}
    </article>
  `;
}

// Enhanced render function for Credly badges
function renderCredlyCertificates(list) {
  const grid = document.getElementById('certGrid'); 
  if (!grid) return;
  
  if (list && list.length > 0) {
    grid.innerHTML = list.map(c => credlyCertCard(c)).join('');
    [...grid.children].forEach((el, i) => { 
      el.style.transitionDelay = `${i*40}ms`; 
      el.classList.add('fade-in', 'appear'); 
    });
  } else {
    grid.innerHTML = '<p>No certificates or badges available.</p>';
  }
}

// Override the original renderCertificates function
function renderCertificates(list) {
  renderCredlyCertificates(list);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on the certificates page
  if (document.getElementById('certGrid')) {
    initCredlyBadges();
  }
});