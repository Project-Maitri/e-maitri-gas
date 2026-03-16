const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Read source files
const htmlContent = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
const cssContent = fs.readFileSync(path.join(srcDir, 'style.css'), 'utf8');
const jsContent = fs.readFileSync(path.join(srcDir, 'script.js'), 'utf8');

// Inject CSS and JS into HTML
let finalHtml = htmlContent;

// Check if <link rel="stylesheet" href="style.css"> exists and replace it
finalHtml = finalHtml.replace(
  /<link\s+rel="stylesheet"\s+href="style\.css">/g,
  `<style>\n${cssContent}\n</style>`
);

// Check if <script src="script.js"></script> exists and replace it
finalHtml = finalHtml.replace(
  /<script\s+src="script\.js"><\/script>/g,
  `<script>\n${jsContent}\n</script>`
);

// Write to dist folder
fs.writeFileSync(path.join(distDir, 'index.html'), finalHtml);
console.log('Build successful! Inlined style.css and script.js into dist/index.html');
