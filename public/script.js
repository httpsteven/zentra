/* ============================================================
   Zentra — shared site behavior
   One motion engine (GSAP + ScrollTrigger + Lenis), all gated
   behind prefers-reduced-motion. Mobile menu, cursor image
   trail, and form validation are vanilla.
   ============================================================ */
document.documentElement.classList.add('js');

/* ---- Mobile menu: fixed toggle, focus management, scroll lock ---- */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;
  function set(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Cerrar' : 'Menú';
    document.body.classList.toggle('nav-open', open);
    if (open) { var first = links.querySelector('a'); if (first) first.focus(); }
    else { toggle.focus(); }
  }
  toggle.addEventListener('click', function () {
    set(toggle.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') set(false);
  });
})();

/* ---- Motion: reveals + Lenis momentum, honoring reduced-motion ---- */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('[data-reveal]');
  if (reduced || !window.gsap) {
    reveals.forEach(function (el) { el.style.opacity = 1; el.style.visibility = 'visible'; });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis) {
    document.documentElement.style.scrollBehavior = 'auto';
    var lenis = new Lenis({ lerp: 0.1 });
    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  var EASE = 'power3.out'; /* approximates brand cubic-bezier(0.25,0.46,0.45,0.94) */
  document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
    var items = group.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    gsap.fromTo(items,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.95, ease: EASE, stagger: 0.1,
        clearProps: 'transform',
        scrollTrigger: { trigger: group, start: 'top 80%' } });
  });
  document.querySelectorAll('[data-reveal]:not([data-reveal-group] [data-reveal])').forEach(function (el) {
    gsap.fromTo(el, { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.95, ease: EASE, clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 84%' } });
  });
  /* Slow ken-burns drift on hero media */
  var heroImg = document.querySelector('.hero--immersive .hero-media img');
  if (heroImg) {
    gsap.fromTo(heroImg, { scale: 1.08 }, { scale: 1, duration: 2.2, ease: 'power2.out' });
  }
})();

/* ---- Flourish: cursor image trail (desktop pointer only, one section) ---- */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var zone = document.querySelector('[data-trail]');
  if (!zone) return;
  var srcs = (zone.getAttribute('data-trail') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  if (!srcs.length) return;
  var pool = srcs.map(function (src) {
    var img = new Image();
    img.src = src; img.className = 'trail-img'; img.alt = ''; img.setAttribute('aria-hidden', 'true');
    document.body.appendChild(img);
    return img;
  });
  var i = 0, lastX = 0, lastY = 0;
  zone.addEventListener('pointermove', function (e) {
    var dx = e.clientX - lastX, dy = e.clientY - lastY;
    if (dx * dx + dy * dy < 900) return; /* throttle to meaningful movement */
    lastX = e.clientX; lastY = e.clientY;
    var img = pool[i % pool.length]; i++;
    if (!window.gsap) return;
    gsap.killTweensOf(img);
    gsap.set(img, { left: e.clientX - 55, top: e.clientY - 68, opacity: 0.9, scale: 0.85, rotation: (Math.random() * 10 - 5) });
    gsap.to(img, { opacity: 0, scale: 1.05, duration: 0.9, ease: 'power2.out' });
  });
})();

/* ---- Form: validate on blur, focus first invalid, success state ---- */
(function () {
  var form = document.querySelector('.inquiry-form');
  if (!form) return;
  function fieldOf(input) { return input.closest('.field'); }
  function validate(input) {
    var field = fieldOf(input);
    if (!field) return true;
    var ok = input.checkValidity();
    field.classList.toggle('invalid', !ok);
    return ok;
  }
  form.querySelectorAll('input, select, textarea').forEach(function (input) {
    input.addEventListener('blur', function () { validate(input); });
    input.addEventListener('input', function () {
      if (fieldOf(input) && fieldOf(input).classList.contains('invalid')) validate(input);
    });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var inputs = form.querySelectorAll('input, select, textarea');
    var firstInvalid = null;
    inputs.forEach(function (input) { if (!validate(input) && !firstInvalid) firstInvalid = input; });
    if (firstInvalid) { firstInvalid.focus(); return; }
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
    /* Host estático: sin backend. Se simula y se confirma. Sustituir por Formspree/WhatsApp al publicar. */
    setTimeout(function () {
      var status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Gracias — tu mensaje está con nuestro equipo de cuidado. Respondemos en un día hábil.';
        status.hidden = false;
      }
      form.reset();
      if (btn) { btn.disabled = false; btn.textContent = 'Enviar mensaje'; }
    }, 800);
  });
})();
