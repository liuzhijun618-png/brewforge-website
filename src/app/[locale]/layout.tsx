import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@/components/site/analytics";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getAbsoluteUrl, getBaseUrl } from "@/lib/site-config";
import { isLocale, locales, siteContent } from "@/lib/site-content";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const t = siteContent[locale];
  const localeUrl = getAbsoluteUrl(`/${locale}`);

  return {
    metadataBase: new URL(getBaseUrl()),
    title: {
      default: `${t.brand} | Commercial Brewing Equipment`,
      template: `%s | ${t.brand}`,
    },
    description:
      "Commercial brewing equipment, turnkey production lines, and engineering service from system design to commissioning.",
    openGraph: {
      title: `${t.brand} | Commercial Brewing Equipment`,
      description:
        "Commercial brewing equipment and turnkey brewery engineering.",
      type: "website",
      locale: "en_US",
      url: localeUrl,
    },
    alternates: {
      languages: {
        en: getAbsoluteUrl("/en"),
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <Analytics />
    </div>
  );
}
