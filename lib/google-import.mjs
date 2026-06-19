/**
 * ═══════════════════════════════════════════════════════════════════════
 *  GOOGLE BUSINESS PROFILE → site.content.json
 * ═══════════════════════════════════════════════════════════════════════
 *  Paste a business's public Google info into a small JSON file, run
 *  `npm run import:google`, and this maps it into a ready-to-edit
 *  site.content.json — including industry-aware starter copy for the
 *  services, process, and FAQ sections you can then refine.
 *
 *  Pure ESM JS (no TS path aliases) so it runs under plain `node`.
 *  Input shape — see google-input.example.json.
 */

/** Map common Google primary categories → our Industry + best-fit template. */
const CATEGORY_MAP = [
  [/plumb/i, "plumber"],
  [/electric/i, "electrician"],
  [/(hvac|heating|air condition|furnace)/i, "hvac"],
  [/roof/i, "roofer"],
  [/(general contractor|remodel|construction|builder)/i, "contractor"],
  [/handyman/i, "handyman"],
  [/paint/i, "painter"],
  [/(landscap|lawn|garden|tree)/i, "landscaper"],
  [/(auto detail|car wash|detailing)/i, "detailer"],
  [/dentist|dental/i, "dentist"],
  [/chiropract/i, "chiropractor"],
  [/(restaurant|cafe|coffee|bakery|caterer|bar|grill|pizz)/i, "restaurant"],
  [/(real estate|realtor)/i, "realestate"],
  [/(attorney|law|legal|lawyer)/i, "attorney"],
  [/(account|cpa|bookkeep|tax)/i, "accountant"],
  [/insurance/i, "insurance"],
  [/(salon|barber|spa|beauty|hair|nail)/i, "salon"],
];

// client-template-3 ships one fully-built theme today (atelier); noir / linen /
// gallery are reserved palette variants. Default every industry to atelier.
const TEMPLATE_FOR_INDUSTRY = {
  plumber: "atelier", electrician: "atelier", hvac: "atelier", roofer: "atelier",
  contractor: "atelier", handyman: "atelier", painter: "atelier", landscaper: "atelier",
  detailer: "atelier", dentist: "atelier", chiropractor: "atelier", restaurant: "atelier",
  realestate: "atelier", attorney: "atelier", accountant: "atelier", insurance: "atelier",
  salon: "atelier", other: "atelier",
};

export function detectIndustry(category = "") {
  for (const [re, key] of CATEGORY_MAP) if (re.test(category)) return key;
  return "other";
}

/** Per-industry starter services (used only when none are pasted in). */
const SERVICE_PACKS = {
  plumber: ["Emergency Repairs", "Drain & Sewer Cleaning", "Water Heaters", "Repiping & Remodels", "Fixtures & Faucets", "Inspections"],
  electrician: ["Panel Upgrades", "Wiring & Rewiring", "Lighting Installation", "EV Chargers", "Troubleshooting", "Safety Inspections"],
  hvac: ["AC Repair", "Heating Repair", "System Installation", "Maintenance Plans", "Indoor Air Quality", "Emergency Service"],
  roofer: ["Roof Replacement", "Roof Repair", "Storm Damage", "Inspections", "Gutters", "Skylights"],
  contractor: ["Kitchen Remodels", "Bathroom Remodels", "Additions", "Decks & Patios", "Whole-Home Renovation", "Custom Builds"],
  handyman: ["Repairs", "Furniture Assembly", "Drywall & Paint", "Mounting & Installs", "Doors & Windows", "Honey-Do Lists"],
  painter: ["Interior Painting", "Exterior Painting", "Cabinet Refinishing", "Drywall Repair", "Staining", "Color Consultation"],
  landscaper: ["Lawn Care", "Landscape Design", "Hardscaping", "Tree & Shrub Care", "Irrigation", "Seasonal Cleanup"],
  detailer: ["Full Detail", "Interior Detail", "Exterior & Wax", "Ceramic Coating", "Paint Correction", "Headlight Restoration"],
  dentist: ["Cleanings & Exams", "Cosmetic Dentistry", "Crowns & Bridges", "Implants", "Emergency Care", "Teeth Whitening"],
  chiropractor: ["Adjustments", "Sports Injury Care", "Auto Accident Recovery", "Massage Therapy", "Posture Correction", "Wellness Plans"],
  restaurant: ["Dine-In", "Takeout & Delivery", "Catering", "Private Events", "Daily Specials", "Happy Hour"],
  realestate: ["Buyer Representation", "Listing & Selling", "Market Analysis", "Staging Advice", "Relocation", "Investment Properties"],
  attorney: ["Free Consultation", "Case Evaluation", "Negotiation", "Litigation", "Document Review", "Ongoing Counsel"],
  accountant: ["Tax Preparation", "Bookkeeping", "Payroll", "Business Advisory", "Audit Support", "Financial Planning"],
  insurance: ["Auto Insurance", "Home Insurance", "Life Insurance", "Business Coverage", "Policy Review", "Claims Support"],
  salon: ["Haircuts & Styling", "Color", "Treatments", "Special Occasion", "Grooming", "Memberships"],
  other: ["Consultation", "Service Delivery", "Maintenance", "Support", "Custom Solutions", "Follow-Up Care"],
};

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const telHref = (phone) => "+1" + (phone || "").replace(/\D/g, "");

