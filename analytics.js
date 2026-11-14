// Google Analytics 4 for every page on the site.
// Only the published site reports, so local previews and screenshots are not counted.
(function () {
  if (location.hostname !== 'robinbach.github.io') return;
  var id = 'G-WCGHR8JG5T';
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(script);
})();
