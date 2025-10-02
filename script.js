// Global state
let currentLanguage = 'cs';
let currentPage = 'home';

// Translations object
const translations = {
    cs: {
        nav: {
            home: 'Úvod',
            about: 'O nás',
            locations: 'Lokality, biocentra',
            projects: 'Projekty',
            karel: 'O Karlu Málkovi',
            letter: 'Charlieho dopis',
            contact: 'Kontakt'
        }
    },
    en: {
        nav: {
            home: 'Introduction',
            about: 'About Us',
            locations: 'Locations, Biocenters',
            projects: 'Projects',
            karel: 'About Karel Málek',
            letter: "Charlie's Letter",
            contact: 'Contact'
        }
    }
};

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const menuIcon = document.getElementById('menu-icon');
const langToggle = document.getElementById('lang-toggle');
const mobileLangToggle = document.getElementById('mobile-lang-toggle');
const langText = document.getElementById('lang-text');
const mobileLangText = document.getElementById('mobile-lang-text');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLanguageToggle();
    initializeMobileMenu();
    updateLanguage();
    showPage('home');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Show specific page
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update navigation active state
        updateNavActiveState(pageId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Update navigation active state
function updateNavActiveState(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === activePageId) {
            link.classList.add('active');
        }
    });
}

// Language toggle functionality
function initializeLanguageToggle() {
    langToggle.addEventListener('click', toggleLanguage);
    mobileLangToggle.addEventListener('click', toggleLanguage);
}

// Toggle language between Czech and English
function toggleLanguage() {
    currentLanguage = currentLanguage === 'cs' ? 'en' : 'cs';
    updateLanguage();
}

// Update all text content based on current language
function updateLanguage() {
    // Update language toggle buttons
    langText.textContent = currentLanguage.toUpperCase();
    mobileLangText.textContent = currentLanguage.toUpperCase();
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        if (translations[currentLanguage].nav[page]) {
            link.textContent = translations[currentLanguage].nav[page];
        }
    });
    
    // Update all elements with data attributes
    const elementsWithTranslations = document.querySelectorAll('[data-cs][data-en]');
    elementsWithTranslations.forEach(element => {
        const text = element.getAttribute('data-' + currentLanguage);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Close mobile menu on window resize if screen becomes large
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    
    // Update menu icon
    if (navMenu.classList.contains('active')) {
        menuIcon.className = 'fas fa-times';
    } else {
        menuIcon.className = 'fas fa-bars';
    }
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add loading animation
function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-leaf fa-spin"></i>
            <p>Načítání...</p>
        </div>
    `;
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const spinner = loadingOverlay.querySelector('.loading-spinner');
    spinner.style.cssText = `
        text-align: center;
        color: #166534;
    `;
    
    const icon = spinner.querySelector('i');
    icon.style.cssText = `
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
        color: #16a34a;
    `;
    
    const text = spinner.querySelector('p');
    text.style.cssText = `
        font-size: 1.125rem;
        font-weight: 500;
        margin: 0;
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Fade in
    setTimeout(() => {
        loadingOverlay.style.opacity = '1';
    }, 10);
    
    return loadingOverlay;
}

function hideLoading(overlay) {
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

// Add intersection observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .location-card, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAnimations, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Arrow keys for page navigation (when not in input fields)
    if (!e.target.matches('input, textarea, select')) {
        const pages = ['home', 'about', 'locations', 'projects', 'karel', 'letter', 'contact'];
        const currentIndex = pages.indexOf(currentPage);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            showPage(pages[currentIndex - 1]);
        } else if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
            e.preventDefault();
            showPage(pages[currentIndex + 1]);
        }
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        const pages = ['home', 'about', 'locations', 'projects', 'karel', 'letter', 'contact'];
        const currentIndex = pages.indexOf(currentPage);
        
        if (swipeDistance > 0 && currentIndex > 0) {
            // Swipe right - go to previous page
            showPage(pages[currentIndex - 1]);
        } else if (swipeDistance < 0 && currentIndex < pages.length - 1) {
            // Swipe left - go to next page
            showPage(pages[currentIndex + 1]);
        }
    }
}

// Add print styles support
function preparePrint() {
    // Show all pages for printing
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'block';
        page.style.pageBreakAfter = 'always';
    });
}

function restoreAfterPrint() {
    // Restore normal page display
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = '';
        page.style.pageBreakAfter = '';
    });
    
    // Show current page
    showPage(currentPage);
}

window.addEventListener('beforeprint', preparePrint);
window.addEventListener('afterprint', restoreAfterPrint);

// Add error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Export functions for global access
window.showPage = showPage;
window.toggleLanguage = toggleLanguage;
window.toggleMobileMenu = toggleMobileMenu;
