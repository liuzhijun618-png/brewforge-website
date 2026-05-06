import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/site/section-title";
import { getAbsoluteUrl } from "@/lib/site-config";
import { loadBreweryProducts } from "@/lib/brewery-products";
import { isLocale, siteContent } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const products = loadBreweryProducts();
  const firstCover = products.find((item) => Boolean(item.coverImage))?.coverImage;
  const pageUrl = getAbsoluteUrl(`/${safeLocale}/products`);

  return {
    title: "Brewery Equipment Products",
    description:
      "Explore craft brewery equipment: fermentation tanks, micro brewing systems, CIP cleaning units, hot liquor tanks, yeast vessels, and transfer pumps — factory direct from China.",
    keywords: [
      "brewery equipment manufacturer",
      "craft brewing equipment China",
      "fermentation tank manufacturer",
      "CIP cleaning system brewery",
      "micro brewing system",
      "hot liquor tank",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Brewery Equipment Products",
      description:
        "Explore craft brewery equipment: fermentation tanks, micro brewing systems, CIP cleaning units, hot liquor tanks, yeast vessels, and transfer pumps — factory direct from China.",
      url: pageUrl,
      type: "website",
      images: firstCover
        ? [
            {
              url: firstCover,
              alt: "Brewery Equipment Product Range",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: "Brewery Equipment Products",
      description:
        "Explore craft brewery equipment: fermentation tanks, micro brewing systems, CIP cleaning units, hot liquor tanks, yeast vessels, and transfer pumps — factory direct from China.",
      images: firstCover ? [firstCover] : undefined,
    },
  };
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const t = siteContent[locale];
  const products = loadBreweryProducts();
  const listUrl = getAbsoluteUrl(`/${locale}/products`);
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Brewery Equipment Product Range",
    url: listUrl,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: getAbsoluteUrl(`/${locale}/products/${product.slug}`),
    })),
  };

  return (
    <section className="section-gap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }} />
      <div className="container-x">
        <SectionTitle
          title={t.nav.products}
          subtitle="Factory-direct brewery equipment for craft and commercial breweries."
        />

        <section className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:mb-8 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Brewery Equipment Product Range</h2>
          <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:mt-3 md:block md:leading-7 md:text-base">
            We provide complete brewery equipment solutions including brewhouse systems, fermentation tanks, CIP units, and auxiliary equipment.
          </p>
          <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block md:leading-7 md:text-base">
            All equipment can be customized based on your capacity, layout, and process requirements.
          </p>
          <div className="mt-3 md:mt-5">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center rounded-lg bg-[var(--brand)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] md:px-5 md:py-2.5 md:text-sm"
            >
              Request a Custom Brewery Solution
            </Link>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/${locale}/products/${product.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Product image */}
              <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                {product.coverImage ? (
                  <Image
                    src={product.coverImage}
                    alt={product.name}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400 text-sm">No image</div>
                )}
                <span className="absolute top-3 left-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                  {product.category}
                </span>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-slate-800 mb-3">{product.capacityLine}</p>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">{product.brief}</p>
                <p className="text-sm text-slate-700 mb-4">{product.applicationLine}</p>
                <p className="text-sm font-medium text-slate-800 mb-4">{product.bestForLine}</p>

                <ul className="mb-5 space-y-1.5 text-sm text-slate-700">
                  {product.advantages.slice(0, 3).map((advantage) => (
                    <li key={advantage} className="flex items-start gap-2">
                      <span className="mt-0.5 text-[var(--brand)]">-</span>
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-1">
                  <span className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all group-hover:bg-[var(--brand-dark)] group-hover:shadow-md">
                    Get Quote
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-600">Free consultation | 24h response</p>
                <p className="mt-2 text-xs text-slate-500">{product.pricingLine}</p>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Not Sure Which Equipment Fits Your Brewery?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
            Send us your capacity, budget, and layout. Our engineers will recommend the right configuration for your project.
          </p>
          <div className="mt-5">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]"
            >
              Get My Equipment Recommendation
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
