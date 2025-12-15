// Build script for Vercel deployment
const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// List of file types to copy
const fileTypes = ['.html', '.css', '.js', '.json', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'];

// Function to copy files recursively
function copyFiles(src, dest) {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
        // Create directory in destination
        const destDir = path.join(dest, path.basename(src));
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }
        
        // Copy all files in directory
        const files = fs.readdirSync(src);
        files.forEach(file => {
            copyFiles(path.join(src, file), destDir);
        });
    } else if (fileTypes.some(ext => src.endsWith(ext))) {
        // Copy file
        const destFile = path.join(dest, path.basename(src));
        fs.copyFileSync(src, destFile);
        console.log(`Copied ${src} to ${destFile}`);
    }
}

// Copy all relevant files to dist directory
console.log('Building static site...');
copyFiles(__dirname, distDir);

// Also copy directories
const dirsToCopy = ['assets', 'components'];
dirsToCopy.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
        copyFiles(dirPath, distDir);
    }
});

console.log('Build completed successfully!');