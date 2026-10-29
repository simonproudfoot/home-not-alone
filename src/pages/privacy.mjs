import { site } from '../site.config.mjs';
import { breadcrumbs } from '../layout.mjs';

// Review with the client before launch: it describes what the site does today
// (no forms, phone/email contact, Google Ads conversion cookie only with consent).
export function privacyPage() {
  const updated = '29 October 2026';
  const body = `
  <article class="max-w-3xl mx-auto px-6 lg:px-10 py-20 lg:py-28 prose-copy">
    <h1 class="font-serif text-5xl text-red-600 tracking-tight">Privacy and cookies</h1>
    <p class="text-ink-500">Last updated ${updated}</p>

    <h2>Who we are</h2>
    <p>${site.name} provides non-medical home help and concierge services in ${site.address.locality} and North West Leeds. We are the data controller for personal information collected through this website and when you contact us. You can reach us by email at <a href="mailto:${site.email}">${site.email}</a> or by phone on <a href="tel:${site.phoneIntl}">${site.phone}</a>.</p>

    <h2>What we collect and why</h2>
    <p>This website has no forms or accounts. We only receive personal information when you choose to contact us:</p>
    <ul>
      <li><strong>When you phone or email us</strong>, we receive your name, contact details and anything you tell us about the help you or your family need. We use this to reply, to give you a quote and, if you go ahead, to provide our services. Our lawful basis is taking steps at your request before entering into a contract, and then performing that contract.</li>
      <li><strong>Information about health or circumstances</strong> that you choose to share helps us plan the right support. We only use it for that purpose, with your explicit consent, and you can ask us to delete it at any time.</li>
      <li><strong>Advertising measurement</strong>: if you accept cookies, Google Ads records that someone who clicked one of our adverts went on to tap our phone number or email link. See the cookies section below.</li>
    </ul>

    <h2>Who we share it with</h2>
    <p>We don't sell your information or share it for marketing. We use trusted providers to run our business, including our email provider (Google), our website host (Netlify) and, only if you accept cookies, Google Ads. We may share information if the law requires it.</p>

    <h2>How long we keep it</h2>
    <p>If you enquire but don't become a client, we delete your details within 12 months. For clients, we keep records for as long as we provide services and then for up to 6 years for legal and accounting reasons.</p>

    <h2 id="cookies">Cookies</h2>
    <p>This website only sets non-essential cookies if you click <strong>Accept</strong> on the cookie banner.</p>
    <ul>
      <li><strong>Google Ads conversion tracking</strong> (cookies such as <code>_gcl_au</code>), used to measure whether our adverts lead to calls or emails. Set by Google, and kept for up to 90 days.</li>
      <li><strong>Your cookie choice</strong> is remembered in your browser's local storage (<code>hna-consent</code>) so we don't ask you on every page. This is strictly necessary and contains no personal information.</li>
    </ul>
    <p>You can change your mind at any time: <button type="button" data-cookie-settings class="text-red-600 underline">open cookie settings</button>. Google's own privacy policy is at <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a>.</p>

    <h2>Your rights</h2>
    <p>You have the right to ask for a copy of the information we hold about you, to have it corrected or deleted, to restrict or object to how we use it, and to withdraw consent at any time. To make a request, email <a href="mailto:${site.email}">${site.email}</a>. We will reply within one month.</p>
    <p>If you are unhappy with how we have handled your information, please tell us first. You can also complain to the Information Commissioner's Office at <a href="https://ico.org.uk/make-a-complaint/" rel="noopener">ico.org.uk</a> or on 0303 123 1113.</p>
  </article>
`;
  return {
    path: '/privacy-policy/',
    title: 'Privacy and Cookies | Home Not Alone',
    description: 'How Home Not Alone uses personal information and cookies, and your rights under UK GDPR.',
    schema: [breadcrumbs([['Home', '/'], ['Privacy and cookies', '/privacy-policy/']])],
    body,
  };
}

export function notFoundPage() {
  const body = `
  <section class="relative bg-cream-100">
    <div class="absolute inset-0 grain pointer-events-none opacity-60"></div>
    <div class="relative max-w-2xl mx-auto px-6 lg:px-10 py-28 lg:py-36 text-center">
      <p class="text-sm uppercase tracking-[0.22em] text-ink-500">Page not found</p>
      <h1 class="mt-4 font-serif text-5xl lg:text-6xl text-red-600 tracking-tight text-balance">Sorry, we couldn't find that page</h1>
      <p class="mt-6 text-lg text-ink-700 leading-relaxed">It may have moved. Try the home page, or call us on <a href="tel:${site.phoneIntl}" class="text-red-600 underline">${site.phone}</a> and we will help.</p>
      <a href="/" class="mt-8 inline-flex items-center gap-2 rounded-full bg-red-500 hover:bg-red-600 text-cream-50 px-6 py-3 text-sm font-medium shadow-card transition-colors">Back to the home page</a>
    </div>
  </section>
`;
  return {
    path: '/404.html',
    title: 'Page not found | Home Not Alone',
    description: 'Sorry, this page could not be found.',
    noindex: true,
    body,
  };
}
