import type { Metadata } from "next";
import { SectionTitle } from "@/components/site/section-title";
import { isLocale, siteContent } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "About",
    description:
      "Learn about our capabilities in commercial brewing equipment and engineering delivery.",
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const t = siteContent[locale];

  return (
    <section className="section-gap">
      <div className="container-x">
        <SectionTitle title={t.aboutTitle} />
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[var(--line)] bg-white p-5 md:col-span-2">
            <p className="text-sm leading-7 text-[var(--text-soft)]">{t.aboutBody}</p>
          </article>
          <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
            <h3 className="font-[var(--font-space-grotesk)] text-lg font-bold text-[var(--foreground)]">
              Core Capabilities
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-soft)]">
              <li>• Brewing process design</li>
              <li>• Equipment manufacturing and QA</li>
              <li>• Turnkey project delivery</li>
              <li>• Long-term service and spare parts</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
