export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
};

export type Product = {
  name: string;
  slug: string;
  capacity: string;
  brief: string;
};

export type CaseStudy = {
  title: string;
  country: string;
  brief: string;
};

export type NewsItem = {
  title: string;
  date: string;
  brief: string;
};

type Mistake = {
  title: string;
  desc: string;
};

type Stat = {
  value: string;
  label: string;
};

type SolutionCard = {
  title: string;
  description: string;
  applications: string;
};

type PainPoint = {
  title: string;
  description: string;
};

type LocaleContent = {
  brand: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroCta3RdLine: string;
  heroTrustBullets: string[];
  nav: {
    home: string;
    products: string;
    cases: string;
    news: string;
    about: string;
    contact: string;
  };
  sections: {
    products: string;
    advantages: string;
    cases: string;
    news: string;
    contact: string;
    solutions: string;
    painPoints: string;
    inquiry: string;
  };
  assessmentTitle: string;
  assessmentChecklist: string[];
  mistakes: Array<Mistake>;
  painPoints: Array<PainPoint>;
  advantages: Array<{ title: string; desc: string }>;
  stats: Array<Stat>;
  solutions: Array<SolutionCard>;
  aboutTitle: string;
  aboutBody: string;
  contactTitle: string;
  contactBody: string;
  ctaTitle: string;
  ctaBody: string;
  footerTagline: string;
};

export const products: Product[] = [
  {
    name: "10HL Two-Vessel Brewhouse",
    slug: "10hl-two-vessel-brewhouse",
    capacity: "1,000 L / batch",
    brief: "Compact turnkey setup for craft breweries and taprooms.",
  },
  {
    name: "20HL Steam-Heated Brewhouse",
    slug: "20hl-steam-heated-brewhouse",
    capacity: "2,000 L / batch",
    brief: "Balanced automation and output for scaling regional production.",
  },
  {
    name: "40HL Commercial Brewing Line",
    slug: "40hl-commercial-brewing-line",
    capacity: "4,000 L / batch",
    brief: "High-efficiency solution with CIP and integrated control.",
  },
  {
    name: "Bright Beer Tank Series",
    slug: "bright-beer-tank-series",
    capacity: "5HL - 80HL",
    brief: "Mirror-polished tanks for stable carbonation and clean transfer.",
  },
  {
    name: "Fermentation Tank Series",
    slug: "fermentation-tank-series",
    capacity: "5HL - 120HL",
    brief: "Jacketed stainless design with precision thermal control.",
  },
  {
    name: "Containerized Microbrewery",
    slug: "containerized-microbrewery",
    capacity: "300 L - 1,000 L",
    brief: "Factory-integrated plug-and-produce unit for fast launch.",
  },
];

export const cases: CaseStudy[] = [
  {
    title: "25HL Turnkey Craft Brewery",
    country: "Germany",
    brief: "Delivered full brewhouse, cellar tanks, and commissioning in 42 days.",
  },
  {
    title: "Container Brewery for Resort Group",
    country: "Thailand",
    brief: "Installed compact brewing line with remote monitoring and staff training.",
  },
  {
    title: "Multi-site Expansion Project",
    country: "Canada",
    brief: "Standardized process package across three production facilities.",
  },
];

export const news: NewsItem[] = [
  {
    title: "How To Plan Utilities For A New Brew House",
    date: "2026-04-18",
    brief: "A practical checklist for steam, glycol, compressed air, and drainage.",
  },
  {
    title: "5 Mistakes To Avoid In Fermentation Cellar Design",
    date: "2026-03-27",
    brief: "Layout choices that improve cleaning safety and reduce operating cost.",
  },
  {
    title: "Lead Time Update For Q3 Overseas Projects",
    date: "2026-03-01",
    brief: "Current manufacturing schedule and shipment planning suggestions.",
  },
];

