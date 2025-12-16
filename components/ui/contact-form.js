// Contact Form Component
// Vanilla JavaScript implementation

class ContactForm {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      title: options.title || "Contact Us",
      description: options.description || "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
      phone: options.phone || "(123) 34567890",
      email: options.email || "email@example.com",
      web: options.web || { label: "shadcnblocks.com", url: "https://shadcnblocks.com" }
    };
    
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.container.querySelector('#contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(e);
      });
    }
  }

  handleSubmit(e) {
    const form = e.target;
    const formData = new FormData(form);
    const statusElement = this.container.querySelector('#formStatus');
    
    // In a real implementation, you would send the data to a server here
    // For now, we'll just show a success message
    
    if (statusElement) {
      statusElement.textContent = "Message sent successfully! We'll get back to you soon.";
      statusElement.style.color = "var(--text-primary)";
      
      // Reset form
      form.reset();
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        statusElement.textContent = "";
      }, 5000);
    }
  }

  render() {
    const contactHTML = `
      <section class="contact-section">
        <div class="contact-container">
          <div class="contact-header">
            <h1 class="contact-title">${this.options.title}</h1>
            <p class="contact-description">${this.options.description}</p>
          </div>
          
          <div class="contact-layout">
            <div class="contact-info">
              <div class="contact-details">
                <h3>Contact Details</h3>
                <div class="contact-detail-item">
                  <span class="contact-detail-label">Phone:</span>
                  <span class="contact-detail-value">${this.options.phone}</span>
                </div>
                <div class="contact-detail-item">
                  <span class="contact-detail-label">Email:</span>
                  <a href="mailto:${this.options.email}" class="contact-detail-value">${this.options.email}</a>
                </div>
                <div class="contact-detail-item">
                  <span class="contact-detail-label">Web:</span>
                  <a href="${this.options.web.url}" target="_blank" class="contact-detail-value">${this.options.web.label}</a>
                </div>
              </div>
            </div>
            
            <div class="contact-form-container">
              <form id="contactForm">
                <div class="form-group">
                  <div class="form-field">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" id="firstName" name="firstName" class="form-input" placeholder="First Name" required>
                  </div>
                  <div class="form-field">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" id="lastName" name="lastName" class="form-input" placeholder="Last Name" required>
                  </div>
                </div>
                
                <div class="form-field">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" name="email" class="form-input" placeholder="Email" required>
                </div>
                
                <div class="form-field">
                  <label for="subject" class="form-label">Subject</label>
                  <input type="text" id="subject" name="subject" class="form-input" placeholder="Subject" required>
                </div>
                
                <div class="form-field">
                  <label for="message" class="form-label">Message</label>
                  <textarea id="message" name="message" class="form-textarea" placeholder="Type your message here." required></textarea>
                </div>
                
                <button type="submit" class="submit-button">Send Message</button>
                <p id="formStatus" class="form-status"></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
    
    this.container.innerHTML = contactHTML;
    this.setupEventListeners();
  }
}

// Export for use in other files
window.ContactForm = ContactForm;