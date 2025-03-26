// DOM Elements
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

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        content.classList.add('loaded');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
        startTypingEffect();
        animateSkillBars();
    }, 500);
});

// Typing Effect
function startTypingEffect() {
    const phrases = [
        "I am a Data Analyst",
        "I am an AI Engineer",
        "I am a Python Developer",
        "I am a Problem Solver"
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
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Theme Toggle
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

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    if (navMobile.style.display === 'none' || navMobile.style.display === '') {
        navMobile.style.display = 'flex';
    } else {
        navMobile.style.display = 'none';
    }
});

// Projects Slider
let slideIndex = 0;
const projectCards = document.querySelectorAll('.project-card');
const cardsPerView = () => {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
};

function updateSlider() {
    const cardWidth = projectCards[0].offsetWidth + 20; // Card width + gap
    projectsSlider.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
}

prevBtn.addEventListener('click', () => {
    if (slideIndex > 0) {
        slideIndex--;
        updateSlider();
    }
});

nextBtn.addEventListener('click', () => {
    if (slideIndex < projectCards.length - cardsPerView()) {
        slideIndex++;
        updateSlider();
    }
});

// Auto slide
let autoSlideInterval = setInterval(() => {
    if (slideIndex < projectCards.length - cardsPerView()) {
        slideIndex++;
    } else {
        slideIndex = 0;
    }
    updateSlider();
}, 5000);

// Reset slider on window resize
window.addEventListener('resize', () => {
    slideIndex = 0;
    updateSlider();
});

// Skills Animation
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-progress')) {
                entry.target.style.width = entry.target.getAttribute('data-width');
            }
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill bars
skillBars.forEach(bar => {
    observer.observe(bar);
});

// Smooth Scroll to Sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
    });
    if (navMobile.style.display === 'flex') {
        navMobile.style.display = 'none';
    }
}

// Add event listeners to all nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // You can add form validation and submission logic here
    // For now, just log the data and show a success message
    console.log({ name, email, message });
    
    // Clear form
    contactForm.reset();
    
    // Show success message (you could add a better UI for this)
    alert('Message sent successfully!');
});

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    // Set initial slider view
    updateSlider();
});