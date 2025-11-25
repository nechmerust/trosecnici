document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // 2. Language Switcher (CS/EN)
    const langBtn = document.getElementById('lang-toggle');
    const langText = document.querySelector('.lang-text');
    let currentLang = localStorage.getItem('csop_lang') || 'cs';

    function updateLanguage() {
        // Update elements with data-cs/data-en attributes
        document.querySelectorAll('[data-cs]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });

        // Update button text
        if (langText) {
            langText.textContent = currentLang.toUpperCase();
        }

        // Save preference
        localStorage.setItem('csop_lang', currentLang);
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'cs' ? 'en' : 'cs';
            updateLanguage();
        });
    }

    // Initialize language on load
    updateLanguage();

    // 3. Highlight Active Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});
