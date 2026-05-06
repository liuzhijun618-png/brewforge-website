import Link from "next/link";
import { Locale, siteContent } from "@/lib/site-content";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const t = siteContent[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white">
      <div className="container-x py-10 text-sm text-[var(--text-soft)]">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[var(--foreground)]">{t.brand}</p>
            <p>{t.footerTagline}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/products`}>{t.nav.products}</Link>
            <Link href={`/${locale}/cases`}>{t.nav.cases}</Link>
            <Link href={`/${locale}/news`}>{t.nav.news}</Link>
            <Link href={`/${locale}/contact`}>{t.nav.contact}</Link>
          </div>
        </div>
        <p className="mt-6 text-xs">© {year} {t.brand}. All rights reserved.</p>
      </div>
    </footer>
  );
}
