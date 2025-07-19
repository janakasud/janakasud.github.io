fetch('link-budget-fundamentals.md')
  .then(res => res.text())
  .then(md => {
    const html = marked.parse(md);
    document.getElementById('content').innerHTML = html;
    MathJax.typeset();
  });
