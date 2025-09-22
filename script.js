// Enhanced DOM Elements
const loader = document.querySelector('.loader');
const content = document.querySelector('.content');
const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navMobile = document.getElementById('navMobile');
const typingEffect = document.getElementById('typingEffect');
const backToTop = document.getElementById('backToTop');
const projectsSlider = document.getElementById('projectsSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');

// Loader with enhanced animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        content.classList.add('loaded');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
        startTypingEffect();
        animateSkillBars();
        initLiveAppsAnimation();
    }, 500);
});

// Enhanced Typing Effect with more roles
function startTypingEffect() {
    const phrases = [
        "I'm an Engineer",
        "I'm a Data Analyst",
        "I'm a Pythonist",
        "I'm an AI Developer",
        "I build Production Apps"
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typingEffect.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingEffect.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Longer pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Theme Toggle with smooth transition
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    }
}

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme(true);
}

themeToggle.addEventListener('click', () => {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    setTheme(!isDarkTheme);
});

// Mobile Menu Toggle with animation
menuToggle.addEventListener('click', () => {
    if (navMobile.style.display === 'none' || navMobile.style.display === '') {
        navMobile.style.display = 'flex';
        navMobile.style.animation = 'slideDown 0.3s ease';
    } else {
        navMobile.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            navMobile.style.display = 'none';
        }, 300);
    }
});

// Live Apps Animation
function initLiveAppsAnimation() {
    const liveAppCards = document.querySelectorAll('.live-app-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    liveAppCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Enhanced Projects Slider with touch support
let slideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

const projectCards = document.querySelectorAll('.project-card');
const cardsPerView = () => {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
};

function updateSlider() {
    const cardWidth = projectCards[0].offsetWidth + 20;
    const maxSlide = Math.max(0, projectCards.length - cardsPerView());
    slideIndex = Math.min(slideIndex, maxSlide);
    projectsSlider.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
}

// Touch support for mobile slider
projectsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

projectsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        if (slideIndex < projectCards.length - cardsPerView()) {
            slideIndex++;
            updateSlider();
        }
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        if (slideIndex > 0) {
            slideIndex--;
            updateSlider();
        }
    }
}

// Slider navigation buttons
prevBtn?.addEventListener('click', () => {
    if (slideIndex > 0) {
        slideIndex--;
        updateSlider();
    }
});

nextBtn?.addEventListener('click', () => {
    if (slideIndex < projectCards.length - cardsPerView()) {
        slideIndex++;
        updateSlider();
    }
});

// Skill bars animation
function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#navMobile a').forEach(link => {
    link.addEventListener('click', () => {
        navMobile.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            navMobile.style.display = 'none';
        }, 300);
    });
});

// Back to top button functionality
const backToTopBtn = document.createElement('button');
backToTopBtn.classList.add('back-to-top');
backToTopBtn.innerHTML = '↑';
backToTopBtn.id = 'backToTop';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Window resize handler for slider
window.addEventListener('resize', () => {
    updateSlider();
});

// Initialize slider on load
window.addEventListener('load', () => {
    updateSlider();
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && document.activeElement === prevBtn) {
        prevBtn.click();
    }
    if (e.key === 'ArrowRight' && document.activeElement === nextBtn) {
        nextBtn.click();
    }
});

// Animation keyframes for mobile menu
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);