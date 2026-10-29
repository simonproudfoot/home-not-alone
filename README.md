# home-not-alone

Static site for homenotalone.co.uk, built into `public/` (Netlify's publish directory).

```sh
npm run build     # node scripts/build.mjs: pages, sitemap, robots, llms.txt, _headers, Tailwind CSS
npm run preview   # serve public/ locally
```

- `src/site.config.mjs`: business facts. Hours, Google Business Profile, DBS/insurance, prices, team and testimonials are left empty until confirmed, and appear on the site, schema and llms.txt automatically once filled in.
- `src/pages/`: homepage, service pages, area pages, FAQs, privacy policy and 404.
- `src/layout.mjs`: shared head/meta/schema, header, footer and cookie banner.
- `static/`: copied as-is (images, favicons, `assets/js/site.js`).

Netlify runs the build itself (`netlify.toml`). For a manual deploy, run the build and drag `public/` into Netlify.
