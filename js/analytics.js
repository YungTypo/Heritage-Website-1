// Google Analytics 4 loader.
// To activate analytics: replace the placeholder below with your GA4 Measurement
// ID (looks like "G-AB12CD34EF"), found in GA Admin > Data Streams. Until then this
// file does nothing and makes no network requests.
(function () {
  var GA_MEASUREMENT_ID = 'G-WEJV0T4X21';
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf('XXXX') !== -1) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
})();
