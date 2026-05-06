import Link from "next/link";
import { Locale, localeLabels, siteContent } from "@/lib/site-content";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const t = siteContent[locale];

  const navLinks = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/products`, label: t.nav.products },
    { href: `/${locale}/cases`, label: t.nav.cases },
    { href: `/${locale}/news`, label: t.nav.news },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/92 backdrop-blur">
      <div className="container-x flex min-h-18 items-center justify-between gap-6 py-3">
        <Link href={`/${locale}`} className="font-[var(--font-space-grotesk)] text-xl font-bold tracking-tight text-[var(--brand-dark)]">
          {t.brand}
        </Link>

        <nav className="hidden gap-5 text-sm font-semibold text-[var(--text-soft)] md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {(Object.keys(localeLabels) as Locale[]).map((lang) => (
            <Link
              key={lang}
              href={`/${lang}`}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                lang === locale
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--surface-alt)] text-[var(--brand-dark)] hover:bg-[var(--line)]"
              }`}
            >
              {localeLabels[lang]}
            </Link>
          ))}
        </div>

        <details className="group relative md:hidden">
          <summary className="inline-flex list-none items-center rounded-full border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold text-[var(--brand-dark)] marker:content-none">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>

          <div className="absolute right-0 top-12 w-[min(86vw,320px)] rounded-xl border border-[var(--line)] bg-white p-3 shadow-lg">
            <nav className="grid gap-2 text-sm font-semibold text-[var(--text-soft)]">
              {navLinks.map((item) => (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  className="rounded-lg px-3 py-2 hover:bg-[var(--surface-alt)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 flex items-center gap-2 border-t border-[var(--line)] pt-3">
              {(Object.keys(localeLabels) as Locale[]).map((lang) => (
                <Link
                  key={`mobile-lang-${lang}`}
                  href={`/${lang}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    lang === locale
                      ? "bg-[var(--brand)] text-white"
                      : "bg-[var(--surface-alt)] text-[var(--brand-dark)] hover:bg-[var(--line)]"
                  }`}
                >
                  {localeLabels[lang]}
                </Link>
              ))}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
