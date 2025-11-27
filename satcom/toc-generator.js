/**
 * Generate a table of contents from markdown files in the current directory.
 * Hardcoded approach since GitHub Pages cannot enumerate directories.
 */

document.addEventListener('DOMContentLoaded', () => {
  const mdFiles = [
    '1. antenna_theory.md',
    '2. eirp.md',
    '3. losses.md',
    '4. link_equation.md',
    '5. power_flux_density.md',
    '6. carrier_to_noise_ratio.md',
    '7. gain_over_noise_temperature.md'
  ];

  const tocContainer = document.getElementById('toc-content');
  const articleContainer = document.getElementById('article-content');
  const scriptBase = new URL('.', document.currentScript?.src || window.location.href);

  if (!tocContainer || !articleContainer) {
    console.warn('Required containers not found', {
      toc: !!tocContainer,
      article: !!articleContainer
    });
    return;
  }

  let activeButton = null;

  function setActive(button) {
    if (activeButton) {
      activeButton.classList.remove('font-semibold', 'text-blue-800');
    }
    button.classList.add('font-semibold', 'text-blue-800');
    activeButton = button;
  }

  async function loadMarkdown(file) {
    if (typeof marked === 'undefined') {
      articleContainer.innerHTML = '<p class="text-red-600">Markdown renderer not available.</p>';
      return;
    }

    const fileUrl = new URL(file, scriptBase);
    articleContainer.innerHTML = `<p class="text-gray-600">Loading ${fileUrl.pathname}...</p>`;

    try {
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const md = await res.text();
      const html = marked.parse(md, { mangle: false, headerIds: true });
      articleContainer.innerHTML = html;

      if (window.MathJax && typeof window.MathJax.typeset === 'function') {
        window.MathJax.typeset();
      }
    } catch (err) {
      const isFileProtocol = window.location.protocol === 'file:';
      const hint = isFileProtocol
        ? 'Open this site via a local server (e.g. python -m http.server) to allow loading local files.'
        : 'Please try again later.';
      articleContainer.innerHTML = `<p class="text-red-600">Unable to load ${fileUrl.pathname}. ${hint}</p>`;
      console.error('Error loading markdown file', fileUrl.href, err);
    }
  }

  const ul = document.createElement('ul');
  ul.className = 'list-disc list-inside space-y-2';

  mdFiles.forEach((file, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    // Display name: remove "number. " prefix and ".md" extension
    button.textContent = file.replace(/^\d+\.\s+/, '').replace(/\.md$/, '');
    button.dataset.file = file;
    button.className = 'text-left text-blue-600 hover:underline focus:outline-none';
    button.addEventListener('click', () => {
      setActive(button);
      loadMarkdown(button.dataset.file);
    });

    li.appendChild(button);
    ul.appendChild(li);

    if (index === 0) {
      setActive(button);
    }
  });

  tocContainer.innerHTML = '';
  tocContainer.appendChild(ul);

  if (mdFiles.length) {
    loadMarkdown(mdFiles[0]);
  }
});
