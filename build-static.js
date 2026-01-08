// Simple static build script for Vercel deployment
const fs = require('fs');
const path = require('path');

console.log('Starting static build...');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Function to copy files recursively
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copy all files and directories
const itemsToCopy = [
    'index.html',
    'about.html',
    'skills.html',
    'certificates.html',
    'projects.html',
    'experience.html',

    'contact.html',
    'glowing-demo.html',
    'project-card-demo.html',
    'styles.css',
    'main.js',
    'page.js',
    'data.js',
    'credly-fetch.js',
    'verify-certificates.js',
    'server.js',
    'glowing-effect.js',
    'glowing-effect.css',
    '3d-pin.css',
    'project-card.css',
    'project-card.js',
    'testimonials-marquee.css',
    'debug-certificates.js',
    'assets',
    'components'
];

console.log('Copying files...');
itemsToCopy.forEach(item => {
    const srcPath = path.join(__dirname, item);
    const destPath = path.join(distDir, item);
    
    if (fs.existsSync(srcPath)) {
        console.log(`Copying ${item}...`);
        copyRecursiveSync(srcPath, destPath);
    } else {
        console.log(`Skipping ${item} (not found)`);
    }
});

console.log('Static build completed successfully!');
console.log('Output directory: dist/');