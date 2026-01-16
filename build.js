const fs = require('fs').promises;
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

const build = async () => {
  try {
    // Ensure dist directory exists
    await fs.mkdir(distDir, { recursive: true });

    // Read all source files
    const html = await fs.readFile(path.join(srcDir, 'index.html'), 'utf-8');
    const css = await fs.readFile(path.join(srcDir, 'style.css'), 'utf-8');
    const js = await fs.readFile(path.join(srcDir, 'script.js'), 'utf-8');
    const data = await fs.readFile(path.join(srcDir, 'data.json'), 'utf-8');

    // Inject CSS into a style tag
    const finalHtml = html.replace(
      '<!-- CSS will be injected here -->',
      `<style>${css}</style>`
    );

    // Inject data and script into script tags
    const finalHtmlWithScript = finalHtml.replace(
      '<!-- Data and script will be injected here -->',
      `<script>window.talkData = ${data};</script>\n<script>${js}</script>`
    );

    // Write the final HTML to the dist directory
    await fs.writeFile(path.join(distDir, 'index.html'), finalHtmlWithScript);

    console.log('Build successful! Your website is ready in the "dist" folder.');

  } catch (error) {
    console.error('Build failed:', error);
  }
};

build();
