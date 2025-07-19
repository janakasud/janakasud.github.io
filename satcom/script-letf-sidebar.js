document.addEventListener('DOMContentLoaded', () => {
  const contentElement = document.getElementById('content');
  const tocElement = document.getElementById('toc');

  if (!contentElement || !tocElement) {
    console.error('Required elements not found:', {
      content: !!contentElement,
      toc: !!tocElement
    });
    return;
  }

  fetch('/satcom/antenna-theory.md')
    .then(res => {
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      return res.text();
    })
    .then(md => {
      const html = marked.parse(md, {
        mangle: false,
        headerIds: true,
        headerPrefix: 'section-'
      });
      contentElement.innerHTML = html;

      // Generate Table of Contents
      const headings = contentElement.querySelectorAll('h1, h2');
      headings.forEach((heading, index) => {
        const id = `section-${index + 1}`;
        heading.id = id;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        a.className = heading.tagName === 'H1' ? 'text-blue-600 hover:underline font-medium' : 'text-blue-600 hover:underline pl-4';
        li.appendChild(a);
        tocElement.appendChild(li);
      });

      // Render MathJax equations
      function typesetMathJax() {
        if (typeof MathJax !== 'undefined' && typeof MathJax.typeset === 'function') {
          MathJax.typeset();
        } else {
          setTimeout(typesetMathJax, 100);
        }
      }
      typesetMathJax();
    })
    .catch(err => console.error('Fetch error:', err));
});
