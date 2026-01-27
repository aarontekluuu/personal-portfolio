// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
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

vinyl?.addEventListener('click', () => {
    vinyl.classList.toggle('paused');
    
    if (!vinyl.classList.contains('paused')) {
        // Change track when resuming
        currentTrack = (currentTrack + 1) % tracks.length;
        if (npTrack) {
            npTrack.style.opacity = '0';
            setTimeout(() => {
                npTrack.textContent = tracks[currentTrack];
                npTrack.style.opacity = '1';
            }, 200);
        }
    }
});

// Add smooth transition to track text
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
            // Once visible, stop observing
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
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
});

// ===== Project Card Interactions =====
document.querySelectorAll('.month-card:not(.month-future)').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle sound effect simulation via vibration on mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(5);
        }
    });
});

// ===== Navbar Active State on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.style.color = '';
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.style.color = 'var(--black)';
                }
            });
        }
    });
});

// ===== Easter Eggs =====
console.log('%c☀️ 13 Months of Sunshine', 'font-size: 28px; font-weight: bold; color: #FCDD09; text-shadow: 2px 2px 0 #078930;');
console.log('%cWelcome to Aaron\'s world!', 'font-size: 16px; font-weight: bold;');
console.log('%c🇪🇹 Ethiopian roots, building the future.', 'font-size: 14px; color: #078930;');

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
    document.body.style.filter = 'hue-rotate(0deg)';
    
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

// ===== Page Load Animation =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// ===== Handle reduced motion preference =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition', '0s');
    
    if (vinyl) {
        vinyl.style.animation = 'none';
        const labelInner = document.querySelector('.label-inner');
        if (labelInner) labelInner.style.animation = 'none';
    }
    
    document.querySelectorAll('.mura-flower').forEach(flower => {
        flower.style.animation = 'none';
    });
}
