document.addEventListener('DOMContentLoaded', () => {
  fetch('/satcom/link-budget-fundamentals.md')
    .then(res => {
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      return res.text();
    })
    .then(md => {
      const contentElement = document.getElementById('content');
      if (contentElement) {
        const html = marked.parse(md);
        contentElement.innerHTML = html;
        function typesetMathJax() {
          if (typeof MathJax !== 'undefined' && typeof MathJax.typeset === 'function') {
            MathJax.typeset();
          } else {
            setTimeout(typesetMathJax, 100); // Retry every 100ms
          }
        }
        typesetMathJax();
      } else {
        console.error('Element with ID "content" not found');
      }
    })
    .catch(err => console.error('Fetch error:', err));
});
