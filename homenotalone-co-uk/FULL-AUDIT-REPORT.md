# Full SEO Audit: homenotalone.co.uk

**Date:** 29 October 2026 · **Business type:** Local service (non-medical home care / concierge, Yeadon, Leeds) · **Pages analysed:** 1 (single-page site on Netlify)

---

## Executive Summary

| Score | Value | Grade |
|---|---|---|
| **Overall Health** | **64 / 100** | C |
| SEO | 52 / 100 | D |
| AI Visibility (GEO) | 47 / 100 | D |
| Accessibility (WCAG) | 93 / 100 | A (AA, automated checks) |

> A warm, nicely designed site that is holding the business back. One page, a 9-second mobile load, and no address, reviews or prices mean Google and AI assistants have little reason to recommend it.

### Top 5 critical issues
1. **Mobile LCP is 9.3s** (Lighthouse mobile performance 58). The Tailwind Play CDN script (407KB) blocks rendering and about 1MB of images are oversized.
2. **Google Ads tag fires without cookie consent, and there's no privacy policy.** This is a UK GDPR/PECR risk, and Consent Mode v2 is required for UK ad measurement.
3. **Single-page site.** There are no service or area pages to rank for "home help Yeadon", "companion care Horsforth" and similar searches.
4. **Weak trust signals.** There is no address, team names, DBS/insurance statement, reviews or pricing, and the contact email is a Gmail address.
5. **Wrong schema type** (`HomeAndConstructionBusiness`), with no address, geo coordinates or opening hours.

### Top 5 quick wins
1. Delete the unused Ubuntu and Oswald font stylesheets (5 min).
2. Add robots.txt and sitemap.xml, and submit to Search Console (20 min).
3. Fix the schema type and add an LS19 address, opening hours and `sameAs` (45 min).
4. Replace the 205KB logo PNG with an SVG or small WebP (15 min).
5. Add a `<main>` landmark and a mobile menu button (1 hr).

### Category scores
| Category | Score |
|---|---|
| Technical | 62 |
| On-Page | 58 |
| Content | 48 |
| Schema | 55 |
| Performance | 50 |
| Images | 55 |
| AI Search | 42 |
| Trust / E-E-A-T | 35 |

---

## Technical SEO — 62/100

