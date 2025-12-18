// Gradient Card Generator
function generateGradientCards(containerId, cardsData) {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error('Container element not found');
    return;
  }
  
  // Default cards data if none provided
  const cards = cardsData || [
    {
      title: 'Web Development',
      desc: 'Building responsive websites with modern technologies and frameworks for optimal user experiences.',
      gradientFrom: '#ffbc00',
      gradientTo: '#ff0058',
    },
    {
      title: 'UI/UX Design',
      desc: 'Creating intuitive interfaces with user-centered design principles and modern aesthetics.',
      gradientFrom: '#03a9f4',
      gradientTo: '#ff0058',
    },
    {
      title: 'Mobile Apps',
      desc: 'Developing cross-platform mobile applications with native-like performance and experience.',
      gradientFrom: '#4dff03',
      gradientTo: '#00d0ff',
    },
  ];
  
  const cardsHtml = cards.map((card, index) => `
    <div class="gradient-card">
      <div class="gradient-panel" style="background: linear-gradient(315deg, ${card.gradientFrom}, ${card.gradientTo});"></div>
      <div class="gradient-panel blur" style="background: linear-gradient(315deg, ${card.gradientFrom}, ${card.gradientTo});"></div>
      
      <div class="animated-blobs">
        <div class="blob top animate-blob"></div>
        <div class="blob bottom animate-blob animation-delay-1000"></div>
      </div>
      
      <div class="card-content">
        <h2>${card.title}</h2>
        <p>${card.desc}</p>
        <a href="#" class="card-link">Read More</a>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = `
    <div class="gradient-cards-container">
      ${cardsHtml}
    </div>
  `;
}

// Make it available globally
window.generateGradientCards = generateGradientCards;