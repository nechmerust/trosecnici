// Language Toggle Functionality
let currentLanguage = 'cs';

// Translation data
const translations = {
    cs: {
        // Navigation
        'nav-home': 'Úvod',
        'nav-about': 'O nás',
        'nav-locations': 'Lokality, biocentra',
        'nav-projects': 'Projekty',
        'nav-karel': 'O Karlu Málkovi',
        'nav-letter': 'Charlieho dopis',
        'nav-contact': 'Kontakt',
        'lang-text': 'CS'
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About Us',
        'nav-locations': 'Locations, Biocenters',
        'nav-projects': 'Projects',
        'nav-karel': 'About Karel Málek',
        'nav-letter': "Charlie's Letter",
        'nav-contact': 'Contact',
        'lang-text': 'EN'
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded'); // Debug log
    
    // Set initial language
    updateLanguage();
    
    // Add smooth scrolling to all internal links
    addSmoothScrolling();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Add form validation if contact form exists
    initializeContactForm();
    
    // Alternative mobile menu initialization (fallback)
    setTimeout(function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn && !mobileMenuBtn.hasAttribute('data-initialized')) {
            console.log('Fallback mobile menu initialization'); // Debug log
            mobileMenuBtn.setAttribute('data-initialized', 'true');
            mobileMenuBtn.onclick = function(e) {
                e.preventDefault();
                toggleMobileMenu();
                return false;
            };
        }
    }, 100);
});

// Language toggle function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'cs' ? 'en' : 'cs';
    updateLanguage();
}

// Update all text elements based on current language
function updateLanguage() {
    // Update language toggle buttons
    const langTexts = document.querySelectorAll('#lang-text, #mobile-lang-text');
    langTexts.forEach(element => {
        element.textContent = currentLanguage.toUpperCase();
    });
    
    // Update all elements with data attributes
    const elementsWithTranslations = document.querySelectorAll('[data-cs], [data-en]');
    elementsWithTranslations.forEach(element => {
        const csText = element.getAttribute('data-cs');
        const enText = element.getAttribute('data-en');
        
        if (currentLanguage === 'cs' && csText) {
            element.textContent = csText;
        } else if (currentLanguage === 'en' && enText) {
            element.textContent = enText;
        }
    });
    
    // Update placeholder text for form elements
    const placeholderElements = document.querySelectorAll('[data-cs-placeholder], [data-en-placeholder]');
    placeholderElements.forEach(element => {
        const csPlaceholder = element.getAttribute('data-cs-placeholder');
        const enPlaceholder = element.getAttribute('data-en-placeholder');
        
        if (currentLanguage === 'cs' && csPlaceholder) {
            element.placeholder = csPlaceholder;
        } else if (currentLanguage === 'en' && enPlaceholder) {
            element.placeholder = enPlaceholder;
        }
    });
    
    // Store language preference
    localStorage.setItem('preferred-language', currentLanguage);
}

// Mobile menu functionality
function toggleMobileMenu() {
    console.log('toggleMobileMenu called'); // Debug log
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    console.log('navMenu:', navMenu); // Debug log
    console.log('menuIcon:', menuIcon); // Debug log
    
    if (navMenu && menuIcon) {
        navMenu.classList.toggle('active');
        console.log('Menu toggled, active:', navMenu.classList.contains('active')); // Debug log
        
        // Toggle menu icon
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    } else {
        console.log('navMenu or menuIcon not found'); // Debug log
    }
}

// Initialize mobile menu
function initializeMobileMenu() {
    console.log('Initializing mobile menu'); // Debug log
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    console.log('Mobile menu button:', mobileMenuBtn); // Debug log
    
    if (mobileMenuBtn) {
        // Remove any existing event listeners
        mobileMenuBtn.removeEventListener('click', toggleMobileMenu);
        // Add new event listener
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        console.log('Mobile menu button event listener added'); // Debug log
    } else {
        console.log('Mobile menu button not found'); // Debug log
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('nav-menu');
            const menuIcon = document.getElementById('menu-icon');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navContainer = document.querySelector('.nav-container');
        
        if (navMenu && navMenu.classList.contains('active') && 
            !navContainer.contains(e.target)) {
            const menuIcon = document.getElementById('menu-icon');
            navMenu.classList.remove('active');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });
}