| Check | Result |
|---|---|
| HTTPS / SSL | ✅ Valid. HSTS is on (`max-age=31536000`) |
| HTTP → HTTPS, www → apex | ✅ Single 301 to `https://homenotalone.co.uk/` |
| Canonical | ✅ Self-referencing |
| `lang` / viewport | ✅ `en` / zoom allowed |
| robots.txt | ❌ 404. Crawling is allowed by default, but there's no sitemap reference |
| XML sitemap | ❌ 404 |
| 404 handling | ✅ Returns a real 404 (Netlify default page, which isn't branded) |
| Favicon | ❌ 404, no icon declared |
| TTFB | ✅ about 430ms (Netlify edge) |
| Security headers | ⚠️ Only HSTS. Missing CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy |
| JS rendering | ⚠️ Content is in the HTML (good), but styling depends on a runtime JS compiler (Tailwind CDN) |
| Cookie consent | ❌ Google Ads `gtag.js` (AW-10848338053) loads before consent. No privacy policy or cookie notice |

**Crawlability and indexability:** The site has no blockers. It is one indexable URL, and all navigation uses `#anchor` links, so there are no other internal pages to crawl.

---

## Content Quality — 48/100

**Word count:** about 700 words. Readability is fairly easy (Flesch about 55-60), but some sentences are long and generic.

**E-E-A-T assessment**
- **Experience:** ❌ No case studies, client stories or examples of the work.
- **Expertise:** ❌ No named people, qualifications, training or years of experience.
- **Authoritativeness:** ❌ No memberships, press, partnerships or Google review count.
- **Trust:** ⚠️ Phone and email are shown, but there's no address, privacy policy, DBS/insurance statement or pricing. The contact email is `@gmail.com`.

For a business that sends people into vulnerable adults' homes, trust is the main deciding factor for families. It's also what Google's quality raters look for on "Your Money or Your Life" adjacent topics.

**Thin and duplicate content:** There is one page, so no duplicates. Each service (Seniors, Limited Mobility, Family) gets only about 40 words, which is too thin to rank on its own.

**Copy issues:** "Guaranteeing that we can be the Home Help that can please you", "we adapt a lot of our services", "non medical" (should be hyphenated), and the alt text "Elerly".

---

## On-Page SEO — 58/100

| Element | Current | Verdict |
|---|---|---|
| Title | "Home Not Alone — Home Care in Yeadon, Leeds" (44 chars) | ✅ Good |
| Meta description | about 210 chars | ⚠️ Will be cut off around 155 characters |
| Meta keywords | Present | ➖ Ignored by Google. Remove it |
| H1 | "Non-Medical Home Care for Seniors, Families and Anyone Who Needs a Helping Hand" | ✅ Descriptive, but has no location |
| Heading order | H1 → H2 (Welcome, Services, Contact, About) → H3 (services) | ✅ Logical |
| Local terms in body | "Leeds North West" only. **"Yeadon" never appears in the visible text** | ❌ |
| Internal links | Anchor links only | ❌ No page-to-page linking possible |
| Mobile nav | Hidden below 1024px, no toggle | ❌ |

**Suggested meta description (148 chars):**
`Friendly non-medical home help in Yeadon & North West Leeds — companionship, errands, meals and transport for seniors and busy families. Call today.`

---

## Schema & Structured Data — 55/100

**Current:** one JSON-LD block, `@type: ["LocalBusiness","HomeAndConstructionBusiness"]` with name, description, logo, telephone, email, priceRange, areaServed (Yeadon, Leeds), knowsAbout and an OfferCatalog of 3 services.

**Problems**
- `HomeAndConstructionBusiness` is for trades (builders, plumbers). It sends the wrong category signal.
- No `address` / `PostalAddress`, `geo`, `openingHoursSpecification` or `sameAs`.
- No `Organization`/`WebSite` entity, no `FAQPage`.

**Recommended replacement**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://homenotalone.co.uk/#business",
  "name": "Home Not Alone",
  "url": "https://homenotalone.co.uk/",
  "logo": "https://homenotalone.co.uk/uploads/home-not-alone-logo.png",
  "image": "https://homenotalone.co.uk/uploads/home3.webp",
  "description": "Non-medical home help, companionship and concierge services for seniors, less-mobile adults and busy families in Yeadon and North West Leeds.",
  "telephone": "+447795510299",
  "email": "homenotalone20@gmail.com",
  "priceRange": "££",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Yeadon",
    "addressRegion": "West Yorkshire",
    "postalCode": "LS19",
    "addressCountry": "GB"
  },
  "areaServed": ["Yeadon", "Rawdon", "Guiseley", "Horsforth", "Otley", "Leeds"],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00", "closes": "17:00"
  }],
  "sameAs": ["<Google Business Profile URL>", "<Facebook URL>"]
}
```
*(Confirm the postcode, opening hours and areas with the client. Keep the existing OfferCatalog.)*

---

## Performance — 50/100

| Metric | Mobile (lab) | Desktop (lab) | Threshold |
|---|---|---|---|
| Lighthouse Performance | **58** | 84 | — |
| LCP | **9.3s** ❌ | 2.1s ⚠️ | ≤ 2.5s |
| FCP | 4.5s | 1.3s | ≤ 1.8s |
| TBT (INP proxy) | 230ms ⚠️ | 90ms | ≤ 200ms |
| CLS | 0 ✅ | 0 ✅ | ≤ 0.1 |
| Speed Index | 6.0s | 1.6s | — |
| Page weight | 1,877KB | 1,877KB | < 1,000KB |

There is no CrUX field data (not enough traffic), so all figures above are lab measurements.

**Root causes**
1. **Tailwind Play CDN** (`cdn.tailwindcss.com`, 127KB transferred, 407KB uncompressed). It blocks rendering and compiles CSS in the browser, causing **3.4s of LCP render delay**. Tailwind says the Play CDN is not for production.
2. **Four render-blocking stylesheets.** Two of them (Ubuntu, Oswald) are never used.
3. **Google Ads gtag.js** is 199KB, with 64KB unused.
4. **Images.** See the next section.

---

## Images — 55/100

| Image | Size | Estimated waste | Notes |
|---|---|---|---|
| home6.webp | 434KB | 355KB | Full-bleed, below the fold |
| home-not-alone-logo.png | **205KB** | 207KB | Shown at 110×48. No width/height (unsized) |
| home7.webp | 231KB | 185KB | |
| home4.webp | 196KB | 136KB | |
| home5.webp | 180KB | 131KB | |
| home2.webp | 121KB | 59KB | |
| home3.webp (hero / LCP) | 90KB | 38KB | Should be preloaded |

- ✅ All 7 images have alt text, and the photos are already WebP.
- ❌ No `srcset`/`sizes`, no `loading="lazy"`, no `width`/`height`.
- ⚠️ Alt typo: "Elerly woman's hands."

---

## AI Search Readiness (GEO) — 42/100

| Signal | Status |
|---|---|
| AI crawler access (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) | ✅ Allowed by default (no robots.txt) |
| llms.txt | ❌ 404 |
| Server-rendered content | ✅ All text is in the HTML |
| Q&A / FAQ content | ❌ None |
| Specific, quotable facts (prices, areas, hours, staff) | ❌ Very few |
| Entity signals (`sameAs`, GBP, consistent NAP) | ❌ No address, no `sameAs` |
| Open Graph | ⚠️ Present but no `og:url` or `og:site_name`, and the image is the logo |
| Twitter Card | ❌ Missing |

**Citability:** low. A question like "Who offers home help for elderly parents in Yeadon?" needs a page that clearly states *who*, *where*, *what* and *how much*. Right now the page says "Leeds North West" and nothing about price or who the carers are.

---

## Accessibility — WCAG Audit — 93/100 (AA on automated checks)

> ⚠️ **The Apify axe-core scan could not run.** The actor `accessibility_team~a11y-scanner-public` needs its permissions approved in the Apify console first (https://console.apify.com/actors/ADrtCX6ErB75TaMTm?approvePermissions=true). This score instead comes from Lighthouse's axe-core accessibility audit (mobile 96, desktop 97), plus manual HTML and contrast checks.

**Passes:** `lang` set, zoom allowed, all images have alt text, logical heading order, link names, and colour contrast. Contrast checked by hand: body grey #7A6A60 on cream is 4.82–5.13:1, red headings are 6.35:1, button text is 4.89:1 and the footer is about 7.6:1.

| Issue | Impact | WCAG | Elements | Fix |
|---|---|---|---|---|
| No `<main>` landmark (`landmark-one-main`) | Moderate | Best practice; supports 2.4.1 Bypass Blocks (A) | 1 | Wrap content in `<main id="main">` and add a "Skip to content" link |
| Navigation hidden on mobile with no toggle | Moderate | Usability; related to 2.4.5 (AA) | 1 | Add a `<button aria-expanded>` hamburger menu |
| Alt text typo "Elerly" | Minor | 1.1.1 quality | 1 | Correct the spelling |

**Score:** 100 − 3 (moderate) − 3 (moderate) − 1 (minor) = **93**. No WCAG A/AA-tagged violations were found, so the score isn't capped.

**Also recommended (not scored):** honour `prefers-reduced-motion` for the `.reveal` animations, and run a manual keyboard and VoiceOver/NVDA pass.

---

## Method notes
- Fetched the homepage, robots.txt, sitemap.xml, llms.txt, favicon and every image directly. Checked redirects and headers.
- Ran Google PageSpeed Insights (Lighthouse) on mobile and desktop.
- **Not run:** Apify axe-core (permission approval needed), visual screenshots (Playwright isn't installed), DataForSEO SERP and backlink data (not connected).
