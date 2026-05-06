import type { Metadata } from "next";
import { InquiryForm } from "@/components/site/inquiry-form";
import { SectionTitle } from "@/components/site/section-title";
import { isLocale, siteContent } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Contact",
    description:
      "Share your project requirements and get a practical equipment proposal.",
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const t = siteContent[locale];

  return (
    <section className="section-gap">
      <div className="container-x grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionTitle title={t.contactTitle} subtitle={t.contactBody} />
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5 text-sm text-[var(--text-soft)]">
            <p>Email: sales@example.com</p>
            <p className="mt-2">Phone: +86-000-0000-0000</p>
            <p className="mt-2">Address: Jinan, Shandong, China</p>
          </div>
        </div>
        <InquiryForm locale={locale} />
      </div>
    </section>
  );
}
