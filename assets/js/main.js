/**
 * Catalyst Creatives - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initLogoNavigation();
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
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
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
    
    // Handle scroll events for navbar
    window.addEventListener('scroll', function() {
        // Get hero section height to know when to transform navbar
        const heroHeight = heroSection ? heroSection.offsetHeight / 2 : 300;
        
        if (window.scrollY > heroHeight) {
            navbar.classList.add('scrolled');
            // Ensure proper focus/tab navigation when scrolled
            const logoImageLink = document.querySelector('.logo-image-link');
            if (logoImageLink) {
                logoImageLink.setAttribute('tabindex', '0');
            }
            
            const logoTextLink = document.querySelector('.logo-text a');
            if (logoTextLink) {
                logoTextLink.setAttribute('tabindex', '-1');
            }
        } else {
            navbar.classList.remove('scrolled');
            // Reset tabindex for accessibility
            const logoImageLink = document.querySelector('.logo-image-link');
            if (logoImageLink) {
                logoImageLink.setAttribute('tabindex', '-1');
            }
            
            const logoTextLink = document.querySelector('.logo-text a');
            if (logoTextLink) {
                logoTextLink.setAttribute('tabindex', '0');
            }
        }
        
        // Active menu based on scroll position
        updateActiveNavLink();
    });
    
    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        const scrollPosition = window.scrollY + 150; // Add offset for better accuracy
        
        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on initial load
    updateActiveNavLink();
    
    // Also update when clicking on navbar links
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
            
            // Scroll to the section
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                smoothScrollTo(targetPosition);
                
                // Update active link after scrolling
                setTimeout(updateActiveNavLink, 100);
            }
        });
    });
}

/**
 * Logo navigation to top of page
 */
function initLogoNavigation() {
    const logoImage = document.querySelector('.logo-image-link');
    const footerLogo = document.querySelector('.footer-logo a');
    
    if (logoImage) {
        logoImage.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo(0);
        });
    }
    
    if (footerLogo) {
        footerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo(0);
        });
    }
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
    
    // In case we want to clone items for seamless looping (optionalx` enhancement)
    const track = document.querySelector('.testimonial-track');
    if (track) {
        // Get all original items
        const items = track.querySelectorAll('.testimonial-item');
        
        // Ensure we have enough items visible at the edges of the carousel
        // This helps with the continuous effect
        if (items.length > 2) {
            // Clone the first two items and append to the end
            const firstItemClone = items[0].cloneNode(true)
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
 * Helper function for smooth scrolling
 * @param {number} targetPosition - Target scroll position
 * @param {number} duration - Animation duration in milliseconds
 */
function smoothScrollTo(targetPosition, duration = 100) {
    // Get current scroll position
    const startPosition = window.pageYOffset;
    // Calculate distance
    const distance = targetPosition - startPosition;
    // Start time
    const start = performance.now();
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const easing = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        window.scrollTo(0, startPosition + distance * easing);
        
        if (elapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}

/**
 * Scroll effects including smooth scrolling and reveal animations
 */
function initScrollEffects() {
    // Smooth scroll for anchor links with slower speed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Calculate target position with offset for navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                // Use the helper function
                smoothScrollTo(targetPosition);
            }
        });
    });

    // Add shadow to navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Fade up animation for sections using Intersection Observer
    const sections = document.querySelectorAll('section');
    
    // Observer options
    const observerOptions = {
        root: null, // viewport is used as the root
        rootMargin: '0px',
        threshold: 0.2 // Increased threshold for more stable triggering
    };
    
    // Define the observer
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in-up animation to the section with RAF for smoother animation
                requestAnimationFrame(() => {
                    entry.target.classList.add('fade-in-up');
                    entry.target.style.opacity = '1';
                
                    // Also reveal all animations within this section
                    const animatedElements = entry.target.querySelectorAll('.feature-card, .service-card, .portfolio-item, .testimonial-item, .about-content > div');
                    animatedElements.forEach((el, index) => {
                        // Reduced staggering delay to minimize jitter
                        setTimeout(() => {
                            el.classList.add('revealed');
                        }, index * 50); // Reduced delay between items
                    });
                
                    // Make section header content visible
                    const sectionHeader = entry.target.querySelector('.section-header');
                    if (sectionHeader) {
                        sectionHeader.classList.add('fade-in-up');
                        sectionHeader.style.opacity = '1';
                    
                        const headerElements = sectionHeader.querySelectorAll('h2, p, .section-subtitle');
                        headerElements.forEach((el, index) => {
                            // Use setTimeout instead of transitionDelay for more control
                            setTimeout(() => {
                                el.classList.add('fade-in-up');
                                el.style.opacity = '1';
                                el.style.visibility = 'visible';
                            }, index * 50); // Reduced delay 
                        });
                    }
                });
                
                // Unobserve the section after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Start observing each section
    sections.forEach(section => {
        // Set initial state (hidden) using transform3d for hardware acceleration
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px) translateZ(0)';
        section.style.transition = 'opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)';
        section.style.willChange = 'opacity, transform';
        
        // Observe the section
        sectionObserver.observe(section);
    });
    
    // Make the hero section immediately visible (no animation for first section)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0) translateZ(0)';
    }

    // Special handling for portfolio section to prevent flickering
    const portfolioSection = document.querySelector('.portfolio');
    const portfolioItems = portfolioSection?.querySelectorAll('.portfolio-item');
    
    if (portfolioSection && portfolioItems.length) {
        portfolioItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none'; // Removed translateY to prevent flickering
            item.style.willChange = 'opacity';
            item.style.visibility = 'visible';
        });

        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        const grid = entry.target.querySelector('.portfolio-grid');
                        if (grid) {
                            grid.style.opacity = '1';
                        }

                        portfolioItems.forEach((item, index) => {
                            item.style.transitionDelay = `${index * 0.05}s`;
                            item.style.transitionProperty = 'opacity';
                            item.style.transitionDuration = '0.4s';
                            item.style.transitionTimingFunction = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
                        });
                    });

                    portfolioObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        portfolioObserver.observe(portfolioSection);
    }
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
            // Use the helper function to scroll to top
            smoothScrollTo(0);
        });
    }
} 