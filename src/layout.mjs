import { site, areas } from './site.config.mjs';
import { services } from './pages/services.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Tiny inline script so .reveal content is only hidden when JS is running.
// Its hash is allowed in the CSP (scripts/build.mjs).
export const JS_FLAG = "document.documentElement.classList.add('js')";

export const businessId = `${site.url}/#business`;

export const icons = {
  mail: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>',
  phone: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" /></svg>',
  check: '<svg class="w-5 h-5 shrink-0 text-red-500 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>',
};

// Responsive <img>. `widths` must match files generated in static/assets/img.
export function picture({ name, widths, alt, sizes, ratio, eager = false, className = 'w-full h-full object-cover' }) {
  const [w, h] = ratio;
  const largest = widths[widths.length - 1];
  const srcset = widths.map((x) => `/assets/img/${name}-${x}.webp ${x}w`).join(', ');
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
  return `<img src="/assets/img/${name}-${largest}.webp" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${loading} class="${className}" />`;
}

export function businessSchema() {
  const { trust } = site;
  const biz = {
    '@type': 'LocalBusiness',
    '@id': businessId,
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/assets/img/logo.png`,
    image: `${site.url}/assets/img/og-image.jpg`,
    description:
      'Non-medical home help, companionship and concierge services for seniors, less-mobile adults and busy families in Yeadon and North West Leeds.',
    telephone: site.phoneIntl,
    email: site.email,
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', ...site.geo },
    areaServed: [...areas.map((a) => ({ '@type': 'Place', name: a.name })), { '@type': 'City', name: 'Leeds' }],
    knowsAbout: ['Home help', 'Companionship', 'Concierge services', 'Help for older people', 'Errands and transport'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Home help services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: `${site.url}/services/${s.slug}/` },
      })),
    },
  };
  if (site.hours) {
    biz.openingHoursSpecification = [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: site.hours.days, opens: site.hours.opens, closes: site.hours.closes },
    ];
  }
  const sameAs = [site.googleBusinessUrl, site.facebookUrl].filter(Boolean);
  if (sameAs.length) biz.sameAs = sameAs;
  if (trust.team.length) {
    biz.employee = trust.team.map((p) => ({ '@type': 'Person', name: p.name, jobTitle: p.role }));
  }
  return biz;
}

export function breadcrumbs(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${site.url}${path}`,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function head({ title, description, path, schema, preload, noindex }) {
  const canonical = `${site.url}${path}`;
  const graph = { '@context': 'https://schema.org', '@graph': schema };
  return `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script>${JS_FLAG}</script>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  ${noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${canonical}" />`}
  <meta name="theme-color" content="#C9402F" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${site.name}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${site.url}/assets/img/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Home Not Alone logo beside an older couple on a bench" />
  <meta property="og:locale" content="en_GB" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${site.url}/assets/img/og-image.jpg" />

  ${preload || ''}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&amp;family=Nunito+Sans:wght@300..700&amp;display=swap" />
  <link rel="stylesheet" href="/assets/css/site.css" />
  <script src="/assets/js/site.js" defer></script>

  <script type="application/ld+json">
${JSON.stringify(graph, null, 2)}
  </script>
</head>`;
}

const navItems = [
  ['Services', '/#services'],
  ['Areas', '/#areas'],
  ['About', '/#about'],
  ['FAQs', '/#faq'],
  ['Contact', '/#contact'],
];

function header() {
  return `<a href="#main" class="skip-link">Skip to content</a>
  <header class="sticky top-0 z-50 bg-white border-b border-ink-900/5">
    <nav class="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4" aria-label="Main">
      <a href="/" class="flex items-center gap-3 shrink-0">
        <picture>
          <source srcset="/assets/img/logo.webp" type="image/webp" />
          <img src="/assets/img/logo.png" width="229" height="96" alt="Home Not Alone home page" class="h-12 w-auto" />
        </picture>
      </a>

      <ul class="hidden lg:flex items-center gap-9 text-[0.95rem] text-ink-700">
        ${navItems.map(([label, href]) => `<li><a class="nav-link" href="${href}">${label}</a></li>`).join('\n        ')}
      </ul>

      <div class="flex items-center gap-2">
        <a href="tel:${site.phoneIntl}"
          class="inline-flex items-center gap-2 rounded-full bg-red-500 hover:bg-red-600 text-cream-50 px-5 py-2.5 text-sm font-medium shadow-soft transition-colors">
          ${icons.phone}<span class="hidden sm:inline">${site.phone}</span><span class="sm:hidden">Call</span>
        </a>
        <button type="button" id="menu-toggle" aria-expanded="false" aria-controls="mobile-menu"
          class="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-ink-900 hover:bg-cream-100">
          <span class="sr-only">Menu</span>
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
    </nav>
    <div id="mobile-menu" class="lg:hidden border-t border-ink-900/5 bg-white" hidden>
      <ul class="max-w-7xl mx-auto px-6 py-4 space-y-1 text-lg text-ink-700">
        ${navItems.map(([label, href]) => `<li><a class="block py-2" href="${href}">${label}</a></li>`).join('\n        ')}
      </ul>
    </div>
  </header>`;
}

function footer() {
  const social = [
    site.googleBusinessUrl && `<a href="${site.googleBusinessUrl}" class="hover:text-cream-50" rel="noopener">Google reviews</a>`,
    site.facebookUrl && `<a href="${site.facebookUrl}" class="hover:text-cream-50" rel="noopener">Facebook</a>`,
  ].filter(Boolean);
  return `<footer class="bg-ink-900 text-cream-100/80">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm">
      <div>
        <p class="font-serif text-2xl text-cream-50">${site.name}</p>
        <p class="mt-3 leading-relaxed">Non-medical home help, companionship and concierge services based in ${site.address.locality} (${site.address.postalCode}), North West Leeds.</p>
      </div>
      <div>
        <h2 class="text-cream-50 font-semibold mb-3">Services</h2>
        <ul class="space-y-2">
          ${services.map((s) => `<li><a href="/services/${s.slug}/" class="hover:text-cream-50">${s.name}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <h2 class="text-cream-50 font-semibold mb-3">Areas we cover</h2>
        <ul class="space-y-2">
          ${areas.map((a) => `<li><a href="/areas/${a.slug}/" class="hover:text-cream-50">${a.name}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <h2 class="text-cream-50 font-semibold mb-3">Contact</h2>
        <ul class="space-y-2">
          <li><a href="tel:${site.phoneIntl}" class="hover:text-cream-50">${site.phone}</a></li>
          <li><a href="mailto:${site.email}" class="hover:text-cream-50 break-all">${site.email}</a></li>
          ${social.map((s) => `<li>${s}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
    <div class="border-t border-cream-100/10">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream-100/60">
        <span>© ${new Date().getFullYear()} ${site.name}</span>
        <a href="/privacy-policy/" class="hover:text-cream-50">Privacy &amp; cookies</a>
        <button type="button" data-cookie-settings class="hover:text-cream-50 underline-offset-2 hover:underline">Cookie settings</button>
      </div>
    </div>
  </footer>`;
}

function consentBanner() {
  return `<div id="cookie-banner" role="region" aria-label="Cookie consent" hidden
    class="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
    <div class="max-w-3xl mx-auto rounded-2xl bg-white shadow-card ring-1 ring-ink-900/10 p-5 sm:flex sm:items-center sm:gap-6">
      <p class="text-sm text-ink-700 leading-relaxed">
        We'd like to use a Google Ads cookie to see whether our adverts lead to calls and emails. It's off unless you say yes.
        <a href="/privacy-policy/#cookies" class="underline text-red-600">More about cookies</a>
      </p>
      <div class="mt-4 sm:mt-0 flex gap-3 shrink-0">
        <button type="button" data-consent="denied"
          class="rounded-full px-5 py-2.5 text-sm font-medium ring-1 ring-ink-900/20 text-ink-900 hover:bg-cream-100">Reject</button>
        <button type="button" data-consent="granted"
          class="rounded-full px-5 py-2.5 text-sm font-medium bg-red-500 hover:bg-red-600 text-cream-50">Accept</button>
      </div>
    </div>
  </div>`;
}

export function ctaBand({ heading = 'Talk to us about the help you need', text = 'Call or email for a friendly, no-obligation chat. We\'ll listen, then suggest how we can help.' } = {}) {
  return `<section class="relative bg-cream-100">
    <div class="absolute inset-0 grain pointer-events-none opacity-60"></div>
    <div class="relative max-w-3xl mx-auto px-6 lg:px-10 py-20 text-center">
      <h2 class="font-serif text-4xl lg:text-5xl text-red-600 tracking-tight text-balance">${heading}</h2>
      <p class="mt-5 text-lg text-ink-700 leading-relaxed">${text}</p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <a href="tel:${site.phoneIntl}" class="inline-flex items-center gap-2 rounded-full bg-red-500 hover:bg-red-600 text-cream-50 px-6 py-3 text-sm font-medium shadow-card transition-colors">${icons.phone} Call ${site.phone}</a>
        <a href="mailto:${site.email}" class="inline-flex items-center gap-2 rounded-full bg-cream-50 hover:bg-white text-ink-900 ring-1 ring-ink-900/10 px-6 py-3 text-sm font-medium shadow-card transition-colors">${icons.mail} Email us</a>
      </div>
    </div>
  </section>`;
}

export function page({ title, description, path, body, schema = [], preload, noindex }) {
  return `<!doctype html>
<html lang="en-GB">

${head({ title, description, path, schema: [businessSchema(), ...schema], preload, noindex })}

<body class="font-sans text-ink-900 bg-white antialiased">
  ${header()}

  <main id="main" tabindex="-1">
${body}
  </main>

  ${footer()}
  ${consentBanner()}
</body>

</html>
`;
}