// Add smooth scrolling to internal links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize contact form validation
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    
    // Add real-time validation
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', clearValidationError);
    }
    
    if (nameInput) {
        nameInput.addEventListener('blur', validateName);
        nameInput.addEventListener('input', clearValidationError);
    }
    
    if (messageTextarea) {
        messageTextarea.addEventListener('blur', validateMessage);
        messageTextarea.addEventListener('input', clearValidationError);
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Create mailto link with form data
            const formData = new FormData(contactForm);
            const subject = encodeURIComponent(`ČSOP Trosečníci - ${formData.get('subject')}`);
            const body = encodeURIComponent(
                `Jméno: ${formData.get('name')}\n` +
                `Email: ${formData.get('email')}\n` +
                `Telefon: ${formData.get('phone') || 'Neuvedeno'}\n` +
                `Předmět: ${formData.get('subject')}\n\n` +
                `Zpráva:\n${formData.get('message')}`
            );
            
            const mailtoLink = `mailto:csoptrosecnici@seznam.cz?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        }
    });
}

// Form validation functions
function validateEmail() {
    const emailInput = document.getElementById('email');
    if (!emailInput) return true;
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showValidationError(emailInput, 'Email je povinný');
        return false;
    } else if (!emailRegex.test(email)) {
        showValidationError(emailInput, 'Zadejte platný email');
        return false;
    }
    
    return true;
}

function validateName() {
    const nameInput = document.getElementById('name');
    if (!nameInput) return true;
    
    const name = nameInput.value.trim();
    
    if (!name) {
        showValidationError(nameInput, 'Jméno je povinné');
        return false;
    } else if (name.length < 2) {
        showValidationError(nameInput, 'Jméno musí mít alespoň 2 znaky');
        return false;
    }
    
    return true;
}

function validateMessage() {
    const messageTextarea = document.getElementById('message');
    if (!messageTextarea) return true;
    
    const message = messageTextarea.value.trim();
    
    if (!message) {
        showValidationError(messageTextarea, 'Zpráva je povinná');
        return false;
    } else if (message.length < 10) {
        showValidationError(messageTextarea, 'Zpráva musí mít alespoň 10 znaků');
        return false;
    }
    
    return true;
}

function validateForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    const subjectSelect = document.getElementById('subject');
    let isSubjectValid = true;
    
    if (subjectSelect && !subjectSelect.value) {
        showValidationError(subjectSelect, 'Vyberte předmět');
        isSubjectValid = false;
    }
    
    return isNameValid && isEmailValid && isMessageValid && isSubjectValid;
}

function showValidationError(element, message) {
    clearValidationError(element);
    
    element.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    element.parentNode.appendChild(errorDiv);
}

function clearValidationError(element) {
    if (typeof element === 'object' && element.target) {
        element = element.target;
    }
    
    element.style.borderColor = '';
    
    const existingError = element.parentNode.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.feature-card, .location-card, .project-card, .achievement-card, .help-card, .service-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Delay animation initialization to ensure all elements are rendered
    setTimeout(initializeAnimations, 100);
});

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        currentLanguage = savedLanguage;
        updateLanguage();
    }
});

// Utility function to format numbers
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Add loading state to buttons
function addLoadingState(button, text = 'Načítání...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button if needed
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: linear-gradient(135deg, #16a34a, #059669);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
    `;
    
    scrollButton.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
});

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Odkaz byl zkopírován do schránky');
        }).catch(() => {
            alert('Nepodařilo se zkopírovat odkaz');
        });
    }
}

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Přeskočit na hlavní obsah';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1001;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id if it doesn't exist
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});

// Console welcome message
console.log(`
🌿 ČSOP Trosečníci
Vítejte na našich webových stránkách!
Děkujeme za zájem o ochranu přírody.

🌱 Welcome to ČSOP Trosečníci
Thank you for your interest in nature conservation.
`);
