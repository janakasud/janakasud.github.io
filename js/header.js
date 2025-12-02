function generateHeader() {
  // Detect current path depth (e.g., ''=0, 'articles/'=1, 'articles/antenna/'=2)
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const depth = pathSegments.length;
  const upPath = '../'.repeat(Math.max(0, depth - 1)); // e.g., '' for root, '../' for sub, '../../' for deeper

  // Base paths adjusted by depth (root-relative where possible)
  const basePaths = {
    home: upPath + 'index.html',
    posts: upPath + 'posts/index.html',
    articles: (depth === 0 ? './articles/' : (pathSegments[0] === 'articles' ? '' : upPath + 'articles/')) + 'index.html',
    portfolio: upPath + 'portfolio/index.html',
    about: upPath + 'about.html'
  };

  // Detect active from path
  let activeKey = 'home';
  if (pathSegments.includes('posts')) activeKey = 'posts';
  else if (pathSegments.includes('articles')) activeKey = 'articles';
  else if (pathSegments.includes('portfolio')) activeKey = 'portfolio';
  else if (pathSegments[0] === 'about' || window.location.pathname.includes('about')) activeKey = 'about';

  // Nav items
  const navItems = [
    { key: 'home', label: 'Home', href: basePaths.home },
    { key: 'posts', label: 'Posts', href: basePaths.posts },
    { key: 'articles', label: 'Articles', href: basePaths.articles },
    { key: 'portfolio', label: 'Portfolio', href: basePaths.portfolio },
    { key: 'about', label: 'About', href: basePaths.about }
  ];

  // Desktop nav HTML
  const desktopNav = navItems.map(item => {
    const isActive = activeKey === item.key;
    const classes = isActive 
      ? 'text-gray-900 border-b-2 border-indigo-500 pb-1' 
      : 'text-gray-600 hover:text-gray-900';
    return `<a href="${item.href}" class="${classes}">${item.label}</a>`;
  }).join('');

  // Mobile nav HTML (adjust Articles href for local index if in articles/)
  const mobileArticlesHref = (pathSegments[0] === 'articles' && depth === 1) ? 'index.html' : basePaths.articles;
  const mobileNav = `
    <div class="px-4 py-3 space-y-1 text-sm">
      <a href="${basePaths.home}" class="block ${activeKey === 'home' ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'}">Home</a>
      <a href="${basePaths.posts}" class="block ${activeKey === 'posts' ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'}">Posts</a>
      <a href="${mobileArticlesHref}" class="block ${activeKey === 'articles' ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'}">Articles</a>
      <a href="${basePaths.portfolio}" class="block ${activeKey === 'portfolio' ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'}">Portfolio</a>
      <a href="${basePaths.about}" class="block ${activeKey === 'about' ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'}">About</a>
    </div>
  `;

  return `
    <header class="bg-white shadow-md sticky top-0 z-50 w-full">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        <a href="${basePaths.home}" class="flex items-center space-x-3 hover:opacity-75 transition-opacity duration-200">
          <!-- <img src="${upPath}images/logo_jj_v2_2025-11-27.png" alt="Janaka's Journal Logo" class="h-10 sm:h-12" /> -->
          <div class="hidden sm:block">
            <h1 class="text-lg sm:text-xl font-bold text-gray-800 tracking-wide">Janaka's Journal</h1>
          </div>
        </a>
        <nav class="hidden md:flex items-center space-x-4 text-sm font-medium">
          ${desktopNav}
        </nav>
        <div class="flex-1 flex justify-center md:hidden">
          <h2 class="text-base font-semibold text-gray-800">Janaka's Journal</h2>
        </div>
        <button id="navToggle" class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100" aria-expanded="false" aria-controls="mobile-menu">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <nav id="mobile-menu" class="md:hidden hidden border-t border-gray-200 bg-white">
        ${mobileNav}
      </nav>
    </header>
  `;
}

// Inject header
document.addEventListener('DOMContentLoaded', function() {
  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) {
    placeholder.innerHTML = generateHeader();
    initMobileMenu();
  }
});

// Mobile toggle function
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', isOpen);
      // Optional: Swap icon to X on open
      const svgPath = toggle.querySelector('path');
      svgPath.setAttribute('d', isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16');
    });
    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) menu.classList.add('hidden');
    });
  }
}