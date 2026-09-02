// Service worker registration. External file, no inline script: the CSP allows
// scripts from this origin only. The worker's scope is the docs base.
(function () {
  if (!('serviceWorker' in navigator)) return;
  var base = document.documentElement.getAttribute('data-base') || new URL('.', location.href).pathname;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register(base + 'sw.js', { scope: base }).catch(function () {
      // Registration is an enhancement; the site works fully without it.
    });
  });
})();
