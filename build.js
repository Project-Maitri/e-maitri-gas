const fs = require('fs');
const path = require('path');

// ⚠️ Google Apps Script deployment base URL
// Update this if the deployment URL ever changes.
const GAS_BASE_URL = 'https://script.google.com/macros/s/AKfycbz8n3JH3ijk1imgyBxMA87Uufb6FXcqsXoMSlc1MkX9jZhMjy5TtSI6KyNfAsGqmlHG/exec';

const srcDir = __dirname;
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Read shared source files
const cssContent = fs.readFileSync(path.join(srcDir, 'style.css'), 'utf8');
const jsContent = fs.readFileSync(path.join(srcDir, 'script.js'), 'utf8');

// Pages to build: [source file, dist output name]
const pages = [
  ['index.html',   'index.html'],
  ['about.html',   'about.html'],
  ['privacy.html', 'privacy.html'],
  ['terms.html',   'terms.html'],
  ['login.html',   'login.html'],
  ['register.html', 'register.html'],
];

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

// Process each page
pages.forEach(([srcFile, distFile]) => {
  const srcPath = path.join(srcDir, srcFile);
  if (!fs.existsSync(srcPath)) {
    console.warn(`Skipping ${srcFile} – file not found.`);
    return;
  }

  let html = fs.readFileSync(srcPath, 'utf8');

  // Inline style.css
  html = html.replace(
    /<link\s+rel="stylesheet"\s+href="style\.css">/g,
    `<style>\n${cssContent}\n</style>`
  );

  // Inline script.js (only present in index.html, safe to run on all)
  html = html.replace(
    /<script\s+src="script\.js"><\/script>/g,
    `<script>\n${jsContent}\n</script>`
  );

  // Replace asset image references with Base64 data
  html = html.replace(/(?:\.\/)?assets\/([a-zA-Z0-9_-]+\.(?:png|jpg|jpeg|svg|gif))/g, (match, fileName) => {
    const base64 = getBase64Image(fileName);
    return base64 || match;
  });

  // GAS iframe cross-origin navigation fix:
  // JS window.top.location is BLOCKED (cross-origin: googleusercontent.com vs script.google.com)
  // Solution: use native <a href target="_top"> — browsers allow this even cross-origin.

  // Forward links: about.html / privacy.html / terms.html / login.html -> full GAS URL with ?page=X
  html = html.replace(
    /href="(about|privacy|terms|login|register)\.html"/g,
    (_, page) => `href="${GAS_BASE_URL}?page=${page}" target="_top"`
  );

  // Back links to home: index.html / . -> GAS root exec URL
  html = html.replace(
    /href="(index\.html|\.|#)" onclick="[^"]*"/g,
    `href="${GAS_BASE_URL}" target="_top"`
  );
  // Also catch plain href="index.html" or href="." with no onclick
  html = html.replace(
    /href="(index\.html|\.)"/g,
    `href="${GAS_BASE_URL}" target="_top"`
  );

  fs.writeFileSync(path.join(distDir, distFile), html);
  console.log(`✓ Built ${distFile}`);
});

console.log('\nBuild complete! All pages inlined and ready for Apps Script deployment.');

