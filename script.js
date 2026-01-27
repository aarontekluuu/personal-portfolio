// ===== Loading Screen =====
const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    setTimeout(() => {
        loader?.classList.add('hidden');
        document.body.style.overflow = '';
    }, 1200);
});

// Prevent scroll during loading
document.body.style.overflow = 'hidden';

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// ===== Vinyl Record Play/Pause =====
const vinyl = document.querySelector('.vinyl');
const npTrack = document.querySelector('.np-track');

const tracks = [
    'The Future ✨',
    'Building Mode 🔨',
    'DeFi Dreams 🔗',
    'Ethiopian Vibes 🇪🇹',
    'Sunshine Hours ☀️'
];

let currentTrack = 0;

function toggleVinyl() {
    vinyl.classList.toggle('paused');
    
    if (!vinyl.classList.contains('paused')) {
        currentTrack = (currentTrack + 1) % tracks.length;
        if (npTrack) {
            npTrack.style.opacity = '0';
            setTimeout(() => {
                npTrack.textContent = tracks[currentTrack];
                npTrack.style.opacity = '1';
            }, 200);
        }
    }
}

vinyl?.addEventListener('click', toggleVinyl);
vinyl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleVinyl();
    }
});

if (npTrack) {
    npTrack.style.transition = 'opacity 0.2s ease';
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.month-card, .contact-card, .about-grid').forEach(el => {
    observer.observe(el);
});

// ===== Parallax for Flowers =====
let ticking = false;

function updateParallax() {
    const scrolled = window.scrollY;
    document.querySelectorAll('.mura-flower').forEach((flower, index) => {
        const speed = 0.05 + (index * 0.02);
        const yOffset = scrolled * speed;
        const rotation = scrolled * 0.02 * (index % 2 === 0 ? 1 : -1);
        flower.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
    });
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ===== Navbar Active State on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateNavActive() {
    const scrollY = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateNavActive, { passive: true });

// ===== Easter Eggs =====
console.log('%c☀️ 13 Months of Sunshine', 'font-size: 28px; font-weight: bold; color: #FCDD09; text-shadow: 2px 2px 0 #078930;');
console.log('%cWelcome to Aaron\'s portfolio!', 'font-size: 16px; font-weight: bold;');
console.log('%c🇪🇹 Ethiopian roots, building the future.', 'font-size: 14px; color: #078930;');
console.log('%c\nHint: Try the Konami Code! ↑↑↓↓←→←→BA', 'font-size: 12px; color: #999;');

// Konami Code
let konamiProgress = 0;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiProgress]) {
        konamiProgress++;
        if (konamiProgress === konamiCode.length) {
            activateRainbow();
            konamiProgress = 0;
        }
    } else {
        konamiProgress = 0;
    }
});

function activateRainbow() {
    console.log('%c🎉 You found the secret! 🇪🇹', 'font-size: 24px;');
    
    document.body.style.transition = 'filter 0.5s ease';
    
    let hue = 0;
    const rainbowInterval = setInterval(() => {
        hue += 5;
        document.body.style.filter = `hue-rotate(${hue}deg)`;
        
        if (hue >= 360) {
            clearInterval(rainbowInterval);
            document.body.style.filter = '';
        }
    }, 50);
}

// ===== Handle reduced motion preference =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition', '0.01s');
        
        if (vinyl) {
            vinyl.style.animation = 'none';
            vinyl.classList.add('paused');
            const labelInner = document.querySelector('.label-inner');
            if (labelInner) labelInner.style.animation = 'none';
        }
        
        document.querySelectorAll('.mura-flower').forEach(flower => {
            flower.style.animation = 'none';
        });
        
        const sunshineRays = document.querySelector('.sunshine-rays');
        if (sunshineRays) sunshineRays.style.animation = 'none';
        
        // Hide loader immediately
        loader?.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

handleReducedMotion();
prefersReducedMotion.addEventListener('change', handleReducedMotion);

// ===== Focus management for accessibility =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add skip link functionality
const mainContent = document.querySelector('main');
if (mainContent && !document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
}
