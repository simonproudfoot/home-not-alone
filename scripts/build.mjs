// Builds the site into public/ (Netlify's publish directory).
//   node scripts/build.mjs
// Pages come from src/, files in static/ are copied as-is, and Tailwind is
// compiled to public/assets/css/site.css.
import { rmSync, mkdirSync, writeFileSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { site, areas } from '../src/site.config.mjs';
import { page, JS_FLAG } from '../src/layout.mjs';
import { services } from '../src/pages/services.mjs';
import { homePage } from '../src/pages/home.mjs';
import { servicePage, areaPage } from '../src/pages/templates.mjs';
import { privacyPage, notFoundPage } from '../src/pages/privacy.mjs';
import { faqs } from '../src/pages/faq.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');
const today = new Date().toISOString().slice(0, 10);

rmSync(out, { recursive: true, force: true });
cpSync(join(root, 'static'), out, { recursive: true, filter: (src) => !src.endsWith('.DS_Store') });

const write = (rel, content) => {
  const file = join(out, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

// ---------- Pages ----------
const pages = [
  homePage(),
  ...services.map(servicePage),
  ...areas.map(areaPage),
  privacyPage(),
  notFoundPage(),
];

const problems = [];
for (const p of pages) {
  if (p.description.length > 160) problems.push(`${p.path}: meta description is ${p.description.length} chars`);
  if (p.title.length > 65) problems.push(`${p.path}: title is ${p.title.length} chars`);
  const file = p.path.endsWith('.html') ? p.path : `${p.path}index.html`;
  write(file, page(p));
}

// ---------- Sitemap, robots, llms.txt, manifest ----------
const indexable = pages.filter((p) => !p.noindex);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
);

write(
  'robots.txt',
  `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`,
);

write(
  'llms.txt',
  `# ${site.name}

> ${site.name} is a non-medical home help, companionship and concierge service based in ${site.address.locality} (${site.address.postalCode}), West Yorkshire. It helps older people, adults with limited mobility and busy families across North West Leeds with housework, meals, shopping, lifts to appointments, errands, household admin and companionship. It does not provide personal or medical care.

- Phone: ${site.phone}
- Email: ${site.email}
- Areas covered: ${areas.map((a) => `${a.name} (${a.postcode})`).join(', ')} and wider North West Leeds
${site.trust.priceFrom ? `- Prices: from ${site.trust.priceFrom} per hour\n` : ''}${site.hours ? `- Hours: ${site.hours.days.join(', ')}, ${site.hours.opens}–${site.hours.closes}\n` : ''}
## Services

${services.map((s) => `- [${s.name}](${site.url}/services/${s.slug}/): ${s.description}`).join('\n')}

## Areas

${areas.map((a) => `- [${a.name}](${site.url}/areas/${a.slug}/)`).join('\n')}

## FAQs

${faqs().map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Optional

- [Privacy and cookies](${site.url}/privacy-policy/)
`,
);

write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: site.name,
      short_name: site.name,
      icons: [
        { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#C9402F',
      background_color: '#FFFEFC',
      display: 'browser',
    },
    null,
    2,
  ),
);

// ---------- Security headers ----------
// The CSP is report-only for now: check the browser console for violations
// (especially from Google Ads) for a week or two, then rename the header to
// Content-Security-Policy to enforce it.
const flagHash = createHash('sha256').update(JS_FLAG).digest('base64');
const google = 'https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com';
const csp = [
  "default-src 'self'",
  `script-src 'self' 'sha256-${flagHash}' ${google}`,
  "style-src 'self' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  `img-src 'self' data: ${google} https://www.google.co.uk https://td.doubleclick.net`,
  `connect-src 'self' ${google} https://pagead2.googlesyndication.com`,
  'frame-src https://td.doubleclick.net https://www.googletagmanager.com',
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join('; ');

write(
  '_headers',
  `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Content-Security-Policy-Report-Only: ${csp}

/assets/img/*
  Cache-Control: public, max-age=2592000

/assets/css/*
  Cache-Control: public, max-age=86400, must-revalidate

/assets/js/*
  Cache-Control: public, max-age=86400, must-revalidate
`,
);

// ---------- CSS ----------
execSync(
  'npx --yes tailwindcss@3.4.17 -c tailwind.config.cjs -i src/tailwind.css -o public/assets/css/site.css --minify',
  { cwd: root, stdio: 'inherit' },
);

console.log(`Built ${pages.length} pages into public/`);
if (problems.length) console.warn(`\nCheck:\n- ${problems.join('\n- ')}`);
