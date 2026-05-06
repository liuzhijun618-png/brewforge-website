import Link from "next/link";
import { Locale, siteContent } from "@/lib/site-content";

type CtaBandProps = {
  locale: Locale;
};

export function CtaBand({ locale }: CtaBandProps) {
  const t = siteContent[locale];

  return (
    <section className="section-gap">
      <div className="container-x">
        <div className="rounded-3xl bg-[var(--brand-dark)] p-8 text-white md:p-10">
          <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold tracking-tight">{t.ctaTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">{t.ctaBody}</p>
          <Link href={`/${locale}/contact`} className="brand-button mt-5 bg-white text-[var(--brand-dark)] hover:bg-[#eef9f3]">
            Talk To Engineer
          </Link>
        </div>
      </div>
    </section>
  );
}
