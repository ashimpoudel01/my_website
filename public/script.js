// ===== GLOBAL VARIABLES =====
let currentSection = 'home';
const typedTexts = [
    'Programmer',
    'Full stack Developer',
    'Tech Enthusiast', 
    'Problem Solver',
    'Creative Thinker'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all components
    initializeNavigation();
    initializeHero();
    initializeTypingAnimation();
    initializeParticles();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeContactForm();
    initializeScrollProgress();
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNavLink(id);
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    currentSection = sectionId;
}

// ===== HERO SECTION =====
function initializeHero() {
     const heroElements = [
        '.hero-text h1',
        '.typing-container', 
        '.hero-text p',
        '.hero-buttons',
        '.hero-image img'
    ];
    
    heroElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
    });

    // Only run GSAP animations if GSAP is available
    if (typeof gsap !== 'undefined') {
        try {
            // GSAP animations for hero section
            const tl = gsap.timeline();
            
            tl.from('.hero-text h1', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power2.out'
            })
            .from('.typing-container', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.5')
            .from('.hero-text p', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.4')
            .from('.hero-buttons .btn', {
                duration: 0.6,
                y: 30,
                opacity: 0,
                stagger: 0.2,
                ease: 'power2.out'
            }, '-=0.3')
            .from('.hero-image img', {
                duration: 1,
                scale: 0.8,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.8');
        } catch (error) {
            console.warn('GSAP animation failed, elements will remain visible:', error);
        }
    } else {
        console.warn('GSAP not loaded, elements will remain visible without animations');
    }
}

// ===== TYPING ANIMATION =====
function initializeTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    
    function typeText() {
        const currentText = typedTexts[textIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            // Typing
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeText, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeText, 50);
        } else if (!isDeleting && charIndex === currentText.length) {
            // Pause before deleting
            setTimeout(() => {
                isDeleting = true;
                typeText();
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % typedTexts.length;
            setTimeout(typeText, 500);
        }
    }
    
    typeText();
}

// ===== PARTICLES ANIMATION =====
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    container.appendChild(particle);
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Parallax effect for hero section
    gsap.to('.hero-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== COUNTERS ANIMATION =====
function initializeCounters() {
    const counters = [
        { element: document.getElementById('projects-count'), target: 10 },
        { element: document.getElementById('experience-years'), target: 1 },
        { element: document.getElementById('happy-clients'), target: 5}
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = counters.find(c => c.element === entry.target);
                if (counter) {
                    animateCounter(counter.element, counter.target);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        if (counter.element) {
            observer.observe(counter.element);
        }
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');
    const loadingSpinner = document.getElementById('loading-spinner');
    const btnText = form.querySelector('.btn-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            loadingSpinner.style.display = 'block';
            btnText.textContent = 'Sending...';
            
            try {
                console.log('Attempting to send form data...');
                // Send form data to your Node.js server
                await submitFormToServer();
                
                console.log('Form submitted successfully!');
                // Hide loading state
                loadingSpinner.style.display = 'none';
                btnText.textContent = 'Send Message';
                
                // Show success modal
                modal.style.display = 'block';
                
                // Clear form
                form.reset();
                clearFormErrors();
            } catch (error) {
                console.error('Detailed form submission error:', error);
                
                // Hide loading state
                loadingSpinner.style.display = 'none';
                btnText.textContent = 'Send Message';
                
                // Show more detailed error message
                let errorMessage = 'Failed to send message. ';
                
                if (error.message.includes('Failed to fetch')) {
                    errorMessage += 'Cannot connect to server. Make sure your Node.js server is running on port 3000.';
                } else if (error.message.includes('CORS')) {
                    errorMessage += 'CORS error - server configuration issue.';
                } else {
                    errorMessage += `Error: ${error.message}. Please try again or contact me directly via email.`;
                }
                
                alert(errorMessage);
            }
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

async function submitFormToServer() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    console.log('Sending form data:', formData);

    try {
        // Updated to match your Vercel serverless function endpoint
        const response = await fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Server response:', result);
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

function validateForm() {
    const fields = ['name', 'email', 'subject', 'message'];
    let isValid = true;
    
    clearFormErrors();
    
    fields.forEach(field => {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}-error`);
        
        if (!input.value.trim()) {
            showFieldError(input, errorElement, `${capitalizeFirst(field)} is required`);
            isValid = false;
        } else if (field === 'email' && !isValidEmail(input.value)) {
            showFieldError(input, errorElement, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearFormErrors() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    const errors = document.querySelectorAll('.error-message');
    
    inputs.forEach(input => input.classList.remove('error'));
    errors.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== SCROLL PROGRESS =====
function initializeScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== RESUME DOWNLOAD =====
document.getElementById('resume-btn').addEventListener('click', (e) => {
    e.preventDefault();
    
    // EDIT: Replace with your actual resume file
    const link = document.createElement('a');
    link.href = 'My_resume.pdf';
    link.download = 'Ashim_Poudel_Resume.pdf';
    link.click();
    
    // For now, show an alert
    // alert('Resume download functionality - Please add your actual resume file path in script.js');
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events here if needed
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Close modal if open
        const modal = document.getElementById('success-modal');
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    }
});

// Focus management for modal
const modal = document.getElementById('success-modal');
const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition', 'none');
    
    // Disable AOS animations
    AOS.init({
        disable: true
    });
}

console.log('🚀 Personal Portfolio Website Loaded Successfully!');
console.log('📝 Don\'t forget to customize the content in the HTML file');
console.log('🎨 Built with HTML, CSS, JavaScript, GSAP & AOS');