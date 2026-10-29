// Business facts used across every page, the schema, sitemap and llms.txt.
// Anything left as null / [] is simply left off the site, so nothing unconfirmed
// is ever published. Fill these in once the client has confirmed them.
export const site = {
  name: 'Home Not Alone',
  url: 'https://homenotalone.co.uk',
  // Switch to a domain address (e.g. hello@homenotalone.co.uk) once it exists.
  email: 'homenotalone20@gmail.com',
  phone: '07795 510299',
  phoneIntl: '+447795510299',

  address: {
    locality: 'Yeadon',
    region: 'West Yorkshire',
    postalCode: 'LS19',
    country: 'GB',
  },
  // Yeadon town centre: fine for a service-area business with no public premises.
  geo: { latitude: 53.8690, longitude: -1.6880 },

  // e.g. { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' }
  hours: null,

  // Google Business Profile, Facebook etc. Used in schema `sameAs` and the footer.
  googleBusinessUrl: null,
  // Direct "leave us a review" link from the Google Business Profile dashboard.
  googleReviewUrl: null,
  facebookUrl: null,

  trust: {
    dbsChecked: null, // true once every team member has an enhanced DBS check
    insured: null, // true once public liability insurance is confirmed
    priceFrom: null, // e.g. '£22' (per hour)
    yearsExperience: null, // e.g. 10
    // [{ name: 'Jane Smith', role: 'Founder', bio: '…', photo: '/assets/img/team-jane.webp' }]
    team: [],
    // [{ quote: '…', name: 'Sarah, Horsforth', relation: 'daughter of a client' }]
    testimonials: [],
  },
};

export const areas = [
  { slug: 'yeadon', name: 'Yeadon', postcode: 'LS19' },
  { slug: 'rawdon', name: 'Rawdon', postcode: 'LS19' },
  { slug: 'guiseley', name: 'Guiseley', postcode: 'LS20' },
  { slug: 'horsforth', name: 'Horsforth', postcode: 'LS18' },
  { slug: 'otley', name: 'Otley', postcode: 'LS21' },
];
