import Link from "next/link";
import { Locale, siteContent } from "@/lib/site-content";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const t = siteContent[locale];

  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden py-20"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%), url(/images/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] min-h-[calc(100vh-5rem)]">
        <div className="space-y-8">
          <div>
            <div className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-300 border border-blue-500/30 mb-6">
              Global Brewing Solutions
            </div>
            <h1 className="font-bold tracking-tight text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-slate-200 leading-relaxed max-w-2xl mb-4">{t.heroSubtitle}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href={`/${locale}/contact`} className="brand-button brand-button-primary px-6 py-3 text-base font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
              {t.heroPrimaryCta}
            </Link>
            <Link href={`/${locale}/products`} className="border-2 border-white text-white px-6 py-3 text-base font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-all">
              {t.heroSecondaryCta}
            </Link>
          </div>

          <p className="text-sm text-slate-400 pt-2">{t.heroCta3RdLine}</p>

          <div className="pt-2 space-y-2 text-sm text-slate-300">
            {t.heroTrustBullets.map((bullet) => (
              <p key={bullet}>✓ {bullet}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800/80 backdrop-blur-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-8">{t.assessmentTitle}</h2>
          <ul className="space-y-5">
            {t.assessmentChecklist.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 border border-blue-500/50 mt-1">
                  <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-sm text-slate-400">
              <span className="text-blue-300 font-semibold">24-hour response:</span> We'll provide preliminary sizing, layout, and budget estimates within 24 hours of receiving your brief.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
