/**
 * Catalyst Creatives - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initPortfolioFilter();
    initTestimonialSlider();
    initContactForm();
    initScrollEffects();
    initAnimations();
    initBackToTop();
});

/**
 * Mobile navbar toggle
 */
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    body.appendChild(overlay);
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
        
        // Close menu when clicking on links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }
    
    // Active menu based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Portfolio filtering
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 50);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.classList.add('show');
                            }, 50);
                        } else {
                            item.classList.remove('show');
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
}

/**
 * Testimonial slider
 */
function initTestimonialSlider() {
    // No JavaScript needed for the continuous carousel
    // It now runs on pure CSS animations
    
    // Make sure all testimonials are visible
    const testimonials = document.querySelectorAll('.testimonial-item');
    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '1';
        testimonial.style.visibility = 'visible';
    });
    
    // In case we want to clone items for seamless looping (optional enhancement)
    const track = document.querySelector('.testimonial-track');
    if (track) {
        // Get all original items
        const items = track.querySelectorAll('.testimonial-item');
        
        // Ensure we have enough items visible at the edges of the carousel
        // This helps with the continuous effect
        if (items.length > 2) {
            // Clone the first two items and append to the end
            const firstItemClone = items[0].cloneNode(true);
            const secondItemClone = items[1].cloneNode(true);
            
            // Add a class to identify clones (for debugging)
            firstItemClone.classList.add('cloned-item');
            secondItemClone.classList.add('cloned-item');
            
            // Append clones to the track
            track.appendChild(firstItemClone);
            track.appendChild(secondItemClone);
        }
    }
}

/**
 * Contact form
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Add focus effect on form fields
        const formFields = form.querySelectorAll('input, textarea, select');
        
        formFields.forEach(field => {
            // Set initial state
            if (field.value) {
                field.parentElement.classList.add('has-value');
            }
            
            // Focus event
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('focused');
            });
            
            // Blur event
            field.addEventListener('blur', () => {
                field.parentElement.classList.remove('focused');
                if (field.value) {
                    field.parentElement.classList.add('has-value');
                } else {
                    field.parentElement.classList.remove('has-value');
                }
            });
            
            // Input event
            field.addEventListener('input', () => {
                if (field.value) {
                    field.parentElement.classList.add('has-value');
                } else {
                    field.parentElement.classList.remove('has-value');
                }
            });
        });
        
        // Form submit
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.parentElement.classList.add('error');
                } else {
                    field.parentElement.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.parentElement.classList.add('error');
                    
                    // You may want to add a specific error message for email
                    if (!emailField.parentElement.querySelector('.error-message')) {
                        const errorMsg = document.createElement('span');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'Please enter a valid email address';
                        emailField.parentElement.appendChild(errorMsg);
                    }
                } else {
                    const errorMsg = emailField.parentElement.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            }
            
            if (isValid) {
                // Submit form - this is where you would send the data to your server
                // For this example, we'll just simulate a successful submission
                
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading-spinner"></span>Sending...';
                submitBtn.disabled = true;
                
                // Simulate server request
                setTimeout(() => {
                    // Hide form and show success message
                    form.innerHTML = `
                        <div class="form-success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                        </div>
                    `;
                }, 2000);
            }
        });
    }
}

/**
 * Scroll effects
 */
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80; // Adjust based on your fixed header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Make all reveal elements visible by default to fix the issue
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        el.classList.add('revealed');
    });
    
    // Make all section content visible
    document.querySelectorAll('.section-header p').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
    });
}

/**
 * General animations
 */
function initAnimations() {
    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Parallax effect on hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrollPosition * 0.002);
            }
        });
    }
    
    // Make sure all stats are visible initially
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        stat.style.opacity = '1';
        stat.style.visibility = 'visible';
        
        // Directly set the content to the target number
        const target = parseInt(stat.textContent);
        if (!isNaN(target)) {
            stat.textContent = target + (stat.textContent.replace(/[0-9]/g, '') || '');
        }
    });
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
} 