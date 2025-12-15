# Modern Dark Portfolio

A sleek, responsive portfolio website with a dark theme, built with vanilla HTML, CSS, and JavaScript.

## Features

- Dark theme with modern aesthetics
- Responsive design for all device sizes
- Project showcase with interactive cards
- Certificate integration with Credly
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
│       └── project-card-demo.html
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

This will create a `dist/` directory with all the optimized static files.

## Deployment

### Vercel (Recommended)

This portfolio is configured for easy deployment to Vercel:

1. Push your code to a Git repository
2. Import the repository in your Vercel dashboard
3. Vercel will automatically detect and deploy the project

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Customization

### Colors

The color scheme can be customized by modifying the CSS variables in `styles.css`:

```css
:root {
  --bg-primary: #000000;
  --bg-secondary: #0a0a0a;
  --bg-tertiary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --text-light: #808080;
  --border-color: #2a2a2a;
  --accent: #000000;
  --accent-hover: #1a1a1a;
  --card-bg: #0a0a0a;
  --card-border: #2a2a2a;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT