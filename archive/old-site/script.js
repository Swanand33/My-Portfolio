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
   TOKEN-CONFIDENCE STREAM
   Deterministic per-word "model confidence" highlight,
   like a logprob viewer — amber (confident) to coral (less so).
=========================== */
function seededConfidence(word) {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
        hash = (hash * 31 + word.charCodeAt(i)) >>> 0;
    }
    const frac = (hash % 1000) / 1000;
    return 0.72 + frac * 0.27; // 0.72–0.99
}

function mixColor(low, high, t) {
    return low.map((c, i) => Math.round(c + (high[i] - c) * t));
}

const inferStream = document.getElementById('inferStream');
if (inferStream) {
    const text = inferStream.getAttribute('data-text') || '';
    const words = text.split(' ');
    const coral = [255, 107, 87];
    const amber = [255, 180, 84];

    words.forEach((word, i) => {
        const p = seededConfidence(word.replace(/[^a-zA-Z]/g, '') || word);
        const t = (p - 0.72) / 0.27;
        const [r, g, b] = mixColor(coral, amber, t);
        const alpha = 0.14 + t * 0.16;

        const span = document.createElement('span');
        span.className = 'tok';
        span.textContent = word;
        span.title = `p = ${p.toFixed(2)}`;
        span.style.background = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        span.style.animationDelay = `${0.4 + i * 0.05}s`;
        inferStream.appendChild(span);
        inferStream.appendChild(document.createTextNode(' '));
    });
}

/* ===========================
   TYPING EFFECT
=========================== */
const phrases = [
    'AI Engineer',
    'Data Engineer',
    'Open Source Author',
    'Backend Developer',
    'Prompt Engineer',
    'AI Consultant',
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