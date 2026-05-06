import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseGallery } from "@/components/site/case-gallery";
import { SectionTitle } from "@/components/site/section-title";
import { loadBreweryProductBySlug, loadBreweryProducts } from "@/lib/brewery-products";
import { getAbsoluteUrl } from "@/lib/site-config";
import { isLocale, locales } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const products = loadBreweryProducts();
  return locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = loadBreweryProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const productUrl = getAbsoluteUrl(`/${locale}/products/${product.slug}`);

  return {
    title: `${product.name} | Brewery Equipment`,
    description: product.description.slice(0, 160),
    keywords: product.keywords,
    alternates: { canonical: productUrl },
    openGraph: {
      title: `${product.name} | Brewery Equipment`,
      description: product.description.slice(0, 160),
      url: productUrl,
      type: "article",
      images: product.coverImage
        ? [{ url: product.coverImage, alt: product.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Brewery Equipment`,
      description: product.description.slice(0, 160),
      images: product.coverImage ? [product.coverImage] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const product = loadBreweryProductBySlug(slug);
  if (!product) notFound();

  const productUrl = getAbsoluteUrl(`/${locale}/products/${product.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: productUrl,
    image: product.imageUrls.map((u) => getAbsoluteUrl(u)),
    brand: {
      "@type": "Brand",
      name: "Zhejiang Brew Equipment Co., Ltd.",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Zhejiang Brew Equipment Co., Ltd.",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "Zhejiang Brew Equipment Co., Ltd.",
      },
    },
  };

  return (
    <section className="section-gap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container-x pb-24 md:pb-0">
        <Link
          href={`/${locale}/products`}
          className="mb-6 inline-flex items-center text-sm font-semibold text-[var(--brand)] transition-colors hover:text-[var(--brand-dark)]"
        >
          ← Back to Products
        </Link>

        <SectionTitle title={product.name} subtitle={product.brief} />

        {/* Info cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              Product Overview
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">{product.description}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              Key Features
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 text-[var(--brand)]">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              Applications
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">{product.applications}</p>
            <div className="mt-4">
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {product.category}
              </span>
            </div>
          </article>
        </div>

        {/* Gallery */}
        {product.imageUrls.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Product Gallery</h2>
            <CaseGallery imageUrls={product.imageUrls} title={product.name} />
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Interested in {product.name}?
          </h2>
          <p className="text-slate-600 mb-6">
            Send us your capacity, layout, and requirements — we will respond with a tailored proposal within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-dark)] transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href={`/${locale}/cases`}
              className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
            >
              View Installed Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile back bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-4 py-3 md:hidden">
        <Link
          href={`/${locale}/products`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white"
        >
          ← Back to Products
        </Link>
      </div>
    </section>
  );
}
