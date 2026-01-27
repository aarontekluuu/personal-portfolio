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

// ===== Vinyl Record Interaction =====
const vinyl = document.querySelector('.vinyl');

vinyl?.addEventListener('click', () => {
    const isPaused = vinyl.style.animationPlayState === 'paused';
    vinyl.style.animationPlayState = isPaused ? 'running' : 'paused';
});

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

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.15,
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

// Apply initial styles and observe
document.querySelectorAll('.month-card, .about-grid, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stagger animation for month cards
document.querySelectorAll('.month-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Parallax for Flowers =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            document.querySelectorAll('.mura-flower').forEach((flower, index) => {
                const speed = 0.1 + (index * 0.05);
                flower.style.transform = `translateY(${scrolled * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// ===== Easter Eggs =====
console.log('%c☀️ 13 Months of Sunshine', 'font-size: 28px; font-weight: bold; color: #FCDD09; text-shadow: 2px 2px 0 #078930;');
console.log('%cWelcome to Aaron\'s world!', 'font-size: 16px; font-weight: bold;');
console.log('%cBuilding at the intersection of economics, technology, and culture.', 'font-size: 14px; color: #078930;');
console.log('%c🇪🇹', 'font-size: 40px;');

// Konami code easter egg
let konamiProgress = 0;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiProgress]) {
        konamiProgress++;
        if (konamiProgress === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            console.log('%c🎉 You found the secret! 🇪🇹', 'font-size: 24px;');
            konamiProgress = 0;
            
            // Add rainbow animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Remove after 5 seconds
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    } else {
        konamiProgress = 0;
    }
});
