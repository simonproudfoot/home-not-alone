import { site } from '../site.config.mjs';

// Homepage FAQs (also output as FAQPage schema). Answers that depend on
// unconfirmed facts only appear once those facts are set in site.config.mjs.
export function faqs() {
  const { trust } = site;
  const list = [
    {
      q: 'How much does home help cost?',
      a: trust.priceFrom
        ? `Our help starts from ${trust.priceFrom} per hour. The total depends on what you need and how often, and package deals are available for regular visits. Call ${site.phone} for a free, no-obligation quote.`
        : `It depends on what you need and how often. Every service is tailored, and package deals are available for regular visits. Call ${site.phone} or email ${site.email} for a free, no-obligation quote.`,
    },
    {
      q: 'Which areas do you cover?',
      a: 'We are based in Yeadon (LS19) and cover North West Leeds, including Yeadon, Rawdon, Guiseley (LS20), Horsforth (LS18) and Otley (LS21). If you are nearby but outside these areas, get in touch and we will do our best to help.',
    },
    {
      q: 'Do you provide personal or medical care?',
      a: 'No. Home Not Alone is a non-medical service. We help with housework, meals, shopping, transport, companionship and household admin, but we don\'t provide personal care such as washing, dressing or giving medication. We are happy to work alongside a registered care provider if you have one.',
    },
    {
      q: 'Can you help my parent if I live far away?',
      a: 'Yes. Many families contact us because distance or work makes regular visits difficult. We can call in on set days, do the shopping and errands, take your parent to appointments and keep you updated, so your own visits can be about time together.',
    },
    {
      q: 'Do you offer one-off help or only regular visits?',
      a: 'Both. Some clients need a hand with a single job, such as a lift to a hospital appointment, and others have regular weekly visits. Services are tailored to each person, and package deals are available on request.',
    },
    {
      q: 'How do I get started?',
      a: `Call ${site.phone} or email ${site.email}. We will have a friendly chat about what would help, then agree a plan and a price with you before anything starts.`,
    },
  ];
  if (trust.dbsChecked) {
    list.splice(3, 0, {
      q: 'Are your staff DBS checked?',
      a: `Yes. Everyone who visits your home has an enhanced DBS check${trust.insured ? ', and we hold public liability insurance' : ''}.`,
    });
  }
  return list;
}
