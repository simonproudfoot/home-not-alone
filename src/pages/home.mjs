import { site, areas } from '../site.config.mjs';
import { services } from './services.mjs';
import { faqs } from './faq.mjs';
import { esc, icons, picture, faqSchema } from '../layout.mjs';

function trustSection() {
  const { trust } = site;
  const points = [
    ['Local to Yeadon', 'We are based in Yeadon and work across North West Leeds, so help is never far away.'],
    ['Tailored to you', 'No fixed packages you have to fit into. We listen first, then shape the help around you.'],
    ['Non-medical, everyday help', 'We focus on the practical jobs and the company that make home life easier.'],
    ['Family peace of mind', 'If you live away or work long hours, we can be there on the days you can\'t.'],
  ];
  if (trust.dbsChecked) points.unshift(['DBS checked', `Everyone who visits your home has an enhanced DBS check${trust.insured ? ', and we are fully insured' : ''}.`]);
  if (trust.yearsExperience) points.unshift([`${trust.yearsExperience}+ years' experience`, 'Helping families across North West Leeds.']);
  if (trust.priceFrom) points.push([`From ${trust.priceFrom} an hour`, 'Clear pricing agreed with you before we start. Package deals available.']);

  const team = trust.team.length
    ? `<div class="mt-20">
        <h3 class="font-serif text-3xl lg:text-4xl text-red-600 text-center">Meet the team</h3>
        <ul class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          ${trust.team.map((p) => `<li class="text-center">
            ${p.photo ? `<img src="${p.photo}" alt="${esc(p.name)}" width="320" height="320" loading="lazy" class="mx-auto w-40 h-40 rounded-full object-cover shadow-soft" />` : ''}
            <p class="mt-4 font-semibold text-ink-900">${esc(p.name)}</p>
            <p class="text-sm text-ink-500">${esc(p.role)}</p>
            ${p.bio ? `<p class="mt-3 text-ink-700 leading-relaxed">${esc(p.bio)}</p>` : ''}
          </li>`).join('')}
        </ul>
      </div>`
    : '';

  const testimonials = trust.testimonials.length
    ? `<div class="mt-20">
        <h3 class="font-serif text-3xl lg:text-4xl text-red-600 text-center">What families say</h3>
        <ul class="mt-10 grid gap-6 lg:grid-cols-${Math.min(trust.testimonials.length, 3)}">
          ${trust.testimonials.map((t) => `<li><figure class="h-full rounded-[1.5rem] bg-cream-50 p-7 shadow-soft">
            <blockquote class="font-serif text-xl italic text-ink-700 leading-relaxed">“${esc(t.quote)}”</blockquote>
            <figcaption class="mt-4 text-sm text-ink-500">${esc(t.name)}${t.relation ? `, ${esc(t.relation)}` : ''}</figcaption>
          </figure></li>`).join('')}
        </ul>
        ${site.googleReviewUrl ? `<p class="mt-8 text-center"><a href="${site.googleReviewUrl}" class="text-red-600 underline" rel="noopener">Read more reviews or leave your own on Google</a></p>` : ''}
      </div>`
    : '';

  return `<section id="why-us" class="relative bg-cream-100">
    <div class="absolute inset-0 grain pointer-events-none opacity-60"></div>
    <div class="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
      <div class="text-center max-w-2xl mx-auto reveal">
        <h2 class="font-serif text-5xl lg:text-6xl text-red-600 tracking-tight text-balance">Why families choose us</h2>
      </div>
      <ul class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-${Math.min(points.length, 4)} reveal">
        ${points.map(([h, p]) => `<li class="rounded-[1.5rem] bg-cream-50 p-7 shadow-soft">
          <p class="font-serif text-2xl text-ink-900">${h}</p>
          <p class="mt-3 text-ink-700 leading-relaxed">${p}</p>
        </li>`).join('\n        ')}
      </ul>
      ${team}
      ${testimonials}
    </div>
  </section>`;
}

