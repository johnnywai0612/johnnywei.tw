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
// Contact form (Web3Forms AJAX)
// ══════════════════════════════════════════════
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = document.getElementById('contactSubmit');
  const result = document.getElementById('contactResult');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    result.className = 'contact__result';
    result.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = '送出中…';

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json,
      });
      const data = await res.json();
      if (data.success) {
        result.classList.add('is-success');
        result.textContent = '✓ 訊息已送出，我會在 48 小時內親自回覆你。感謝！';
        contactForm.reset();
      } else {
        result.classList.add('is-error');
        result.textContent = data.message || '送出失敗，請稍後再試，或直接透過 LINE 聯繫。';
      }
    } catch (err) {
      result.classList.add('is-error');
      result.textContent = '網路錯誤，請稍後再試。';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '送出 · 開啟對話';
    }
  });
}
