import type { Metadata } from "next";
import { SectionTitle } from "@/components/site/section-title";
import { isLocale, news, siteContent } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "News",
    description:
      "Publish engineering insights and project updates to expand keyword coverage and authority.",
  };
}

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const t = siteContent[locale];

  return (
    <section className="section-gap">
      <div className="container-x">
        <SectionTitle title={t.nav.news} subtitle="Long-term recommendation: publish 1-2 high-quality industry posts every week." />
        <div className="grid gap-4 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--brand)]">{item.date}</p>
              <h3 className="mt-2 text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-soft)]">{item.brief}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
