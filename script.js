/* ===========================
   NAV — scroll + mobile
=========================== */
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
});

menuToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
});

// Close mobile nav on link click
navMobile.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => navMobile.classList.remove('open'));
});

/* ===========================
   FADE-UP ON SCROLL
=========================== */
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ===========================
   TYPING EFFECT
=========================== */
const phrases = [
    'Data Analyst',
    'AI Developer',
    'Prompt Engineer',
    'Open Source Author',
    'Python Developer',
];

const typingEl = document.getElementById('typingEffect');
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
let speed = 90;

function type() {
    const phrase = phrases[phraseIdx];
    if (deleting) {
        typingEl.textContent = phrase.slice(0, charIdx - 1);
        charIdx--;
        speed = 45;
    } else {
        typingEl.textContent = phrase.slice(0, charIdx + 1);
        charIdx++;
        speed = 90;
    }

    if (!deleting && charIdx === phrase.length) {
        deleting = true;
        speed = 2000;
    } else if (deleting && charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 400;
    }

    setTimeout(type, speed);
}

type();

/* ===========================
   COUNTER ANIMATION
=========================== */
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* ===========================
   PROJECT FILTER
=========================== */
const pills = document.querySelectorAll('.filter-pill');
const projCards = document.querySelectorAll('.proj-card');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');

        projCards.forEach(card => {
            const tags = card.getAttribute('data-tags') || '';
            const show = filter === 'all' || tags.includes(filter);
            card.classList.toggle('hidden', !show);
        });
    });
});

/* ===========================
   BACK TO TOP
=========================== */
document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   3D CARD TILT
=========================== */
const tiltCards = document.querySelectorAll('.app-card, .proj-card');

tiltCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.08s ease, border-color 0.2s ease, box-shadow 0.2s ease';
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 7}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s ease, box-shadow 0.2s ease';
        card.style.transform = '';
    });
});

/* ===========================
   HERO MOUSE-FOLLOW GLOW
=========================== */
const heroGlow = document.querySelector('.hero-bg-glow');
const heroEl   = document.querySelector('.hero');

if (heroGlow && heroEl) {
    let rafId;
    heroEl.addEventListener('mousemove', (e) => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const rect = heroEl.getBoundingClientRect();
            const cx = rect.width  / 2;
            const cy = rect.height / 2;
            const dx = (e.clientX - rect.left - cx) * 0.06;
            const dy = (e.clientY - rect.top  - cy) * 0.06;
            heroGlow.style.transform = `translateX(calc(-50% + ${dx}px)) translateY(${dy}px)`;
        });
    });
    heroEl.addEventListener('mouseleave', () => {
        heroGlow.style.transform = 'translateX(-50%)';
    });
}

/* ===========================
   CONTACT FORM (client-side validation)
   Netlify handles actual submission
=========================== */
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        const email = form.querySelector('#email').value;
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email)) {
            e.preventDefault();
            form.querySelector('#email').focus();
        }
    });
}
