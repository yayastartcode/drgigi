document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--dark);
        padding: 0.5rem;
    `;

    const navbar = document.querySelector('.navbar');
    navbar.insertBefore(hamburger, navLinks);

    // Add media query for hamburger menu
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMobileMenu(e) {
        hamburger.style.display = e.matches ? 'block' : 'none';
    }
    mediaQuery.addListener(handleMobileMenu);
    handleMobileMenu(mediaQuery);

    // Toggle menu
    hamburger.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
        hamburger.innerHTML = navLinks.style.display === 'block' ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && navLinks.style.display === 'block') {
            navLinks.style.display = 'none';
            hamburger.innerHTML = '☰';
        }
    });
});