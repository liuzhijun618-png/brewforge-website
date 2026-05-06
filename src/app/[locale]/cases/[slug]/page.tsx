import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseGallery } from "@/components/site/case-gallery";
import { SectionTitle } from "@/components/site/section-title";
import { loadProjectCaseBySlug, loadProjectCases } from "@/lib/project-cases";
import { getAbsoluteUrl } from "@/lib/site-config";
import { isLocale, locales } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const cases = await loadProjectCases();

  return locales.flatMap((locale) => cases.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const projectCase = await loadProjectCaseBySlug(decodeURIComponent(slug));

  if (!projectCase) {
    return {
      title: "Case not found",
    };
  }

  const caseUrl = getAbsoluteUrl(`/${locale}/cases/${encodeURIComponent(projectCase.slug)}`);

  return {
    title: `${projectCase.title} Brewery Project Case`,
    description: projectCase.summary,
    keywords: projectCase.keywords,
    alternates: {
      canonical: caseUrl,
    },
    openGraph: {
      title: `${projectCase.title} Brewery Project Case`,
      description: projectCase.summary,
      url: caseUrl,
      type: "article",
      images: [
        {
          url: projectCase.imageUrl,
          alt: projectCase.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${projectCase.title} Brewery Project Case`,
      description: projectCase.summary,
      images: [projectCase.imageUrl],
    },
  };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const projectCase = await loadProjectCaseBySlug(decodeURIComponent(slug));

  if (!projectCase) {
    notFound();
  }

  const caseUrl = getAbsoluteUrl(`/${locale}/cases/${encodeURIComponent(projectCase.slug)}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${projectCase.title} Brewery Project Case`,
    description: projectCase.summary,
    mainEntityOfPage: caseUrl,
    image: projectCase.imageUrls.map((imageUrl) => getAbsoluteUrl(imageUrl)),
    author: {
      "@type": "Organization",
      name: "Zhejiang Brew Equipment Co., Ltd.",
    },
    publisher: {
      "@type": "Organization",
      name: "Zhejiang Brew Equipment Co., Ltd.",
    },
    about: projectCase.keywords,
  };

  return (
    <section className="section-gap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="container-x pb-24 md:pb-0">
        <Link href={`/${locale}/cases`} className="mb-6 inline-flex items-center text-sm font-semibold text-[var(--brand)] transition-colors hover:text-[var(--brand-dark)]">
          Back to Cases
        </Link>
        <SectionTitle
          title={projectCase.title}
          subtitle={projectCase.summary}
        />
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Project Overview</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              This brewery project case highlights equipment delivery, fabrication quality, and installation progress for {projectCase.title}.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Key Specs</h2>
            <dl className="mt-3 space-y-2 text-sm text-slate-700">
              <div className="flex items-start justify-between gap-4">
                <dt className="font-semibold text-slate-900">Capacity</dt>
                <dd>{projectCase.capacity ?? "Custom brewery configuration"}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-semibold text-slate-900">Market</dt>
                <dd>{projectCase.market ?? "Overseas brewery project"}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-semibold text-slate-900">Gallery</dt>
                <dd>{projectCase.imageUrls.length} delivery and installation photos</dd>
              </div>
            </dl>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Commercial Intent</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Use this case as a reference for brewery layout planning, fabrication standards, and turnkey delivery expectations before requesting a quotation.
            </p>
          </article>
        </div>
        <CaseGallery title={projectCase.title} imageUrls={projectCase.imageUrls} />
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Planning a similar brewery project?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            If you are evaluating a brewery expansion, brewhouse replacement, or turnkey installation in another market, compare this case with your target capacity, utility conditions, and commissioning schedule before finalizing the equipment scope.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href={`/${locale}/products`} className="brand-button brand-button-ghost text-sm">
              View Brewery Systems
            </Link>
            <Link href={`/${locale}/contact`} className="brand-button brand-button-primary text-sm">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
        <div className="container-x">
          <Link
            href={`/${locale}/cases`}
            className="flex w-full items-center justify-center rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]"
          >
            Back to Cases
          </Link>
        </div>
      </div>
    </section>
  );
}