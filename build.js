const fs = require('fs');
const path = require('path');

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

  // Fix internal page links: about.html -> ?page=about etc.
  html = html.replace(/href="(about|privacy|terms)\.html"/g, 'href="?page=$1"');

  fs.writeFileSync(path.join(distDir, distFile), html);
  console.log(`✓ Built ${distFile}`);
});

console.log('\nBuild complete! All pages inlined and ready for Apps Script deployment.');

