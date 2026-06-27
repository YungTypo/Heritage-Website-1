// Heritage Roofing & Restoration — progressive-enhancement interactions.
// Vanilla JS, no dependencies. Every feature no-ops gracefully when its
// elements are absent, and all motion respects prefers-reduced-motion.
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {

    /* ---------- mobile navigation toggle ---------- */
    (function mobileNav() {
      var toggle = document.getElementById('nav-toggle');
      var menu = document.getElementById('mobile-nav');
      if (!toggle || !menu) return;
      toggle.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });
      menu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Open menu');
        }
      });
    })();

    /* ---------- count-up (data-count) ---------- */
    function countUp(el) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (reduceMotion) { el.textContent = String(target); return; }
      var dur = 1300, t0 = null;
      function tick(now) {
        if (t0 === null) t0 = now;
        var p = Math.min(1, (now - t0) / dur);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    /* ---------- scroll reveal + count-up trigger ---------- */
    (function reveal() {
      var els = document.querySelectorAll('.reveal');
      if (!els.length) return;
      if (!('IntersectionObserver' in window)) {
        // No IO support: show everything, run any counters immediately.
        for (var i = 0; i < els.length; i++) {
          els[i].classList.add('in');
          var c0 = els[i].querySelector('[data-count]');
          if (c0) countUp(c0);
        }
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          var c = e.target.querySelector('[data-count]');
          if (c) countUp(c);
          io.unobserve(e.target);
        });
      }, { threshold: 0.14 });
      els.forEach(function (el) { io.observe(el); });

      // Safety net: count-up elements that are NOT inside a .reveal wrapper.
      document.querySelectorAll('[data-count]').forEach(function (c) {
        if (!c.closest('.reveal')) {
          var co = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); } });
          }, { threshold: 0.4 });
          co.observe(c);
        }
      });
    })();

    /* ---------- scroll progress bar + back-to-top ---------- */
    (function scrollUi() {
      var bar = document.querySelector('[data-scroll-progress]');
      var top = document.querySelector('[data-back-to-top]');
      if (!bar && !top) return;
      function onScroll() {
        var h = document.documentElement;
        var max = (h.scrollHeight - h.clientHeight) || 1;
        var sct = h.scrollTop || document.body.scrollTop;
        if (bar) bar.style.width = Math.min(100, (sct / max) * 100) + '%';
        if (top) top.classList.toggle('show', sct > 600);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      if (top) {
        top.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
      }
    })();

    /* ---------- before/after slider ---------- */
    (function slider() {
      var range = document.querySelector('[data-ba-range]');
      var after = document.querySelector('[data-ba-after]');
      if (!range || !after) return;
      function apply() { after.style.width = range.value + '%'; }
      range.addEventListener('input', apply);
      apply();
    })();

    /* ---------- commitment carousel ---------- */
    (function carousel() {
      var root = document.querySelector('[data-carousel]');
      if (!root) return;
      var track = root.querySelector('[data-carousel-track]');
      var slides = root.querySelectorAll('[data-carousel-track] > *');
      var dots = root.querySelectorAll('[data-carousel-dot]');
      if (!track || slides.length < 2) return;
      var i = 0, timer = null;
      function show(n) {
        i = (n + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + (i * 100) + '%)';
        dots.forEach(function (d, di) { d.setAttribute('aria-selected', di === i ? 'true' : 'false'); });
      }
      function next() { show(i + 1); }
      function start() { if (reduceMotion || timer) return; timer = setInterval(next, 5000); }
      function stop() { if (timer) { clearInterval(timer); timer = null; } }
      dots.forEach(function (d, di) {
        d.addEventListener('click', function () { show(di); stop(); start(); });
      });
      root.addEventListener('mouseenter', stop);
      root.addEventListener('mouseleave', start);
      root.addEventListener('focusin', stop);
      root.addEventListener('focusout', start);
      show(0);
      start();
    })();

    /* ---------- FAQ accordion (one open at a time) ---------- */
    (function faq() {
      var items = document.querySelectorAll('[data-faq-q]');
      if (!items.length) return;
      items.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          // close all
          items.forEach(function (b) {
            b.setAttribute('aria-expanded', 'false');
            var p = document.getElementById(b.getAttribute('aria-controls'));
            if (p) { p.style.maxHeight = '0'; p.style.opacity = '0'; }
          });
          if (!expanded) {
            btn.setAttribute('aria-expanded', 'true');
            var panel = document.getElementById(btn.getAttribute('aria-controls'));
            if (panel) { panel.style.maxHeight = panel.scrollHeight + 'px'; panel.style.opacity = '1'; }
          }
        });
      });
    })();

  });
})();
