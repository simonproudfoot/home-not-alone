# Action Plan: homenotalone.co.uk

**Current:** Overall 64 · SEO 52 · AI Visibility 47 · Accessibility 93

## 🔴 Critical (this week)
- [ ] **Cookie consent and privacy policy.** Install a Consent Mode v2 CMP, set gtag consent defaults to `denied`, and publish a privacy policy linked in the footer. *(2-3 hrs)*
- [ ] **Replace the Tailwind CDN with compiled CSS.** Build a minified CSS file with the Tailwind CLI using the existing config, then remove the `cdn.tailwindcss.com` script. This is the single biggest LCP fix. *(1-2 hrs)*

## 🟠 High (within 1-2 weeks)
- [ ] Delete the unused Ubuntu and Oswald font `<link>` tags. *(5 min)*
- [ ] Optimise images: replace the logo with SVG or a small WebP, use srcset at 800w/1600w, add `loading="lazy"` below the fold, add width/height, and preload `home3.webp`. *(1-2 hrs)*
- [ ] Fix the schema: change the type to `LocalBusiness`, and add an address (LS19), geo, opening hours and `sameAs`. *(45 min)*
- [ ] Add robots.txt and sitemap.xml, and submit them to Google Search Console and Bing. *(30 min)*
- [ ] Claim and optimise the Google Business Profile (service-area business), request reviews, and link it from the site. *(2 hrs)*
- [ ] Add trust signals: team names and photos, DBS and insurance statement, testimonials, a "from £X/hour" guide, and a domain email. *(half a day)*
- [ ] Build individual service pages (Senior Help, Limited Mobility, Family Concierge, Transport & Errands, Admin Help). *(1 day)*

## 🟡 Medium (within 1 month)
- [ ] Build 3-5 unique area pages (Yeadon, Rawdon, Guiseley, Horsforth, Otley). *(1 day)*
- [ ] Add an FAQ section with `FAQPage` schema covering cost, areas, DBS, personal care and getting started. *(2 hrs)*
- [ ] Publish `/llms.txt`. *(20 min)*
- [ ] Add an accessible mobile menu (button with `aria-expanded`, keyboard and Escape support). *(1 hr)*
- [ ] Add a `<main>` landmark and a skip link. *(15 min)*
- [ ] Rewrite the meta description to under 155 characters, add Yeadon and nearby areas to the body copy, and remove meta keywords. *(30 min)*
- [ ] Add Netlify `_headers`: nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy, then a CSP. *(30 min)*

## 🟢 Low (backlog)
- [ ] Add a favicon and apple-touch-icon. *(15 min)*
- [ ] Complete the Open Graph and Twitter Card tags and make a 1200×630 share image. *(30 min)*
- [ ] Proofread the copy and fix the "Elerly" alt typo. *(30 min)*
- [ ] Respect `prefers-reduced-motion` for the reveal animations. *(10 min)*
- [ ] Use a branded 404 page instead of Netlify's default. *(30 min)*

## Expected impact
Doing the Critical and High items should bring mobile LCP under about 3s and SEO up to about 70, and AI Visibility up to about 65 once the FAQ, schema and trust content are in place. It also removes the cookie compliance risk.
