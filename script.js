// ══════════════════════════════════════════════
// NAV scroll behavior
// ══════════════════════════════════════════════
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
});

// ══════════════════════════════════════════════
// Reveal on scroll (IntersectionObserver)
// ══════════════════════════════════════════════
const revealTargets = document.querySelectorAll(
  '.section__title, .hero__quote, .about__lead, .about__body, .credential, .service, .journey__chapter, .media__item, .contact__card, .numbers__item, .belief__text'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ══════════════════════════════════════════════
// Number counters
// ══════════════════════════════════════════════
const counters = document.querySelectorAll('.numbers__digit');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      const animate = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target);
        if (t < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      };
      requestAnimationFrame(animate);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => {
  el.textContent = '0';
  countObserver.observe(el);
});

// ══════════════════════════════════════════════
// Smooth anchor scroll (with nav offset)
// ══════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ══════════════════════════════════════════════
// Contact form — Web3Forms native POST redirect flow
// Detects ?sent=1 param (returned from Web3Forms after successful submission)
// and shows success message, then cleans URL.
// ══════════════════════════════════════════════
(function handleFormSuccess() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('sent') !== '1') return;

  const result = document.getElementById('contactResult');
  if (!result) return;

  result.classList.remove('is-error');
  result.classList.add('is-success');
  result.textContent = '✓ 訊息已送出，我會在 48 小時內親自回覆你。感謝你的信任。';

  setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 400);

  // Clean URL so refresh doesn't keep showing the message
  window.history.replaceState({}, '', window.location.pathname);
})();

// Visual: disable button briefly while form submits (prevents double-click)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = document.getElementById('contactSubmit');
  contactForm.addEventListener('submit', () => {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '送出中…';
    }
  });
}
