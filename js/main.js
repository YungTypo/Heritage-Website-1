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

    /* ---------- Web3Forms submission (progressive enhancement) ----------
       Forms POST natively to Web3Forms and redirect to /thank-you.html with
       no JS. When fetch is available we submit over AJAX instead so we can
       show an inline error (and keep the visitor on-page) if it fails. */
    (function web3forms() {
      var forms = document.querySelectorAll('form[data-web3forms]');
      if (!forms.length || !window.fetch) return;

      forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
          // Honeypot tripped: silently drop, don't submit.
          var trap = form.querySelector('[name="botcheck"]');
          if (trap && trap.checked) { e.preventDefault(); return; }

          e.preventDefault();
          var btn = form.querySelector('button[type="submit"]');
          var label = btn ? btn.innerHTML : '';
          if (btn) { btn.disabled = true; btn.innerHTML = 'Sending…'; }
          clearError(form);

          var data = {};
          new FormData(form).forEach(function (v, k) { data[k] = v; });

          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
          })
            .then(function (r) { return r.json(); })
            .then(function (res) {
              if (res && res.success) {
                window.location.href = '/thank-you.html';
              } else {
                fail(form, btn, label);
              }
            })
            .catch(function () { fail(form, btn, label); });
        });
      });

      function clearError(form) {
        var e = form.querySelector('[data-form-error]');
        if (e) e.remove();
      }
      function fail(form, btn, label) {
        if (btn) { btn.disabled = false; btn.innerHTML = label; }
        clearError(form);
        var p = document.createElement('p');
        p.setAttribute('data-form-error', '');
        p.setAttribute('role', 'alert');
        p.style.cssText = 'margin:8px 0 0;text-align:center;color:#B23A2E;font-size:14px;font-weight:600';
        p.innerHTML = 'Something went wrong — please call <a href="tel:+16156703132" style="color:#B23A2E">(615) 670-3132</a> or try again.';
        form.appendChild(p);
      }
    })();

  });
})();
