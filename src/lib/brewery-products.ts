import fs from "node:fs";
import path from "node:path";

export type BreweryProduct = {
  name: string;
  slug: string;
  folder: string;
  coverImage: string;
  capacityLine: string;
  brief: string;
  applicationLine: string;
  bestForLine: string;
  pricingLine: string;
  advantages: string[];
  category: string;
};

export type BreweryProductDetail = BreweryProduct & {
  imageUrls: string[];
  description: string;
  features: string[];
  applications: string;
  keywords: string[];
};

// Map folder names → English display info
// imageDir: relative path under public/images/ (default: "brewery-system/<folderName>")
type ProductEntry = {
  name: string;
  slug: string;
  capacityLine: string;
  brief: string;
  applicationLine: string;
  bestForLine: string;
  pricingLine: string;
  advantages: string[];
  category: string;
  description: string;
  features: string[];
  applications: string;
  keywords: string[];
  /** Override image directory relative to public/images/ */
  imageDir?: string;
};

const PRODUCT_MAP: Record<string, ProductEntry> = {
  "微型发酵罐": {
    name: "Micro Fermentation Tank",
    slug: "micro-fermentation-tank",
    capacityLine: "Capacity: 100L-500L",
    brief: "Used for daily fermentation in craft breweries and brewpubs. Good for stable temperature control and easy cleaning between batches.",
    applicationLine: "Applications: Craft brewery / Brewpub / Pilot brewery",
    bestForLine: "Best for craft breweries and brewpub startups",
    pricingLine: "Typical project budget: $8,000-$30,000",
    advantages: [
      "Food-grade stainless steel",
      "Customizable configuration",
      "Easy installation and maintenance",
    ],
    category: "Fermentation",
    description:
      "Our micro fermentation tanks are purpose-built for small-scale craft and nano brewery operations. Each vessel features a precision-welded stainless steel shell, dimple-plate glycol jacket for temperature control, sanitary tri-clamp fittings, and a 2B interior polish. Units are available from 50L to 500L and can be customized with sample valves, pressure relief, and CIP spray balls.",
    features: [
      "304/316L stainless steel construction",
      "Dimple-plate glycol cooling jacket",
      "Tri-clamp sanitary fittings",
      "2B interior finish",
      "Integrated pressure relief valve",
      "Optional conical bottom for yeast harvest",
    ],
    applications: "Craft breweries, brewpubs, home brewing labs, fermentation R&D, pilot batch production",
    keywords: [
      "micro fermentation tank",
      "craft beer fermenter",
      "nano brewery fermentation vessel",
      "small scale fermenter manufacturer",
      "stainless steel fermenter China",
    ],
  },
  "微型酿造系统": {
    name: "Micro Brewing System",
    slug: "micro-brewing-system",
    capacityLine: "Capacity: 100L-500L",
    brief: "Used for pilot production, recipe testing, and small commercial runs. Supports stable brewing and fast turnaround for new batches.",
    applicationLine: "Applications: Brewpub / Pilot brewery / R&D lab",
    bestForLine: "Ideal for pilot brewing and R&D labs",
    pricingLine: "Typical project budget: $12,000-$45,000",
    advantages: [
      "Food-grade stainless steel",
      "Customizable configuration",
      "Easy installation and maintenance",
    ],
    category: "Brewhouse",
    description:
      "The micro brewing system integrates mash tun, lauter tun, and kettle whirlpool into a compact footprint for nano and pilot operations. Designed for fast setup and easy cleaning, each unit ships factory-tested and ready to brew. Steam-heated and direct-fire options available.",
    features: [
      "Integrated mash/lauter/kettle design",
      "Factory pressure-tested before shipment",
      "Steam or direct-fire heating options",
      "Digital temperature controller included",
      "Stainless sanitary pumps and fittings",
      "Compact footprint for small spaces",
    ],
    applications: "Nano breweries, brewpubs, beer bars, hospitality venues, R&D brewing labs",
    keywords: [
      "micro brewing system",
      "nano brewery equipment",
      "small brewhouse manufacturer",
      "pilot brewing system China",
      "mini craft brewery system",
    ],
  },
  "热水罐": {
    name: "Hot Liquor Tank (HLT)",
    slug: "hot-liquor-tank",
    capacityLine: "Capacity: 500L-3000L",
    brief: "Used to provide hot water for mashing and sparging. Helps keep brewhouse temperature stable during continuous production.",
    applicationLine: "Applications: Craft brewery / Brewpub / Commercial brewery",
    bestForLine: "Suitable for brewhouse utility upgrades",
    pricingLine: "Cost depends on configuration",
    advantages: [
      "Food-grade stainless steel",
      "Customizable configuration",
      "Easy installation and maintenance",
    ],
    category: "Auxiliary Equipment",
    description:
      "Hot liquor tanks (HLTs) store and deliver temperature-controlled brewing water to the mash tun and lauter tun. Our HLTs feature 60mm polyurethane insulation, electric or steam heating coils, PT100 temperature sensors, and high-capacity recirculation connections. Sizes from 500L to 10,000L.",
    features: [
      "60mm polyurethane insulation shell",
      "Electric or steam heating options",
      "PT100 temperature sensor",
      "Stainless inlet, outlet, and drain fittings",
      "Safety overpressure valve",
      "CIP spray ball included",
    ],
    applications: "All scales of brewery: craft, regional, and commercial beer plants requiring temperature-controlled liquor supply",
    keywords: [
      "hot liquor tank brewery",
      "HLT brewing tank",
      "brewery hot water vessel",
      "insulated hot water tank manufacturer",
      "mash water tank stainless steel",
    ],
  },
  "移动泵": {
    name: "Mobile Transfer Pump",
    slug: "mobile-transfer-pump",
    capacityLine: "Capacity: Customizable",
    brief: "Used to transfer wort, beer, and cleaning liquid between tanks. Reduces manual work and supports safer daily operation.",
    applicationLine: "Applications: Craft brewery / Brewpub / Commercial brewery",
    bestForLine: "Best for flexible production line transfers",
    pricingLine: "Cost depends on configuration",
    advantages: [
      "Food-grade stainless steel",
      "Customizable configuration",
      "Easy installation and maintenance",
    ],
    category: "Auxiliary Equipment",
    description:
      "Mobile transfer pumps are essential utility equipment in any brewery. Our units feature food-grade centrifugal pump heads, stainless steel frames with locking casters, quick-connect tri-clamp hose fittings, and variable-speed motor options. Designed for easy cleaning and multi-use across brewhouse and cellaring operations.",
    features: [
      "Food-grade centrifugal pump head",
      "Stainless steel frame with locking casters",
      "Tri-clamp quick-connect fittings",
      "Variable speed motor option",
      "Easy disassembly for CIP cleaning",
      "ATEX-rated motor available for flammable environments",
    ],
    applications: "Wort transfer, beer transfer, CIP chemical circulation, yeast harvesting, general liquid transfer",
    keywords: [
      "brewery mobile pump",
      "sanitary transfer pump brewery",
      "wort pump stainless steel",
      "beer transfer pump manufacturer China",
      "centrifugal pump brewery equipment",
    ],
  },
  "酵母添加罐": {
    name: "Yeast Propagation Tank",
    slug: "yeast-propagation-tank",
    capacityLine: "Capacity: 50L-2000L",
    brief: "Used for yeast storage and controlled pitching before fermentation. Helps keep yeast activity and batch quality consistent.",
    applicationLine: "Applications: Craft brewery / Brewpub / Commercial brewery",
    bestForLine: "Best for consistent yeast management",
    pricingLine: "Cost depends on configuration",
    advantages: [
      "Food-grade stainless steel",
      "Customizable configuration",
      "Easy installation and maintenance",
    ],
    category: "Fermentation",
    description:
      "Yeast propagation and pitching tanks ensure consistent cell count and viability for every batch. Our tanks feature a sealed pressurized design, sight glass, agitator options, glycol jacket for temperature control during propagation, and hygienic bottom outlet for precise pitching.",
    features: [
      "Sealed pressurized vessel with pressure gauge",
      "Glycol jacket for temperature-controlled propagation",
      "Sight glass for cell growth monitoring",
      "Optional agitator for mixing",
      "Hygienic bottom outlet valve",
      "Available 50L – 2,000L",
    ],
    applications: "Commercial breweries, craft breweries, fermentation labs requiring active yeast management and consistent pitch rates",
    keywords: [
      "yeast propagation tank brewery",
      "yeast pitching vessel",
      "yeast storage tank stainless",
      "brewery yeast management equipment",
      "fermentation yeast tank manufacturer",
    ],
  },
  "CIP清洗设备": {
    name: "CIP Cleaning System",
    slug: "cip-cleaning-system",
    capacityLine: "Capacity: Customizable",
    brief: "Used to clean tanks and pipelines without disassembly. Saves cleaning time and keeps sanitation standards consistent.",
    applicationLine: "Applications: Craft brewery / Commercial brewery / Beverage plant",
    bestForLine: "Suitable for breweries scaling cleaning efficiency",
    pricingLine: "Typical project budget: $6,000-$25,000",
    advantages: [
      "Food-grade stainless steel",
      "Customizable configuration",
      "Easy installation and maintenance",
    ],
    category: "Cleaning & Sanitation",
    description:
      "Clean-in-place (CIP) systems automate the cleaning of tanks, pipes, and heat exchangers without disassembly. Our CIP units include caustic and acid solution tanks, centrifugal supply pumps, heat exchangers for solution heating, flow meters, and PLC-controlled sequencing. Reduces cleaning labour by up to 80% vs. manual methods.",
    features: [
      "Multi-tank caustic/acid/water configuration",
      "PLC-controlled cleaning sequence",
      "Heat exchanger for solution temperature control",
      "Flow meter and conductivity sensor integration",
      "Chemical dosing pump included",
      "80% labour reduction vs. manual CIP",
    ],
    applications: "Craft breweries, commercial breweries, beverage plants, dairy facilities requiring automated sanitation",
    keywords: [
      "CIP cleaning system brewery",
      "clean in place brewing equipment",
      "brewery CIP unit manufacturer",
      "automated brewery cleaning system",
      "stainless CIP system China",
    ],
  },
  "fermentation-tank": {
    name: "Commercial Fermentation Tank",
    slug: "commercial-fermentation-tank",
    capacityLine: "Capacity: 500L-20000L",
    brief: "Used for medium and large production batches in expanding breweries. Built for stable fermentation and reliable daily operation.",
    applicationLine: "Applications: Craft brewery / Commercial brewery / Contract brewing",
    bestForLine: "Suitable for commercial brewery expansion",
    pricingLine: "Typical project budget: $15,000-$80,000",
    advantages: [
      "Food-grade stainless steel",
      "Customizable configuration",
      "Easy installation and maintenance",
    ],
    category: "Fermentation",
    description:
      "Our commercial fermentation tanks are engineered for high-volume craft and regional brewery operations. Available from 15BBL (1,800L) to 170BBL (20,000L+), each vessel features a precision TIG-welded 304/316L stainless shell, dimple-plate glycol jacket, 2B interior polish, full-open manway, CIP spray ball, and ASME/PED-compliant pressure relief. We have delivered 100BBL and 170BBL systems to breweries in the USA, UK, Australia, Chile, and Japan.",
    features: [
      "15BBL – 170BBL+ capacity range",
      "304/316L stainless, TIG-welded precision shell",
      "Dimple-plate glycol cooling jacket",
      "2B interior polish for hygienic fermentation",
      "Full-open manway for easy cleaning access",
      "ASME/PED-compliant pressure relief valve",
      "CIP spray ball and sample valve included",
      "Custom leg height, port positions, and fittings",
    ],
    applications: "Regional craft breweries, commercial beer plants, brewpubs scaling production, contract brewing facilities requiring 1,800L–20,000L+ fermentation capacity",
    keywords: [
      "commercial fermentation tank brewery",
      "100BBL fermenter manufacturer",
      "large craft brewery fermentation vessel",
      "stainless steel fermentation tank China factory",
      "brewery fermenter 40BBL 100BBL 170BBL",
    ],
  },
};

