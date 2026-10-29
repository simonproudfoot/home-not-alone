import { site, areas } from '../site.config.mjs';
import { services } from './services.mjs';
import { areaContent } from './areas.mjs';
import { icons, picture, breadcrumbs, ctaBand, businessId } from '../layout.mjs';

const crumbNav = (items) => `<nav aria-label="Breadcrumb" class="text-sm text-ink-500">
        <ol class="flex flex-wrap gap-2">
          ${items.map(([name, path], i) => (i < items.length - 1
            ? `<li><a href="${path}" class="hover:text-red-600">${name}</a> <span aria-hidden="true">/</span></li>`
            : `<li aria-current="page">${name}</li>`)).join('\n          ')}
        </ol>
      </nav>`;

export function servicePage(s) {
  const crumbs = [['Home', '/'], ['Services', '/#services'], [s.name, `/services/${s.slug}/`]];
  const others = services.filter((o) => o.slug !== s.slug);
  const body = `
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 grain pointer-events-none"></div>
    <div class="relative max-w-7xl mx-auto px-6 lg:px-10 pt-12 lg:pt-16 pb-20 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <div class="lg:col-span-6">
        ${crumbNav(crumbs)}
        <h1 class="mt-6 font-serif text-4xl sm:text-5xl leading-[1.05] text-red-600 tracking-tight text-balance">${s.h1}</h1>
        ${s.intro.map((p) => `<p class="mt-6 text-lg text-ink-700 leading-relaxed">${p}</p>`).join('\n        ')}
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="tel:${site.phoneIntl}" class="inline-flex items-center gap-2 rounded-full bg-red-500 hover:bg-red-600 text-cream-50 px-6 py-3 text-sm font-medium shadow-card transition-colors">${icons.phone} Call ${site.phone}</a>
          <a href="mailto:${site.email}" class="inline-flex items-center gap-2 rounded-full bg-cream-50 hover:bg-cream-100 text-ink-900 ring-1 ring-ink-900/10 px-6 py-3 text-sm font-medium shadow-card transition-colors">${icons.mail} Email us</a>
        </div>
      </div>
      <div class="lg:col-span-6">
        <div class="relative aspect-[5/4] rounded-[2rem] overflow-hidden shadow-card">
          ${picture({ ...s.image, sizes: '(min-width: 1024px) 600px, 100vw', eager: true })}
        </div>
      </div>
    </div>
  </section>

  <section class="bg-cream-100">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24 grid gap-12 lg:grid-cols-2">
      <div>
        <h2 class="font-serif text-4xl text-red-600 tracking-tight">How we can help</h2>
        <ul class="mt-8 space-y-4 text-lg text-ink-700">
          ${s.helpWith.map((h) => `<li class="flex gap-3">${icons.check}<span>${h}</span></li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <h2 class="font-serif text-4xl text-red-600 tracking-tight">Who it's for</h2>
        <ul class="mt-8 space-y-4 text-lg text-ink-700">
          ${s.whoFor.map((h) => `<li class="flex gap-3">${icons.check}<span>${h}</span></li>`).join('\n          ')}
        </ul>
        <p class="mt-8 text-lg text-ink-700 leading-relaxed">${s.closing}</p>
      </div>
    </div>
  </section>

  <section class="bg-cream-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid gap-12 lg:grid-cols-2">
      <div>
        <h2 class="font-serif text-3xl text-ink-900">Where we offer ${s.name.toLowerCase()}</h2>
        <p class="mt-4 text-ink-700 leading-relaxed">We are based in Yeadon and cover North West Leeds, including:</p>
        <ul class="mt-6 flex flex-wrap gap-3">
          ${areas.map((a) => `<li><a href="/areas/${a.slug}/" class="inline-block rounded-full bg-cream-100 px-5 py-2.5 text-ink-900 shadow-soft hover:text-red-600">${a.name}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <h2 class="font-serif text-3xl text-ink-900">Other services</h2>
        <ul class="mt-6 space-y-3">
          ${others.map((o) => `<li><a href="/services/${o.slug}/" class="text-red-600 hover:underline underline-offset-4">${o.name}</a></li>`).join('\n          ')}
        </ul>
        <p class="mt-6"><a href="/#faq" class="text-ink-700 underline underline-offset-4 hover:text-red-600">Read our frequently asked questions</a></p>
      </div>
    </div>
  </section>

  ${ctaBand()}
`;
  return {
    path: `/services/${s.slug}/`,
    title: s.title,
    description: s.description,
    schema: [
      {
        '@type': 'Service',
        name: s.name,
        serviceType: s.name,
        description: s.description,
        url: `${site.url}/services/${s.slug}/`,
        provider: { '@id': businessId },
        areaServed: areas.map((a) => ({ '@type': 'Place', name: a.name })),
      },
      breadcrumbs(crumbs),
    ],
    body,
  };
}

export function areaPage(area) {
  const c = areaContent[area.slug];
  const crumbs = [['Home', '/'], ['Areas', '/#areas'], [area.name, `/areas/${area.slug}/`]];
  const nearby = c.nearby.map((slug) => areas.find((a) => a.slug === slug));
  const body = `
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 grain pointer-events-none"></div>
    <div class="relative max-w-3xl mx-auto px-6 lg:px-10 pt-12 lg:pt-16 pb-20">
      ${crumbNav(crumbs)}
      <h1 class="mt-6 font-serif text-4xl sm:text-5xl leading-[1.05] text-red-600 tracking-tight text-balance">${c.h1}</h1>
      <p class="mt-3 text-sm uppercase tracking-[0.22em] text-ink-500">${area.name}, ${area.postcode}</p>
      ${c.paragraphs.map((p) => `<p class="mt-6 text-lg text-ink-700 leading-relaxed">${p}</p>`).join('\n      ')}
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="tel:${site.phoneIntl}" class="inline-flex items-center gap-2 rounded-full bg-red-500 hover:bg-red-600 text-cream-50 px-6 py-3 text-sm font-medium shadow-card transition-colors">${icons.phone} Call ${site.phone}</a>
        <a href="mailto:${site.email}" class="inline-flex items-center gap-2 rounded-full bg-cream-50 hover:bg-cream-100 text-ink-900 ring-1 ring-ink-900/10 px-6 py-3 text-sm font-medium shadow-card transition-colors">${icons.mail} Email us</a>
      </div>
    </div>
  </section>

  <section class="bg-cream-100">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
      <h2 class="font-serif text-4xl text-red-600 tracking-tight text-center">Our services in ${area.name}</h2>
      <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${services.map((s) => `<li class="rounded-[1.5rem] bg-cream-50 p-7 shadow-soft">
          <h3 class="font-serif text-2xl text-ink-900"><a href="/services/${s.slug}/" class="hover:text-red-600">${s.name}</a></h3>
          <p class="mt-3 text-ink-700 leading-relaxed">${s.description}</p>
        </li>`).join('\n        ')}
      </ul>
    </div>
  </section>

  <section class="bg-cream-50">
    <div class="max-w-3xl mx-auto px-6 lg:px-10 py-16 text-center">
      <h2 class="font-serif text-3xl text-ink-900">We also help nearby</h2>
      <ul class="mt-6 flex flex-wrap justify-center gap-3">
        ${nearby.map((a) => `<li><a href="/areas/${a.slug}/" class="inline-block rounded-full bg-cream-100 px-5 py-2.5 text-ink-900 shadow-soft hover:text-red-600">${a.name}</a></li>`).join('\n        ')}
      </ul>
    </div>
  </section>

  ${ctaBand({ heading: `Need a hand in ${area.name}?` })}
`;
  return {
    path: `/areas/${area.slug}/`,
    title: c.title,
    description: c.description,
    schema: [
      {
        '@type': 'WebPage',
        name: c.h1,
        url: `${site.url}/areas/${area.slug}/`,
        about: { '@id': businessId },
        spatialCoverage: { '@type': 'Place', name: `${area.name}, ${area.postcode}` },
      },
      breadcrumbs(crumbs),
    ],
    body,
  };
}
