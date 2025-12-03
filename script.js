document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 2. Active Link Highlighting ---
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        
        if (linkHref === currentFile || (currentFile === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // --- 3. Language Switcher Logic ---
    const langBtn = document.getElementById('lang-toggle');
    const langText = document.querySelector('.lang-text');
    let currentLang = localStorage.getItem('csop_lang') || 'cs';

    function updateContent(lang) {
        document.querySelectorAll('[data-cs], [data-en]').forEach(element => {
            const csText = element.getAttribute('data-cs');
            const enText = element.getAttribute('data-en');
            
            if (csText && enText) {
                element.textContent = lang === 'cs' ? csText : enText;
            }
        });

        document.documentElement.lang = lang;
        if (langText) langText.textContent = lang.toUpperCase();
        localStorage.setItem('csop_lang', lang);
        currentLang = lang;
    }

    updateContent(currentLang);

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'cs' ? 'en' : 'cs';
            updateContent(newLang);
        });
    }

    // --- 4. Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
});
