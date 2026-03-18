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

// Function to get Base64 representation of an image
function getBase64Image(fileName) {
  try {
    const filePath = path.join(srcDir, 'assets', fileName);
    if (fs.existsSync(filePath)) {
      const bitmap = fs.readFileSync(filePath);
      const ext = path.extname(fileName).substring(1);
      return `data:image/${ext};base64,${bitmap.toString('base64')}`;
    }
  } catch(e) {
    console.warn(`Could not encode ${fileName}: ${e.message}`);
  }
  return null;
}

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

// Replace all image references with Base64 data
finalHtml = finalHtml.replace(/(?:\.\/)?assets\/([a-zA-Z0-9_-]+\.(?:png|jpg|jpeg|svg|gif))/g, (match, fileName) => {
  const base64 = getBase64Image(fileName);
  return base64 || match;
});

// Write to dist folder
fs.writeFileSync(path.join(distDir, 'index.html'), finalHtml);
console.log('Build successful! Inlined style.css, script.js, and converted images to Base64.');
