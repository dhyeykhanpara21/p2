# Modern Dark Portfolio

A sleek, responsive portfolio website with a dark theme, built with vanilla HTML, CSS, and JavaScript.

## Features

- Dark theme with modern aesthetics
- Responsive design for all device sizes
- Project showcase with interactive cards
- Certificate integration with Credly
- Experience timeline component
- Interactive gallery with hover effects
- Contact form with validation
- Smooth animations and transitions
- Mobile-friendly navigation
- Integration with Lucide icons

## Project Structure

```
portfolio/
├── components/
│   └── ui/
│       ├── project-card.js
│       ├── project-card.css
│       ├── project-card-demo.html
│       ├── timeline.js
│       ├── timeline.css
│       ├── interactive-gallery.js
│       ├── interactive-gallery.css
│       ├── interactive-gallery-demo.html
│       ├── contact-form.js
│       ├── contact-form.css
│       └── contact-form-demo.html
├── assets/
├── index.html
├── projects.html
├── skills.html
├── about.html
├── certificates.html
├── experience.html
├── achievements.html
├── contact.html
├── styles.css
├── data.js
├── main.js
├── credly-fetch.js
├── test-credly.html
├── server.js
└── ...
```

## Components

### Project Card

The project card component is located in `components/ui/` and follows shadcn-style conventions. It includes:

- Responsive grid layout
- Hover animations and effects
- Image scaling on hover
- Accessible markup
- Lucide icon integration

To use the project card component:

1. Include the CSS file in your HTML:
```html
<link rel="stylesheet" href="/components/ui/project-card.css" />
```

2. Include the JavaScript file:
```html
<script src="/components/ui/project-card.js"></script>
```

3. Add a container element with an ID:
```html
<div id="projectGrid"></div>
```

4. Initialize the component with JavaScript:
```javascript
const projectGrid = document.getElementById('projectGrid');
const projectsData = [
  {
    title: "Project Title",
    description: "Project description...",
    imgSrc: "path/to/image.jpg",
    link: "#"
  }
];

new ProjectCard(projectGrid, projectsData);
```

### Timeline

The timeline component showcases experiences and milestones in a visually appealing way:

- Vertical timeline layout with animated progress indicator
- Responsive design that works on all device sizes
- Sticky year markers for easy navigation
- Smooth scrolling effects
- Dark theme consistency

To use the timeline component:

1. Include the CSS file in your HTML:
```html
<link rel="stylesheet" href="/components/ui/timeline.css" />
```

2. Include the JavaScript file:
```html
<script src="/components/ui/timeline.js"></script>
```

3. Add a container element with an ID:
```html
<div id="timeline-container"></div>
```

4. Initialize the component with JavaScript:
```javascript
const timelineData = [
  {
    title: "2024",
    content: "<div><h3>Job Title</h3><p>Company Name</p><ul><li>Responsibility 1</li><li>Responsibility 2</li></ul></div>"
  }
];

const timelineContainer = document.getElementById('timeline-container');
new Timeline(timelineContainer, timelineData);
```

### Interactive Gallery

The interactive gallery component displays a collection of images and text cards with hover effects:

- Blurs and dims non-hovered items
- Scales up hovered items
- Supports both image and text content types
- Responsive grid layout
- Smooth transitions and animations
- Dark theme consistency

To use the interactive gallery component:

1. Include the CSS file in your HTML:
```html
<link rel="stylesheet" href="/components/ui/interactive-gallery.css" />
```

2. Include the JavaScript file:
```html
<script src="/components/ui/interactive-gallery.js"></script>
```

3. Add a container element with an ID:
```html
<div id="gallery-container"></div>
```

4. Initialize the component with JavaScript:
```javascript
const galleryContainer = document.getElementById('gallery-container');
const galleryItems = [
  {
    id: "1",
    type: "image",
    src: "path/to/image.jpg"
  },
  {
    id: "2",
    type: "text",
    text: "Sample text content for the card"
  }
];

new InteractiveGallery(galleryContainer, galleryItems);
```

### Contact Form

The contact form component provides a clean, responsive contact form with validation:

- Split layout with contact information and form
- Responsive design that works on all device sizes
- Form validation and submission handling
- Dark theme consistency
- Accessible markup

To use the contact form component:

1. Include the CSS file in your HTML:
```html
<link rel="stylesheet" href="/components/ui/contact-form.css" />
```

2. Include the JavaScript file:
```html
<script src="/components/ui/contact-form.js"></script>
```

3. Add a container element with an ID:
```html
<div id="contact-container"></div>
```

4. Initialize the component with JavaScript:
```javascript
const contactContainer = document.getElementById('contact-container');
new ContactForm(contactContainer, {
  title: "Contact Us",
  description: "We are available for questions, feedback, or collaboration opportunities.",
  phone: "(123) 456-7890",
  email: "contact@example.com",
  web: { label: "example.com", url: "https://example.com" }
});
```

### Credly Certificate Integration

The portfolio automatically fetches badges from your Credly profile and displays them on the certificates page.

To configure the Credly integration:

1. Ensure your Credly profile is public
2. Update the username in `credly-fetch.js`:
```javascript
const fetcher = new CredlyBadgeFetcher('your-credly-username');
```

Features:
- Automatic fetching of badges from Credly
- Display of badge images, descriptions, and issuing organizations
- Categorization of badges by technology area
- Direct links to view badges on Credly

## Dependencies

- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Credly](https://www.credly.com/) - Digital badge platform

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Open `index.html` in your browser, or

## Development

For development with hot reloading:
```bash
npm run dev
```

To run the local server (recommended for Credly integration):
```bash
npm run serve
```

Then open http://localhost:3000 in your browser.

## Building for Production

To build the site for production deployment:
```bash
npm run build
```

This will create a `dist/` directory with all the static files using a simple copy approach to avoid permission issues.

## Deployment

### Vercel (Recommended)

This portfolio is configured for easy deployment to Vercel:

1. Push your code to a Git repository
2. Import the repository in your Vercel dashboard
3. Vercel will automatically detect and deploy the project

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

We use a simple static build approach instead of Vite's build command to avoid permission issues that can occur on Vercel hosting platforms.

## Debugging