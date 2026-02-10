// ========================================
// INNOVATE TECH SOLUTIONS - UNIFIED JAVASCRIPT
// ========================================

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Impact Counter Animation
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    // Check if the label contains '%' to determine suffix
    const label = element.nextElementSibling?.textContent || '';
    const isPercentage = label.includes('%');
    const suffix = isPercentage ? '%' : '+';

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (target >= 1000000) {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            } else if (target >= 100 && !isPercentage) {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            } else {
                element.textContent = current.toFixed(1) + suffix;
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (target >= 1000000) {
                element.textContent = target.toLocaleString() + suffix;
            } else if (target >= 100 && !isPercentage) {
                element.textContent = target.toLocaleString() + suffix;
            } else {
                element.textContent = target.toFixed(1) + suffix;
            }
        }
    };

    updateCounter();
}

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.impact-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Testimonials Carousel
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const carouselDots = document.querySelectorAll('.carousel-dot');

function showSlide(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });

    carouselDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
}

// Auto-advance testimonials every 5 seconds
if (testimonialCards.length > 0) {
    setInterval(nextSlide, 5000);
}

// Manual carousel control
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Form Validation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#FF6B00';
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            // Show success message
            alert('Message sent successfully! We will get back to you soon.');
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Dark Mode Toggle (Optional - can be enabled later)
// const darkModeToggle = document.querySelector('.dark-mode-toggle');
// if (darkModeToggle) {
//     darkModeToggle.addEventListener('click', () => {
//         document.body.classList.toggle('dark-mode');
//         localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
//     });
// }

// Load dark mode preference
// if (localStorage.getItem('darkMode') === 'true') {
//     document.body.classList.add('dark-mode');
// }

console.log('Innovate Tech Solutions - Website Loaded Successfully');