const IMAGES_ROOT = path.join(process.cwd(), "public", "images");
const BREWERY_SYSTEM_DIR = path.join(IMAGES_ROOT, "brewery-system");

function getProductImages(folderKey: string, entry: ProductEntry): string[] {
  if (entry.imageDir) {
    // Custom directory directly under public/images/
    const dirPath = path.join(IMAGES_ROOT, entry.imageDir);
    if (!fs.existsSync(dirPath)) return [];
    return fs
      .readdirSync(dirPath)
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .map((f) => `/images/${entry.imageDir}/${encodeURIComponent(f)}`);
  }
  // Default: brewery-system/<folderKey>
  const folderPath = path.join(BREWERY_SYSTEM_DIR, folderKey);
  if (!fs.existsSync(folderPath)) return [];
  return fs
    .readdirSync(folderPath)
    .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .map((f) => `/images/brewery-system/${encodeURIComponent(folderKey)}/${encodeURIComponent(f)}`);
}

export function loadBreweryProducts(): BreweryProduct[] {
  return Object.entries(PRODUCT_MAP).map(([key, info]) => {
    const images = getProductImages(key, info);
    return {
      name: info.name,
      slug: info.slug,
      folder: key,
      coverImage: images[0] ?? "",
      capacityLine: info.capacityLine,
      brief: info.brief,
      applicationLine: info.applicationLine,
      bestForLine: info.bestForLine,
      pricingLine: info.pricingLine,
      advantages: info.advantages,
      category: info.category,
    };
  });
}

export function loadBreweryProductBySlug(slug: string): BreweryProductDetail | null {
  const entry = Object.entries(PRODUCT_MAP).find(([, v]) => v.slug === slug);
  if (!entry) return null;
  const [folderKey, info] = entry;
  const imageUrls = getProductImages(folderKey, info);
  return {
    ...info,
    folder: folderKey,
    coverImage: imageUrls[0] ?? "",
    imageUrls,
  };
}
