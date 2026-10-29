(function () {
  // ---------- Google Ads with Consent Mode v2 ----------
  // Everything defaults to denied. gtag.js is only loaded once the visitor
  // clicks Accept, so no Google cookies are set before consent.
  var ADS_ID = 'AW-10848338053';
  var CONVERSION = 'AW-10848338053/rHyyCNjx8acdEIWB8rQo';
  var KEY = 'hna-consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });

  function readChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function saveChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode: ask again next page */ }
  }

  var adsLoaded = false;
  function loadAds() {
    if (adsLoaded) return;
    adsLoaded = true;
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', ADS_ID);
  }

  var banner = document.getElementById('cookie-banner');
  function showBanner() { if (banner) banner.hidden = false; }
  function hideBanner() { if (banner) banner.hidden = true; }

  var choice = readChoice();
  if (choice === 'granted') loadAds();
  else if (choice !== 'denied') showBanner();

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-consent]');
    if (btn) {
      var value = btn.getAttribute('data-consent');
      var previous = readChoice();
      saveChoice(value);
      hideBanner();
      if (value === 'granted') loadAds();
      // Withdrawing consent after gtag has loaded: reload so it stops running.
      else if (previous === 'granted') location.reload();
      return;
    }
    if (e.target.closest('[data-cookie-settings]')) {
      showBanner();
      var first = banner && banner.querySelector('button');
      if (first) first.focus();
      return;
    }
    // Google Ads conversion: someone tapped an email or phone link.
    var link = e.target.closest('a[href^="mailto:"], a[href^="tel:"]');
    if (link && adsLoaded) gtag('event', 'conversion', { send_to: CONVERSION });
  });

  // ---------- Mobile menu ----------
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  // ---------- Reveal on scroll ----------
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
    // Final safety net: never leave content hidden.
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 1200);
  }
})();
