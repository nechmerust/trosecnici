document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // --- 2. Active Link Highlighting ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // --- 3. Language Switcher Logic ---
    const langBtn = document.getElementById('lang-toggle');
    const langText = document.querySelector('.lang-text');
    let currentLang = localStorage.getItem('csop_lang') || 'cs';

    function updateContent(lang) {
        // Update all elements with data attributes
        document.querySelectorAll(`[data-${lang}]`).forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update Button Text
        if (langText) {
            langText.textContent = lang.toUpperCase();
        }

        // Save preference
        localStorage.setItem('csop_lang', lang);
        currentLang = lang;
    }

    // Initialize Language
    updateContent(currentLang);

    // Toggle Button Click
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'cs' ? 'en' : 'cs';
            updateContent(newLang);
        });
    }

    // --- 4. Service Worker Registration (PWA) ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                }, err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
});
