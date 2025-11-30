/**
 * Generate a table of contents from markdown files and load the first one.
 * @param {string[]} mdFiles - An array of markdown file names.
 */
function generateTocAndLoadContent(mdFiles) {
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
        // ... (Your existing loadMarkdown function remains the same) ...
        // ... (It's a large function, keeping it concise here) ...

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
            const html = marked.parse(md, {
                mangle: false,
                headerIds: true,
                breaks: true // honor single line breaks from the markdown source
            });
            articleContainer.innerHTML = html;
            // Ensure MathJax processes the newly inserted content.
            try {
                if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
                    await window.MathJax.typesetPromise();
                } else if (window.MathJax && typeof window.MathJax.typeset === 'function') {
                    window.MathJax.typeset();
                } else if (window.MathJax) {
                    const waitFor = (ms, interval = 100) => new Promise((resolve) => {
                        const start = Date.now();
                        const timer = setInterval(() => {
                            if (typeof window.MathJax.typesetPromise === 'function' || typeof window.MathJax.typeset === 'function') {
                                clearInterval(timer);
                                resolve(true);
                            } else if (Date.now() - start > ms) {
                                clearInterval(timer);
                                resolve(false);
                            }
                        }, interval);
                    });
                    const ready = await waitFor(3000);
                    if (ready) {
                        if (typeof window.MathJax.typesetPromise === 'function') await window.MathJax.typesetPromise();
                        else if (typeof window.MathJax.typeset === 'function') window.MathJax.typeset();
                    }
                }
            } catch (mjErr) {
                console.warn('MathJax typeset failed', mjErr);
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
    
    // --- TOC Generation Logic ---
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
}

// // --- New Call Site ---
// document.addEventListener('DOMContentLoaded', () => {
//     // Define the file list here or fetch it from another source
//     const fileList = [
//         '1. antenna_theory.md',
//         '2. eirp.md',
//         '3. losses.md',
//         '4. link_equation.md',
//         '5. power_flux_density.md',
//         '6. carrier_to_noise_ratio.md',
//         '7. gain_over_noise_temperature.md'
//     ];

//     // Call the new function with the list of files
//     generateTocAndLoadContent(fileList);
// });