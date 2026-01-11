// ============================================
// DEVELOPER KERNEL OS - JAVASCRIPT ENGINE
// ============================================

// === SYSTEM INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initializeKernelSystem();
});

function initializeKernelSystem() {
    // Initialize navigation
    setupNavigation();
    
    // Initialize form handling
    setupContactForm();
    
    // Initialize animations
    triggerMetricsAnimation();
    
    // Initialize scroll tracking
    setupScrollTracking();
}

// === NAVIGATION SYSTEM ===
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.viewport-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            navigateToSection(sectionId, navLinks, sections);
        });
    });

    // Set initial active section
    if (sections.length > 0) {
        sections[0].classList.add('active');
        navLinks[0].classList.add('active');
    }
}

function navigateToSection(sectionId, navLinks, sections) {
    // Deactivate all sections and nav links
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    // Activate target section and nav link (be specific with selectors)
    const targetSection = document.querySelector(`.viewport-section[data-section="${sectionId}"]`);
    const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);

    if (targetSection) {
        targetSection.classList.add('active');
    }

    if (targetLink) {
        targetLink.classList.add('active');
    }
}

// === SCROLL TRACKING ===
function setupScrollTracking() {
    const sections = document.querySelectorAll('.viewport-section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('data-section');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
}

// === METRICS ANIMATION ===
function triggerMetricsAnimation() {
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.metric-fill, .level-bar');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    
                    // Trigger animation
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });

                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.metrics-grid, .skill-nodes').forEach(element => {
        metricsObserver.observe(element);
    });
}

// === CONTACT FORM HANDLING ===
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Simulate sending (replace with actual backend endpoint)
        try {
            // Display success message
            displayFormMessage('Message transmission initiated successfully. Response expected within 24 hours.', 'success');
            
            // Reset form
            form.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.innerHTML = '';
                formMessage.classList.remove('success', 'error');
            }, 5000);

        } catch (error) {
            displayFormMessage('Transmission failed. Please try again or contact directly.', 'error');
        }
    });
}

function displayFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', (e) => {
    // Number keys 1-5 for quick navigation
    const navMap = {
        '1': 'system',
        '2': 'projects',
        '3': 'skills',
        '4': 'experience',
        '5': 'contact'
    };

    if (navMap[e.key]) {
        const link = document.querySelector(`[data-section="${navMap[e.key]}"]`);
        if (link) link.click();
    }

    // Escape key to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// === SMOOTH SCROLL SECTIONS ===
function smoothScrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// === PERFORMANCE OPTIMIZATION ===
// Debounce scroll events for better performance
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// === THEME DETECTION ===
function detectSystemTheme() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return darkModeQuery.matches ? 'dark' : 'light';
}

// === ACCESSIBILITY ENHANCEMENTS ===
document.addEventListener('keydown', (e) => {
    // Tab navigation through interactive elements
    if (e.key === 'Tab') {
        // Allow default tab behavior
    }
});

// === EXTERNAL LINK HANDLING ===
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// === BOOT SEQUENCE CONFIGURATION ===
window.addEventListener('load', () => {
    // Boot sequence already handled by CSS animations
    // This ensures smooth transition from boot to main interface
    const bootSequence = document.getElementById('bootSequence');
    
    // Optional: Remove boot sequence from DOM after animation
    setTimeout(() => {
        if (bootSequence && bootSequence.parentElement) {
            bootSequence.addEventListener('animationend', () => {
                bootSequence.style.pointerEvents = 'none';
            }, { once: true });
        }
    }, 4000);
});

// === INTERSECTION OBSERVER FOR LAZY EFFECTS ===
const options = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, options);

// Observe executable modules for staggered animation
document.querySelectorAll('.executable-module').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
    observer.observe(el);
});

// === COMMAND PALETTE SIMULATION (Optional Enhancement) ===
let commandPaletteOpen = false;

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for command palette (optional feature for future extension)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Could implement a command palette here
    }
});

// === ANALYTICS & TRACKING (Optional) ===
// Track section views
function trackSectionView(sectionId) {
    if (window.gtag) {
        window.gtag('event', 'section_view', {
            'section': sectionId,
            'timestamp': new Date().toISOString()
        });
    }
}

// === UTILITY FUNCTIONS ===
function getSystemTime() {
    return new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary success feedback
        console.log('Copied to clipboard:', text);
    }).catch(() => {
        console.error('Failed to copy to clipboard');
    });
}

// === RESPONSIVE DESIGN HANDLING ===
const mobileMenuToggle = () => {
    const nav = document.querySelector('.system-nav');
    if (window.innerWidth <= 1024) {
        nav.style.position = 'relative';
    }
};

window.addEventListener('resize', debounce(mobileMenuToggle, 300));
mobileMenuToggle();

// === EXPORT FOR TESTING (if needed) ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToSection,
        displayFormMessage,
        smoothScrollToSection,
        trackSectionView
    };
}
