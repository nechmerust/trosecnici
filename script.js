[file name]: script.js
[file content begin]
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Zabraňuje scrollování při otevřeném menu
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }));
    }

    // --- 2. Active Link Highlighting (vylepšené) ---
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        // Odebere "active" třídu ze všech odkazů
        link.classList.remove('active');
        
        // Přidá "active" třídu na aktuální stránku
        if (linkHref === currentFile) {
            link.classList.add('active');
        }
        
        // Speciální případ pro index.html
        if ((currentFile === '' || currentFile === 'index.html') && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });

    // --- 3. Language Switcher Logic (vylepšené) ---
    const langBtn = document.getElementById('lang-toggle');
    const langText = document.querySelector('.lang-text');
    let currentLang = localStorage.getItem('csop_lang') || 'cs';

    function updateContent(lang) {
        console.log(`Changing language to: ${lang}`);
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-cs], [data-en]').forEach(element => {
            const csText = element.getAttribute('data-cs');
            const enText = element.getAttribute('data-en');
            
            if (csText && enText) {
                element.textContent = lang === 'cs' ? csText : enText;
            }
        });

        // Update HTML lang attribute (důležité pro přístupnost)
        document.documentElement.lang = lang;

        // Update Button Text
        if (langText) {
            langText.textContent = lang.toUpperCase();
        }

        // Update page title if it has translation
        const titleCs = document.title;
        const titleElement = document.querySelector('title');
        if (titleElement.getAttribute('data-cs') && titleElement.getAttribute('data-en')) {
            document.title = lang === 'cs' 
                ? titleElement.getAttribute('data-cs') 
                : titleElement.getAttribute('data-en');
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
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }

    // --- 5. Formátování čísel a datumů podle jazyka ---
    function formatNumber(number, lang) {
        return lang === 'cs' 
            ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") 
            : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // --- 6. Zvýraznění polí při interakci (přístupnost) ---
    document.querySelectorAll('.btn, .nav-link').forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #16a34a';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
        });
    });
});
[file content end]
