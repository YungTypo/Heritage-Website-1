// Heritage Roofing & Restoration — site interactions (2026 redesign).
// Vanilla JS, no dependencies. Each feature no-ops when its markup is absent.
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {

    /* ---------- FAQ accordion (one open at a time) ---------- */
    (function faq() {
      var buttons = document.querySelectorAll('[data-faq-q]');
      if (!buttons.length) return;
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var open = btn.getAttribute('aria-expanded') === 'true';
          buttons.forEach(function (b) {
            b.setAttribute('aria-expanded', 'false');
            var sign = b.querySelector('[data-faq-sign]');
            if (sign) sign.textContent = '+';
            var panel = document.getElementById(b.getAttribute('aria-controls'));
            if (panel) panel.hidden = true;
          });
          if (!open) {
            btn.setAttribute('aria-expanded', 'true');
            var sign = btn.querySelector('[data-faq-sign]');
            if (sign) sign.textContent = '–';
            var panel = document.getElementById(btn.getAttribute('aria-controls'));
            if (panel) panel.hidden = false;
          }
        });
      });
    })();

    /* ---------- before/after comparison slider ---------- */
    (function beforeAfter() {
      var root = document.querySelector('[data-ba]');
      if (!root) return;
      var before = root.querySelector('[data-ba-before]');
      var line = root.querySelector('[data-ba-line]');
      var handle = root.querySelector('[data-ba-handle]');
      if (!before) return;
      var dragging = false;
      function setFromX(clientX) {
        var r = root.getBoundingClientRect();
        var p = ((clientX - r.left) / r.width) * 100;
        p = Math.max(2, Math.min(98, p));
        before.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)';
        if (line) line.style.left = p + '%';
        if (handle) handle.style.left = p + '%';
      }
      root.addEventListener('pointerdown', function (e) {
        dragging = true;
        try { root.setPointerCapture(e.pointerId); } catch (_) {}
        setFromX(e.clientX);
      });
      root.addEventListener('pointermove', function (e) {
        if (dragging) setFromX(e.clientX);
      });
      root.addEventListener('pointerup', function () { dragging = false; });
      root.addEventListener('pointercancel', function () { dragging = false; });
    })();

    /* ---------- close mobile nav after choosing a link ---------- */
    (function mobileNav() {
      var toggle = document.getElementById('hr-navtoggle');
      if (!toggle) return;
      document.querySelectorAll('.hr-nav a').forEach(function (a) {
        a.addEventListener('click', function () { toggle.checked = false; });
      });
    })();

  });
})();
