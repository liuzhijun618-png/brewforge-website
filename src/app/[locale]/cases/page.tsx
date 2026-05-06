import type { Metadata } from "next";
import Link from "next/link";
import { SectionTitle } from "@/components/site/section-title";
import { loadProjectCases } from "@/lib/project-cases";
import { isLocale, siteContent } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Cases",
    description:
      "Review overseas brewery delivery cases across different capacities and project scenarios.",
  };
}

export default async function CasesPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const t = siteContent[locale];
  const projectCases = await loadProjectCases();

  return (
    <section className="section-gap">
      <div className="container-x">
        <SectionTitle title={t.nav.cases} subtitle="Real-world delivery cases are key trust assets for B2B conversion." />
        {projectCases.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No project images found in /public/images/project.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectCases.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/cases/${encodeURIComponent(item.slug)}`}
                className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-lg"
              >
                <article>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-base font-bold text-slate-900 group-hover:text-[var(--brand-dark)]">{item.title}</h3>
                    <p className="mt-2 text-sm font-medium text-[var(--brand)]">View project gallery</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
