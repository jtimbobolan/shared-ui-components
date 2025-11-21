const fs = require('fs');
const path = require('path');

// Read the compiled Tailwind CSS
const cssPath = path.join(__dirname, 'dist', 'styles.css');
const tsPath = path.join(__dirname, 'cw-navigation.ts');

if (!fs.existsSync(cssPath)) {
  console.error('Error: dist/styles.css not found. Run build:css first.');
  process.exit(1);
}

const css = fs.readFileSync(cssPath, 'utf8');
let tsContent = fs.readFileSync(tsPath, 'utf8');

// Escape backticks and backslashes in CSS
const escapedCSS = css
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\${/g, '\\${');

// Replace the placeholder with actual CSS
tsContent = tsContent.replace(
  'css`/* TAILWIND_PLACEHOLDER */`',
  `css\`${escapedCSS}\``
);

// Write to a temporary file for TypeScript compilation
const outputPath = path.join(__dirname, 'cw-navigation.compiled.ts');
fs.writeFileSync(outputPath, tsContent);

console.log('✅ Tailwind CSS injected into TypeScript component');
