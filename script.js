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

    // Lightbox functionality
    const lightboxLinks = document.querySelectorAll('.lightbox');
    let currentImageIndex = 0;

    // Create lightbox elements
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '×';
    
    const lightboxNav = document.createElement('div');
    lightboxNav.className = 'lightbox-nav';
    lightboxNav.innerHTML = `
        <span class="lightbox-prev">❮</span>
        <span class="lightbox-next">❯</span>
    `;

    // Append elements
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(closeButton);
    lightboxContent.appendChild(lightboxNav);
    lightboxOverlay.appendChild(lightboxContent);
    document.body.appendChild(lightboxOverlay);

    // Event listeners
    lightboxLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentImageIndex = index;
            showImage(link.href);
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    const prevButton = lightboxNav.querySelector('.lightbox-prev');
    const nextButton = lightboxNav.querySelector('.lightbox-next');

    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxOverlay.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    function showImage(src) {
        lightboxImage.src = src;
        lightboxOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxOverlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + lightboxLinks.length) % lightboxLinks.length;
        showImage(lightboxLinks[currentImageIndex].href);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % lightboxLinks.length;
        showImage(lightboxLinks[currentImageIndex].href);
    }
});