function serviceRow(s, i, blurb) {
  const flip = i % 2 === 1;
  return `<article class="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${i < 2 ? 'mb-20' : ''} reveal">
        <div class="lg:col-span-5 ${flip ? 'order-1 lg:order-2' : 'order-1'}">
          <h3 class="font-serif text-4xl lg:text-5xl text-red-600 tracking-tight text-balance">${s.heading}</h3>
          <p class="mt-5 text-lg text-ink-700 leading-relaxed">${blurb}</p>
          <a href="/services/${s.slug}/" class="mt-6 inline-flex items-center gap-2 text-red-600 font-semibold hover:underline underline-offset-4">${s.linkText} <span aria-hidden="true">→</span></a>
        </div>
        <div class="lg:col-span-7 ${flip ? 'order-2 lg:order-1' : 'order-2'}">
          <div class="relative aspect-[5/4] rounded-[2rem] overflow-hidden shadow-card">
            ${picture({ ...s.image, sizes: '(min-width: 1024px) 700px, 100vw' })}
          </div>
        </div>
      </article>`;
}

export function homePage() {
  const faqList = faqs();
  const byslug = Object.fromEntries(services.map((s) => [s.slug, s]));
  const rows = [
    {
      ...byslug['senior-help'],
      heading: 'Older people',
      linkText: 'Help for older people',
      blurb: 'We all feel most comfortable at home. Our help for older people lets your loved ones keep their independence, with cleaning, meal preparation, shopping, lifts and companionship.',
    },
    {
      ...byslug['limited-mobility-support'],
      heading: 'Limited mobility',
      linkText: 'Limited mobility support',
      blurb: 'Life with limited mobility isn\'t easy in a world that assumes everyone is strong and able. We help you stay independent by taking on the daily tasks that have become hard.',
    },
    {
      ...byslug['family-concierge'],
      heading: 'Busy families',
      linkText: 'Family concierge',
      blurb: 'For active families and busy professionals, we take on household jobs, errands and admin, so your free time is actually free.',
    },
  ];

  const body = `
  <!-- ========== HERO ========== -->
  <section id="home" class="relative overflow-hidden">
    <div class="absolute inset-0 grain pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-20 lg:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
      <div class="lg:col-span-5">
        <h1 class="font-serif text-4xl sm:text-5xl leading-[1.05] text-red-600 tracking-tight text-balance">
          Non-Medical Home Help in Yeadon for Older People, Families and Anyone Who Needs a Hand
        </h1>
        <p class="mt-7 text-lg text-ink-700 leading-relaxed">
          Home Not Alone is a home help and concierge service based in Yeadon, covering Rawdon, Guiseley, Horsforth,
          Otley and the rest of North West Leeds. We help with housework, meals, shopping, lifts, household admin and
          companionship, at prices that are fair and with respect for your privacy and preferences.
        </p>
      </div>

      <div class="lg:col-span-7 relative">
        <div class="relative h-[300px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-card">
          ${picture({ name: 'home3', widths: [640, 800, 1000], ratio: [1000, 1188], alt: 'An older woman\'s hands resting together', sizes: '(min-width: 1024px) 700px, 100vw', eager: true })}
        </div>
        <div class="absolute -bottom-5 right-6 left-6 sm:left-auto flex flex-wrap justify-end items-center gap-3">
          <a href="mailto:${site.email}"
            class="inline-flex items-center gap-2 rounded-full bg-red-500 hover:bg-red-600 text-cream-50 px-6 py-3 text-sm font-medium shadow-card transition-colors">
            ${icons.mail} Email us
          </a>
          <a href="tel:${site.phoneIntl}"
            class="inline-flex items-center gap-2 rounded-full bg-cream-50 hover:bg-cream-100 text-ink-900 ring-1 ring-ink-900/10 px-6 py-3 text-sm font-medium shadow-card transition-colors">
            <span class="text-red-500">${icons.phone}</span> Call ${site.phone}
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== WELCOME ========== -->
  <section id="welcome" class="relative bg-cream-100">
    <div class="absolute inset-0 grain pointer-events-none opacity-60"></div>
    <div class="max-w-4xl mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center relative reveal">
      <h2 class="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.04] text-red-600 tracking-tight text-balance">
        Welcome to Home Not Alone
      </h2>
      <p class="mt-6 text-xl text-ink-700 italic font-serif">
        Your home help specialist, bringing care to your door
      </p>
      <p class="mt-8 text-lg text-ink-700 leading-relaxed max-w-2xl mx-auto">
        From daily household jobs to paperwork and phone calls, our team can take care of the things that have become
        a struggle, so you can get on with enjoying life at home. Get in touch to find out how we can help.
      </p>
    </div>
  </section>

  <!-- ========== SERVICES ========== -->
  <section id="services" class="bg-cream-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <div class="text-center max-w-2xl mx-auto mb-16 reveal">
        <h2 class="font-serif text-5xl lg:text-6xl text-red-600 tracking-tight text-balance">Services</h2>
        <p class="mt-3 text-sm uppercase tracking-[0.22em] text-ink-500">Health and Wellbeing</p>
        <p class="mt-6 text-lg text-ink-700 leading-relaxed">
          Let us help simplify your life. Here is who we help most often; every service can be shaped around you.
        </p>
      </div>

      ${rows.map((s, i) => serviceRow(s, i, s.blurb)).join('\n\n      ')}

      <div class="mt-20 rounded-[2rem] bg-cream-100 p-8 lg:p-12 reveal">
        <h3 class="font-serif text-3xl text-ink-900">All our services</h3>
        <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          ${services.map((s) => `<li><a href="/services/${s.slug}/" class="flex items-center justify-between gap-3 rounded-2xl bg-cream-50 px-5 py-4 shadow-soft text-ink-900 hover:text-red-600 transition-colors"><span>${s.name}</span><span aria-hidden="true">→</span></a></li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </section>

  ${trustSection()}

  <!-- ========== ABOUT ========== -->
  <section id="about" class="bg-cream-50">
    <div class="max-w-4xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <div class="text-center reveal">
        <h2 class="font-serif text-5xl lg:text-6xl text-red-600 tracking-tight text-balance">About Home Not Alone</h2>
        <p class="mt-3 text-sm uppercase tracking-[0.22em] text-ink-500">What Sets Us Apart</p>
      </div>

      <div class="mt-14 space-y-7 text-lg text-ink-700 leading-relaxed reveal">
        <p>
          Do you worry about someone special in your life? Does distance or a demanding job stop you giving them the
          time and attention they need? Do you have too much to do and too little time? Would a helping hand make a
          difference?
        </p>
        <p>
          A concierge service, particularly for older people, helps the whole family. With us taking care of chores and
          errands, visits can be about quality time together rather than a list of jobs, and everyone feels less stressed.
        </p>
        <p>
          We help with everyday tasks around the home: housework, preparing and cooking healthy meals, running errands,
          shopping, and lifts to the doctor, social events or simply out of the house for a couple of hours.
        </p>
        <p>
          We also offer a clerical and administrative service. We can contact and schedule skilled, qualified
          contractors for home repairs and maintenance, and help plan day trips and family holidays.
        </p>
        <p>
          It isn't only older people we help. We also support less-mobile adults, busy professionals and working
          couples with no free time, by doing the things they are too busy or unable to do themselves. We are
          resourceful problem solvers, and we are happiest helping our clients with whatever comes their way.
        </p>
        <p>
          Our services are flexible and affordable, and package deals are available on request. Every situation is
          different, and we would love to hear about yours.
        </p>
      </div>
    </div>
  </section>

  <!-- ========== FULL BLEED ========== -->
  <section class="relative h-[60vh] min-h-[420px] overflow-hidden" aria-hidden="true">
    ${picture({ name: 'home6', widths: [640, 1200], ratio: [1200, 651], alt: '', sizes: '100vw', className: 'absolute inset-0 w-full h-full object-cover' })}
  </section>

  <!-- ========== AREAS ========== -->
  <section id="areas" class="bg-cream-50">
    <div class="max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-28 text-center">
      <div class="reveal">
        <h2 class="font-serif text-5xl lg:text-6xl text-red-600 tracking-tight text-balance">Areas we cover</h2>
        <p class="mt-6 text-lg text-ink-700 leading-relaxed max-w-2xl mx-auto">
          We are based in Yeadon (LS19) and help people right across North West Leeds. Not sure if we reach you? Just ask.
        </p>
      </div>
      <ul class="mt-12 flex flex-wrap justify-center gap-3 reveal">
        ${areas.map((a) => `<li><a href="/areas/${a.slug}/" class="inline-block rounded-full bg-cream-100 px-6 py-3 text-ink-900 shadow-soft hover:text-red-600 transition-colors">${a.name} <span class="text-ink-500 text-sm">${a.postcode}</span></a></li>`).join('\n        ')}
      </ul>
    </div>
  </section>

  <!-- ========== FAQ ========== -->
  <section id="faq" class="relative bg-cream-100">
    <div class="absolute inset-0 grain pointer-events-none opacity-60"></div>
    <div class="relative max-w-3xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
      <h2 class="font-serif text-5xl lg:text-6xl text-red-600 tracking-tight text-balance text-center reveal">Questions families ask</h2>
      <div class="mt-12 space-y-4 reveal">
        ${faqList.map((f) => `<details class="group rounded-2xl bg-cream-50 shadow-soft">
          <summary class="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-ink-900">
            <h3 class="text-lg">${f.q}</h3>
            <span class="text-red-500 text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p class="px-6 pb-6 text-ink-700 leading-relaxed">${f.a}</p>
        </details>`).join('\n        ')}
      </div>
    </div>
  </section>

  <!-- ========== CONTACT ========== -->
  <section id="contact" class="relative bg-cream-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16">
      <div class="lg:col-span-5 reveal">
        <h2 class="font-serif text-5xl lg:text-6xl text-red-600 tracking-tight text-balance">Contact us</h2>
        <p class="mt-6 text-lg text-ink-700 leading-relaxed">
          We shape our help around the needs of each client. Call or email for a friendly, no-obligation chat.
        </p>

        <div class="mt-8 space-y-3 text-ink-700">
          <a href="tel:${site.phoneIntl}" class="flex items-center gap-3 hover:text-red-600 transition">
            <span class="text-red-500 [&>svg]:w-5 [&>svg]:h-5">${icons.phone}</span> ${site.phone}
          </a>
          <a href="mailto:${site.email}" class="flex items-center gap-3 hover:text-red-600 transition break-all">
            <span class="text-red-500 [&>svg]:w-5 [&>svg]:h-5">${icons.mail}</span> ${site.email}
          </a>
          <p class="pt-2 text-ink-500">Based in ${site.address.locality}, ${site.address.postalCode}. Covering North West Leeds.</p>
          ${site.hours ? `<p class="text-ink-500">${site.hours.days[0]} to ${site.hours.days[site.hours.days.length - 1]}, ${site.hours.opens} to ${site.hours.closes}</p>` : ''}
        </div>
      </div>

      <div class="lg:col-span-7 reveal">
        <div class="relative aspect-[3/2] rounded-[2rem] overflow-hidden shadow-card">
          ${picture({ name: 'home7', widths: [640, 1059], ratio: [1059, 800], alt: 'Smiling older man talking on his mobile phone', sizes: '(min-width: 1024px) 700px, 100vw' })}
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/',
    title: 'Home Not Alone — Home Care in Yeadon, Leeds',
    description:
      'Friendly non-medical home help in Yeadon & North West Leeds: companionship, errands, meals and transport for older people and busy families.',
    preload:
      '<link rel="preload" as="image" type="image/webp" imagesrcset="/assets/img/home3-640.webp 640w, /assets/img/home3-800.webp 800w, /assets/img/home3-1000.webp 1000w" imagesizes="(min-width: 1024px) 700px, 100vw" fetchpriority="high" />',
    schema: [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name,
        publisher: { '@id': `${site.url}/#business` },
        inLanguage: 'en-GB',
      },
      faqSchema(faqList),
    ],
    body,
  };
}
