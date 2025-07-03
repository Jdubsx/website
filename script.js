// ==============================================
// NAVIGATION
// ==============================================

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile nav when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectTiles = document.querySelectorAll('.project-tile');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            
            // Filter projects
            projectTiles.forEach(function(tile) {
                const category = tile.dataset.category;
                if (filter === 'all' || category === filter) {
                    tile.style.display = 'block';
                } else {
                    tile.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.nav');

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Add entrance animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(function() {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // Load Kaito Yaps statistics
    loadKaitoYaps();
});

// Kaito Yaps API Integration
function loadKaitoYaps() {
    const yapsGrid = document.getElementById('yaps-grid');
    const username = 'Jdubsx_'; // Your X username
    
    // Use a CORS proxy to access the Kaito API
    const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.kaito.ai/api/v1/yaps?username=${username}`)}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch Yaps data');
            }
            return response.json();
        })
        .then(proxyData => {
            // AllOrigins wraps the response in a 'contents' field
            const data = JSON.parse(proxyData.contents);
            displayYapsData(data);
        })
        .catch(error => {
            console.error('Error loading Yaps data:', error);
            // If proxy fails, show demo data instead
            displayDemoYapsData();
        });
}

function displayYapsData(data) {
    const yapsGrid = document.getElementById('yaps-grid');
    
    // Define periods with labels
    const periods = [
        { key: 'yaps_all', label: 'All Time', icon: '🏆' },
        { key: 'yaps_l30d', label: '30 Days', icon: '📅' },
        { key: 'yaps_l7d', label: '7 Days', icon: '📊' },
        { key: 'yaps_l24h', label: '24 Hours', icon: '⚡' }
    ];
    
    // Create cards for each period
    const cardsHTML = periods.map(period => {
        const score = data[period.key] || 0;
        const formattedScore = formatYapsScore(score);
        
        return `
            <div class="yaps-card">
                <div class="yaps-score">${formattedScore}</div>
                <div class="yaps-period">${period.icon} ${period.label}</div>
            </div>
        `;
    }).join('');
    
    yapsGrid.innerHTML = cardsHTML;
    
    // Add animation
    const cards = yapsGrid.querySelectorAll('.yaps-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.5s ease';
        }, index * 100);
    });
}

function displayYapsError() {
    const yapsGrid = document.getElementById('yaps-grid');
    yapsGrid.innerHTML = `
        <div class="yaps-error">
            <i class="fas fa-exclamation-triangle"></i>
            Unable to load Yaps data. Please try again later.
        </div>
    `;
}

function displayDemoYapsData() {
    const yapsGrid = document.getElementById('yaps-grid');
    
    // Demo data structure (you can update these values manually)
    const demoData = {
        yaps_all: 1250.5,
        yaps_l30d: 320.2,
        yaps_l7d: 85.7,
        yaps_l24h: 12.3
    };
    
    displayYapsData(demoData);
    
    // Add a note about demo data
    setTimeout(() => {
        const note = document.createElement('div');
        note.className = 'yaps-demo-note';
        note.innerHTML = '<small style="color: var(--text-muted); font-size: 0.75rem;">📊 Demo data - API integration in progress</small>';
        document.getElementById('yaps-stats').appendChild(note);
    }, 1000);
}

function formatYapsScore(score) {
    if (score === 0) return '0';
    if (score < 1) return score.toFixed(3);
    if (score < 10) return score.toFixed(2);
    if (score < 100) return score.toFixed(1);
    if (score < 1000) return Math.round(score).toString();
    if (score < 1000000) return (score / 1000).toFixed(1) + 'K';
    return (score / 1000000).toFixed(1) + 'M';
}

// ==============================================
// SMOOTH SCROLLING
// ==============================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==============================================
// PROJECT FILTERING
// ==============================================

class ProjectFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projectTiles = document.querySelectorAll('.project-tile');
        this.currentFilter = 'all';
        
        this.init();
    }
    
    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setActiveFilter(e.target);
                this.filterProjects(filter);
            });
        });
    }
    
    setActiveFilter(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
    
    filterProjects(filter) {
        this.currentFilter = filter;
        
        this.projectTiles.forEach((tile, index) => {
            const category = tile.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                tile.style.display = 'block';
                // Add staggered animation
                setTimeout(() => {
                    tile.style.opacity = '1';
                    tile.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                tile.style.opacity = '0';
                tile.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    tile.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize project filter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectFilter();
});

// ==============================================
// SCROLL ANIMATIONS
// ==============================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.project-tile, .contact-item, .section-header');
        this.init();
    }
    
    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all animation elements
        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});

// ==============================================
// NAVBAR SCROLL EFFECT
// ==============================================

class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.nav');
        this.lastScrollY = window.scrollY;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (currentScrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollY = currentScrollY;
    }
}

// Initialize navbar scroll effect
document.addEventListener('DOMContentLoaded', () => {
    new NavbarScroll();
});

// ==============================================
// TYPING ANIMATION
// ==============================================

class TypingAnimation {
    constructor(element, texts, speed = 100, deleteSpeed = 50, pause = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pause = pause;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pause;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}



// ==============================================
// PARTICLE BACKGROUND
// ==============================================

class ParticleBackground {
    constructor() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.init();
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.3';
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(canvas);
        }
        
        return canvas;
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.fillStyle = '#9146FF';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(145, 70, 255, ${1 - distance / 100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Initialize particle background
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) { // Only on desktop
        new ParticleBackground();
    }
});

// ==============================================
// FORM HANDLING
// ==============================================

// Add any contact form handling here if needed
document.addEventListener('DOMContentLoaded', () => {
    // Contact form handling can be added here
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Add any analytics tracking here
            console.log('Contact button clicked');
        });
    }
});

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

// Debounce function for performance
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

// Throttle function for scroll events
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==============================================
// LOADING ANIMATION
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen when page is loaded
    const body = document.body;
    body.classList.add('loaded');
    
    // Add entrance animation to hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
});

// ==============================================
// SOCIAL LINK TRACKING
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link, .footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = e.currentTarget.classList.contains('twitter') ? 'Twitter' :
                            e.currentTarget.classList.contains('github') ? 'GitHub' :
                            e.currentTarget.classList.contains('linkedin') ? 'LinkedIn' :
                            e.currentTarget.classList.contains('discord') ? 'Discord' : 'Unknown';
            
            console.log(`Social link clicked: ${platform}`);
            // Add analytics tracking here if needed
        });
    });
});

// ==============================================
// PROJECT LINK TRACKING
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const projectTile = e.target.closest('.project-tile');
            const projectTitle = projectTile.querySelector('h3').textContent;
            const linkType = e.target.textContent.includes('View') ? 'View Project' : 'View Code';
            
            console.log(`Project link clicked: ${projectTitle} - ${linkType}`);
            // Add analytics tracking here if needed
        });
    });
}); 