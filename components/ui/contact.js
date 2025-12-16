// Contact component for the portfolio
class Contact {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      title: 'Contact Us',
      description: 'We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!',
      phone: '(123) 34567890',
      email: 'email@example.com',
      web: { label: 'shadcnblocks.com', url: 'https://shadcnblocks.com' },
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
  }
  
  bindEvents() {
    const form = this.container.querySelector('#contactForm');
    if (form) {
      form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const firstName = this.container.querySelector('#firstName').value;
    const lastName = this.container.querySelector('#lastName').value;
    const email = this.container.querySelector('#email').value;
    const subject = this.container.querySelector('#subject').value;
    const message = this.container.querySelector('#message').value;
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { firstName, lastName, email, subject, message });
    
    // Show success message
    const statusElement = this.container.querySelector('#formStatus');
    if (statusElement) {
      statusElement.textContent = 'Message sent successfully!';
      statusElement.style.color = 'var(--text-primary)';
      
      // Reset form
      event.target.reset();
      
      // Clear message after 5 seconds
      setTimeout(() => {
        statusElement.textContent = '';
      }, 5000);
    }
  }
  
  render() {
    const contactHTML = `
      <div class="contact-container">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-info">
              <div class="contact-header">
                <h1 class="contact-title">${this.options.title}</h1>
                <p class="contact-description">${this.options.description}</p>
              </div>
              
              <div class="contact-details">
                <h3 class="contact-details-title">Contact Details</h3>
                <div class="contact-details-list">
                  <div class="contact-detail-item">
                    <span class="contact-detail-label">Phone</span>
                    <span class="contact-detail-value">${this.options.phone}</span>
                  </div>
                  <div class="contact-detail-item">
                    <span class="contact-detail-label">Email</span>
                    <a href="mailto:${this.options.email}" class="contact-detail-value">${this.options.email}</a>
                  </div>
                  <div class="contact-detail-item">
                    <span class="contact-detail-label">Web</span>
                    <a href="${this.options.web.url}" target="_blank" rel="noopener" class="contact-detail-value">${this.options.web.label}</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="contact-form-wrapper">
              <form id="contactForm" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" id="firstName" class="form-input" placeholder="First Name" required>
                  </div>
                  <div class="form-group">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" id="lastName" class="form-input" placeholder="Last Name" required>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" class="form-input" placeholder="Email" required>
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">Subject</label>
                  <input type="text" id="subject" class="form-input" placeholder="Subject" required>
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">Message</label>
                  <textarea id="message" class="form-textarea" placeholder="Type your message here." required></textarea>
                </div>
                
                <button type="submit" class="form-button">Send Message</button>
                <p id="formStatus" style="font-size: 0.9rem; text-align: center; margin: 0;"></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = contactHTML;
  }
}

// Export for use in other files
window.Contact = Contact;