export const siteContent: Record<Locale, LocaleContent> = {
  en: {
    brand: "Zhejiang Brew Equipment Co., Ltd.",
    heroTitle: "Turnkey Brewery Equipment Manufacturer for Global Breweries",
    heroSubtitle:
      "We design and manufacture 5HL–100HL+ brewery systems, fermentation tanks, brewhouse equipment, and complete beer production lines for craft breweries, brewpubs, and commercial beer plants worldwide.",
    heroPrimaryCta: "Request a Brewery Equipment Quote",
    heroSecondaryCta: "View Turnkey Brewery Systems",
    heroCta3RdLine: "Send your capacity, layout, and budget. We will reply with a preliminary solution within 24 hours.",
    heroTrustBullets: [
      "Factory-direct manufacturing in China",
      "Custom layout and engineering support",
      "Export experience to Europe, Americas, Japan, Korea, and Southeast Asia"
    ],
    assessmentTitle: "Get a Free Brewery Project Assessment",
    assessmentChecklist: [
      "Brewing capacity and product type",
      "Brewhouse, fermentation, and cooling configuration",
      "Steam, power, glycol, and water requirements",
      "Factory layout and installation plan",
      "Budget range and delivery timeline"
    ],
    nav: {
      home: "Home",
      products: "Products",
      cases: "Cases",
      news: "News",
      about: "About",
      contact: "Contact",
    },
    sections: {
      products: "Product Range",
      advantages: "Why Choose Us",
      cases: "Recent Projects",
      news: "Technical Updates",
      contact: "Get In Touch",
      solutions: "Brewery Equipment Solutions",
      painPoints: "Common Problems We Help Breweries Avoid",
      inquiry: "Tell Us About Your Brewery Project",
    },
    solutions: [
      {
        title: "Turnkey Brewery Systems",
        description: "Complete 5HL–100HL+ brewing lines with brewhouse, fermentation tanks, cooling, and control systems.",
        applications: "Craft breweries, brewpubs, regional beer plants, hospitality groups"
      },
      {
        title: "Brewhouse Equipment",
        description: "Custom-designed mash tun, kettle, HLT systems with steam, electric, or gas heating.",
        applications: "New installations, upgrades, OEM partnerships"
      },
      {
        title: "Fermentation Tanks",
        description: "Mirror-polished stainless steel bright tanks and fermentation vessels with jacketed cooling.",
        applications: "Cellar expansion, used equipment replacement, process optimization"
      },
      {
        title: "Used Brewery Equipment",
        description: "Refurbished, tested brewery systems and tanks with full technical documentation.",
        applications: "Budget-conscious startups, expansion with verified equipment"
      }
    ],
    painPoints: [
      {
        title: "Wrong Tank Sizing",
        description: "Over- or under-sized fermentation capacity leads to inefficiency, wasted utilities, and poor ROI."
      },
      {
        title: "Poor Factory Layout",
        description: "Inefficient process flow increases labor, reduces output, and creates bottlenecks."
      },
      {
        title: "Hidden Installation Costs",
        description: "Unexpected piping, utility, and commissioning expenses inflate total project budget."
      },
      {
        title: "Incomplete Used Equipment",
        description: "Missing controls, fittings, or documentation causes startup failures and delays."
      },
      {
        title: "Lack of After-Sales Support",
        description: "No technical support, spare parts, or commissioning assistance post-delivery."
      }
    ],
    mistakes: [
      {
        title: "Choosing Wrong Tank Size",
        desc: "Over-sizing or under-sizing fermentation tank capacity causes low efficiency, wasted utilities, and slow ROI.",
      },
      {
        title: "Underestimating Installation Cost",
        desc: "Ignoring piping, utility integration, and commissioning can inflate total turnkey brewery project budget.",
      },
      {
        title: "Buying Incomplete Used Systems",
        desc: "Missing controls, fittings, or support documents in used brewery equipment lead to startup failures.",
      },
    ],
    advantages: [
      {
        title: "20+ Years Manufacturing Experience",
        desc: "Established expertise in brewing system design, fabrication, and commissioning for international customers.",
      },
      {
        title: "Strict Quality Standards",
        desc: "All fermentation tanks and brewhouse equipment undergo pressure testing, weld inspection, and FAT verification.",
      },
      {
        title: "Custom Engineering Support",
        desc: "Our team designs custom brewery layouts, utility configurations, and turnkey systems tailored to your capacity.",
      },
      {
        title: "Global Export & Logistics",
        desc: "Proven shipping, installation, and commissioning experience across Europe, Americas, Asia, and beyond.",
      },
    ],
    stats: [
      { value: "20+", label: "Years Manufacturing Experience" },
      { value: "30+", label: "Export Countries" },
      { value: "5HL–100HL+", label: "System Capacity Range" },
      { value: "24H", label: "Initial Project Response" },
    ],
    aboutTitle: "About Zhejiang Brew Equipment",
    aboutBody:
      "We are a professional brewery equipment manufacturer specializing in custom turnkey brewery systems. With 20+ years of experience, we've designed and delivered fermentation tanks, brewhouse equipment, and complete beer production lines to craft breweries, micro-breweries, and commercial beer plants across 30+ countries.",
    contactTitle: "Discuss Your Brewery Project",
    contactBody:
      "Send us your required capacity, brewery layout, utility details, and budget. Our engineering team will provide a preliminary system configuration, cost estimate, and delivery timeline within 24 hours.",
    ctaTitle: "Ready To Start Your Brewery Project?",
    ctaBody:
      "Schedule a consultation with our technical team. We'll provide preliminary sizing, layout, and budget estimates.",
    footerTagline: "Brewery Equipment Manufacturer | Turnkey Brewery Systems | Global Export",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
