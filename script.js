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

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll for Anchor Links =====
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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.project-card, .vibe-card, .section-header').forEach(el => {
    observer.observe(el);
});

// ===== Vinyl Hover Pause =====
const vinyl = document.querySelector('.vinyl');
const vinylContainer = document.querySelector('.vinyl-container');

vinylContainer?.addEventListener('mouseenter', () => {
    vinyl.style.animationPlayState = 'paused';
});

vinylContainer?.addEventListener('mouseleave', () => {
    vinyl.style.animationPlayState = 'running';
});

// ===== Easter Egg =====
console.log('%c☀️ 13 Months of Sunshine', 'font-size: 24px; font-weight: bold;');
console.log('%cWelcome to Aaron\'s portfolio!', 'font-size: 14px;');
console.log('%cBuilding at the intersection of economics, tech, and culture.', 'font-size: 14px; color: #078930;');
