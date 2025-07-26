// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('#navMenu a');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#navMenu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNav);

    // Header background on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    const animatedElements = document.querySelectorAll('.card, .case-study-card, .work-step, .desc-item, .testimonial');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('#hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Contact form validation (if you add a form later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add hover effects for better interactivity
    const cards = document.querySelectorAll('.card, .case-study-card, .work-step, .desc-item, .testimonial');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Performance optimization: Throttle scroll events
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

    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(function() {
        updateActiveNav();
    }, 100);

    window.addEventListener('scroll', throttledScrollHandler);

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    });

    // Add touch support for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could be used for navigation
                console.log('Swipe up detected');
            } else {
                // Swipe down - could be used for navigation
                console.log('Swipe down detected');
            }
        }
    }

    // Add accessibility improvements
    document.querySelectorAll('a, button').forEach(element => {
        if (!element.hasAttribute('aria-label')) {
            const text = element.textContent.trim();
            if (text) {
                element.setAttribute('aria-label', text);
            }
        }
    });

    // Add focus management for mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            // Focus first menu item when menu opens
            const firstLink = navMenu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });

    // Add loading states for better UX
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });

    // Testimonials horizontal scroll functionality
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (testimonialsContainer && scrollIndicator) {
        // Hide scroll indicator when at the end
        function updateScrollIndicator() {
            const isAtEnd = testimonialsContainer.scrollLeft + testimonialsContainer.clientWidth >= testimonialsContainer.scrollWidth - 10;
            scrollIndicator.style.display = isAtEnd ? 'none' : 'flex';
        }
        
        // Update indicator on scroll
        testimonialsContainer.addEventListener('scroll', updateScrollIndicator);
        
        // Initial check
        updateScrollIndicator();
        
        // Add scroll snap for better UX
        testimonialsContainer.style.scrollSnapType = 'x mandatory';
        
        // Add scroll snap to individual testimonials
        const testimonials = testimonialsContainer.querySelectorAll('.testimonial');
        testimonials.forEach(testimonial => {
            testimonial.style.scrollSnapAlign = 'start';
        });
        
        // Add keyboard navigation for testimonials
        testimonialsContainer.addEventListener('keydown', function(e) {
            const cardWidth = testimonialsContainer.querySelector('.testimonial').offsetWidth + 32; // 32px for gap
            if (e.key === 'ArrowLeft') {
                testimonialsContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                testimonialsContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        });
        
        // Add touch/swipe support for testimonials
        let startX = 0;
        let scrollLeft = 0;
        
        testimonialsContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX - testimonialsContainer.offsetLeft;
            scrollLeft = testimonialsContainer.scrollLeft;
        });
        
        testimonialsContainer.addEventListener('touchmove', function(e) {
            if (!startX) return;
            const x = e.touches[0].pageX - testimonialsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsContainer.scrollLeft = scrollLeft - walk;
        });
        
        testimonialsContainer.addEventListener('touchend', function() {
            startX = 0;
        });
    }

    // Full Screen Image Viewer functionality
    const imageViewer = document.getElementById('imageViewer');
    const fullScreenImage = document.getElementById('fullScreenImage');
    const closeImageViewer = document.getElementById('closeImageViewer');
    const expandableImages = document.querySelectorAll('.expandable-image');
    
    // Open image viewer when clicking on expandable images
    expandableImages.forEach(img => {
        img.addEventListener('click', function() {
            fullScreenImage.src = this.src;
            fullScreenImage.alt = this.alt;
            imageViewer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close image viewer when clicking close button
    closeImageViewer.addEventListener('click', function() {
        imageViewer.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close image viewer when clicking outside the image
    imageViewer.addEventListener('click', function(e) {
        if (e.target === imageViewer) {
            imageViewer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close image viewer with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageViewer.classList.contains('active')) {
            imageViewer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    console.log('Portfolio website loaded successfully!');
});
