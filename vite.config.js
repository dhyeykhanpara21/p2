import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Get all HTML files in the root directory
const getHtmlFiles = () => {
  const files = fs.readdirSync('.');
  const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'dist');
  
  // Create input object for Vite
  const input = {};
  htmlFiles.forEach(file => {
    const name = file.replace('.html', '');
    input[name] = resolve(__dirname, file);
  });
  
  // Also add HTML files in subdirectories
  const subDirs = ['components'];
  subDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const subFiles = fs.readdirSync(dir);
      subFiles.filter(file => file.endsWith('.html')).forEach(file => {
        const name = `${dir}/${file.replace('.html', '')}`;
        input[name] = resolve(__dirname, dir, file);
      });
    }
  });
  
  return input;
};

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        skills: 'skills.html',
        certificates: 'certificates.html',
        projects: 'projects.html',
        experience: 'experience.html',
        achievements: 'achievements.html',
        contact: 'contact.html',
        glowing: 'glowing-demo.html',
        projectCardDemo: 'project-card-demo.html'
      }
    },
    outDir: 'dist'
  },
  server: {
    port: 3000,
    open: true
  }
});