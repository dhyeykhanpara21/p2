# Deployment Guide

## Vercel Deployment

This portfolio is configured for easy deployment to Vercel.

### Prerequisites

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI: `npm install -g vercel`

### Deploy to Vercel

#### Option 1: Deploy from Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect the project settings
6. Click "Deploy"

#### Option 2: Deploy with Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your deployment

### Project Configuration

The project includes the following configuration files for deployment:

- `vercel.json` - Vercel deployment configuration
- `vite.config.js` - Vite build configuration
- `package.json` - Build scripts and dependencies

### Build Process

Vercel will automatically run `npm run build` which uses Vite to build the static site. The build output is placed in the `dist/` directory.

### Custom Domain

To use a custom domain:

1. Add a domain in your Vercel project settings
2. Follow the DNS configuration instructions provided by Vercel
3. Vercel will automatically provision an SSL certificate

### Environment Variables

This project doesn't require any environment variables for basic deployment. If you add features that require environment variables, you can add them in the Vercel project settings.

### Troubleshooting

If you encounter deployment issues:

1. Check the Vercel build logs for error messages
2. Ensure all dependencies are properly declared in `package.json`
3. Verify that the build command in `package.json` works locally:
   ```bash
   npm run build
   ```
4. Make sure your project structure matches what's expected by Vercel

### Local Development

For local development:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```