function defaultProcess(name) {
  return [
    { n: "01", title: "Reach out", body: `Tell ${name} what you need. You'll get a real response and a clear next step — no runaround.` },
    { n: "02", title: "Upfront estimate", body: "We assess the work and quote the full price before anything begins. You approve it first." },
    { n: "03", title: "Quality work", body: "Licensed, careful professionals do the job right and treat your property with respect." },
    { n: "04", title: "Stand behind it", body: "Our work is guaranteed. If something isn't right, we make it right." },
  ];
}

function defaultFaq(name, city) {
  return [
    { q: `What areas does ${name} serve?`, a: `We proudly serve ${city} and the surrounding communities. Call us to confirm we cover your area.` },
    { q: "Are you licensed and insured?", a: `Yes — ${name} is fully licensed and insured. We're happy to provide proof on request.` },
    { q: "Do you offer free estimates?", a: "Reach out and we'll get you a clear, upfront quote before any work begins." },
    { q: "How soon can you help?", a: "Most requests are scheduled within a day or two, with priority for urgent needs. Call us for the next available slot." },
    { q: "How do I get started?", a: `Call or send a message through this site and ${name} will take it from there.` },
  ];
}

/**
 * Build a site.content.json object from pasted Google data.
 * @param {object} g  See google-input.example.json for the shape.
 */
export function buildContent(g) {
  const industry = g.industry || detectIndustry(g.category || g.primaryCategory || "");
  const name = g.name || "Your Business";
  const city = g.address?.city || g.city || "your area";
  const phone = g.phone || "";
  const serviceTitles = g.services?.length ? g.services : SERVICE_PACKS[industry] || SERVICE_PACKS.other;

  return {
    business: {
      name,
      tagline: g.tagline || `${city} ${labelFor(industry)} you can *trust*.`,
      description:
        g.description ||
        `${name} provides trusted ${labelFor(industry)} services across ${city}. Honest pricing, quality work, and friendly service every time.`,
      industry,
      foundedYear: g.foundedYear || new Date().getFullYear() - 5,
      license: g.license || "Licensed & insured",
      domain: g.domain || (g.website || "").replace(/^https?:\/\//, "").replace(/\/$/, "") || "example.com",
    },
    contact: {
      phone,
      phoneTel: g.phoneTel || telHref(phone),
      email: g.email || `hello@${(g.domain || "example.com").replace(/^https?:\/\//, "")}`,
      address: {
        street: g.address?.street || "",
        city,
        state: g.address?.state || "",
        zip: g.address?.zip || "",
      },
      hours: g.hours?.length
        ? g.hours
        : [
            { days: "Mon – Fri", time: "8:00 AM – 6:00 PM" },
            { days: "Saturday", time: "9:00 AM – 2:00 PM" },
            { days: "Sunday", time: "Closed" },
          ],
      mapsUrl: g.mapsUrl || (g.placeId ? `https://www.google.com/maps/place/?q=place_id:${g.placeId}` : ""),
    },
    serviceArea: g.serviceArea?.length ? g.serviceArea : [city],
    services: serviceTitles.map((title) => ({
      slug: slugify(typeof title === "string" ? title : title.title),
      title: typeof title === "string" ? title : title.title,
      blurb: typeof title === "string" ? `Professional ${title.toLowerCase()} done right the first time.` : title.blurb,
    })),
    reviews: {
      rating: g.rating || 4.9,
      count: g.reviewCount || 0,
      source: "Google",
      sourceUrl: g.mapsUrl || "",
      items: (g.reviews || []).map((r) => ({
        author: r.author || "Google user",
        rating: r.rating || 5,
        date: r.date || "recently",
        body: r.body || r.text || "",
      })),
    },
    process: g.process?.length ? g.process : defaultProcess(name),
    faq: g.faq?.length ? g.faq : defaultFaq(name, city),
    about: {
      owner: g.owner || "",
      ownerRole: g.ownerRole || "Owner",
      photo: null,
      paragraphs: g.about?.length
        ? g.about
        : [
            `${name} is a locally owned and operated business serving ${city} and the surrounding area.`,
            "We've built our reputation on honest pricing, quality workmanship, and treating every customer like a neighbor.",
          ],
    },
    social: g.social || (g.mapsUrl ? { google: g.mapsUrl } : {}),
    portfolio:
      g.photos?.length
        ? { title: "Recent work", items: g.photos.map((src, i) => ({ src, caption: `Project ${i + 1}` })) }
        : undefined,
    theme: {
      mode: g.theme?.mode || "light",
      accent: g.theme?.accent || "#b89d74",
      ...(g.theme?.bg ? { bg: g.theme.bg } : {}),
      ...(g.theme?.fg ? { fg: g.theme.fg } : {}),
    },
    template: g.template || TEMPLATE_FOR_INDUSTRY[industry] || "atelier",
  };
}

function labelFor(industry) {
  const labels = {
    plumber: "plumbing",
    electrician: "electrical",
    hvac: "heating & cooling",
    roofer: "roofing",
    contractor: "remodeling",
    handyman: "handyman",
    painter: "painting",
    landscaper: "landscaping",
    detailer: "auto detailing",
    dentist: "dental",
    chiropractor: "chiropractic",
    restaurant: "dining",
    realestate: "real estate",
    attorney: "legal",
    accountant: "accounting",
    insurance: "insurance",
    salon: "salon",
    other: "local",
  };
  return labels[industry] || "local";
}
