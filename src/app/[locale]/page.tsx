import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { SectionTitle } from "@/components/site/section-title";
import { loadProjectCases } from "@/lib/project-cases";
import { isLocale, news, siteContent } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Turnkey Brewery Equipment Manufacturer | Zhejiang Brew Equipment",
    description:
      "Custom brewhouse equipment, fermentation tanks, and turnkey brewery systems for craft breweries and commercial beer plants worldwide. 5HL–100HL+ capacity. Factory-direct from China.",
    keywords: "brewery equipment manufacturer, turnkey brewery system, commercial brewing equipment, craft brewery equipment, fermentation tanks, brewhouse equipment, used brewery equipment"
  };
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const t = siteContent[locale];
  const featuredCases = (await loadProjectCases()).slice(0, 3);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t.brand,
    url: `https://example.com/${locale}`,
    description: t.aboutBody,
    areaServed: ["EU", "US", "JP", "KR", "SG"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Hero locale={locale} />

      {/* Recent Brewery Projects Delivered */}
      <section className="section-gap bg-white">
        <div className="container-x">
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-4">Recent Brewery Projects Delivered</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-slate-600">
            Real brewery equipment projects delivered for international customers with practical engineering execution.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredCases.map((projectCase) => (
              <article key={projectCase.slug} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[var(--brand)] hover:shadow-lg">
                <img alt={projectCase.title} src={projectCase.imageUrl} className="mb-5 h-44 w-full rounded-xl object-cover border border-slate-200" />
                <h3 className="line-clamp-2 text-base font-bold text-slate-900">{projectCase.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Selected from real delivery galleries in Cases.
                </p>
                <Link
                  href={`/${locale}/cases/${encodeURIComponent(projectCase.slug)}`}
                  className="mt-5 inline-block text-sm font-semibold text-[var(--brand)] hover:underline"
                >
                  View Project Details →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-gap bg-white">
        <div className="container-x">
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-4">Why Breweries Choose Us</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-slate-600">
            Engineering-focused support from factory production to installation, commissioning, and long-term operations.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[var(--brand)] hover:bg-white hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V9l7-4 7 4v12M9 14h6M9 17h6" />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">Direct factory manufacturing</h3>
              <p className="text-sm text-slate-600">No middleman. Better cost control, lead-time visibility, and production consistency.</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[var(--brand)] hover:bg-white hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h10M15 18h6" />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">Custom brewery layout design</h3>
              <p className="text-sm text-slate-600">Process-oriented brewhouse, fermentation, and utility layouts matched to your target output.</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[var(--brand)] hover:bg-white hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 6M4 19h16" />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">Full installation support</h3>
              <p className="text-sm text-slate-600">On-site or remote commissioning guidance with startup checks and process validation.</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[var(--brand)] hover:bg-white hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">Experienced export team</h3>
              <p className="text-sm text-slate-600">International documentation, packing standards, and shipping coordination for global projects.</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[var(--brand)] hover:bg-white hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M4 12a8 8 0 1116 0 8 8 0 01-16 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">Reliable after-sales service</h3>
              <p className="text-sm text-slate-600">Spare parts planning, troubleshooting response, and continuous technical support.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="section-gap bg-slate-900">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat) => (
              <div key={stat.label} className="text-center py-4">
                <div className="text-4xl font-bold text-[var(--brand)] mb-2">{stat.value}</div>
                <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brewery Equipment Solutions */}
      <section className="section-gap bg-white">
        <div className="container-x">
          <SectionTitle title={t.sections.solutions} />
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            We provide complete brewery equipment solutions for every stage of production.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.solutions.map((solution) => (
              <article key={solution.title} className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-[var(--brand)] hover:shadow-lg transition-all flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{solution.title}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-grow">{solution.description}</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 mb-3"><span className="font-semibold text-slate-700">Applications:</span> {solution.applications}</p>
                  <Link href={`/${locale}/products`} className="text-[var(--brand)] font-semibold text-sm hover:underline">
                    Request Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Common Problems We Help Breweries Avoid */}
      <section className="section-gap">
        <div className="container-x">
          <SectionTitle title={t.sections.painPoints} />
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Avoid costly mistakes and project delays with expert brewery planning.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {t.painPoints.map((point) => (
              <article key={point.title} className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 hover:border-[var(--brand)] hover:shadow-lg transition-all">
                <h3 className="text-base font-bold text-slate-900 mb-3">{point.title}</h3>
                <p className="text-sm text-slate-700">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Advantages Section */}
      <section className="section-gap bg-slate-50">
        <div className="container-x">
          <SectionTitle title={t.sections.advantages} />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {t.advantages.map((advantage) => (
              <article key={advantage.title} className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-[var(--brand)] hover:shadow-lg transition-all">
                <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--brand)]/20 to-[var(--brand)]/10 flex items-center justify-center border border-[var(--brand)]/20 group-hover:border-[var(--brand)]/50 transition-all">
                  <svg className="w-6 h-6 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{advantage.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{advantage.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Company Credibility */}
      <section className="section-gap bg-slate-900 text-slate-100">
        <div className="container-x">
          <h2 className="text-3xl font-bold text-white mb-4">About Our Brewery Equipment Factory</h2>
          <p className="mt-4 max-w-4xl text-slate-300 mb-10">
            We are a direct manufacturer based in Zhejiang, China, specializing in brewery equipment for over 20 years.
          </p>
          
          {/* Factory Gallery */}
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <img alt="Factory floor view" src="/images/factory/纵环厂景 (24).JPG" className="h-48 w-full rounded-xl object-cover border border-slate-700" />
            <img alt="Equipment production" src="/images/factory/纵环厂景 (38).JPG" className="h-48 w-full rounded-xl object-cover border border-slate-700" />
            <img alt="Factory workspace" src="/images/factory/容器车间生产.jpg" className="h-48 w-full rounded-xl object-cover border border-slate-700" />
            <img alt="Quality control" src="/images/factory/机械抛光车间.jpg" className="h-48 w-full rounded-xl object-cover border border-slate-700" />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6">
              <h3 className="text-lg font-semibold text-white">Our factory produces:</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• Brewhouse systems</li>
                <li>• Fermentation tanks</li>
                <li>• Complete turnkey brewery solutions</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6">
              <h3 className="text-lg font-semibold text-white">Global delivery and support:</h3>
              <p className="mt-4 text-sm text-slate-300">
                We have delivered brewery projects to customers in Europe, North America, Japan, Korea, and Southeast Asia.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• Custom design</li>
                <li>• Installation guidance</li>
                <li>• After-sales service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strong Conversion Section */}
      <section className="section-gap bg-white">
        <div className="container-x">
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-slate-50 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900">Start Your Brewery Project Today</h2>
            <p className="mt-4 max-w-3xl text-slate-600">
              Send us your brewery requirements, and our engineers will provide a customized solution within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="brand-button brand-button-primary rounded-lg px-8 py-3 text-base font-semibold"
              >
                Get My Brewery Plan Now
              </Link>
              <p className="text-sm font-semibold text-orange-700">Limited engineering slots available this week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="section-gap bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="container-x max-w-2xl">
          <SectionTitle title="Get Your Brewery Equipment Solution in 24 Hours" />
          <p className="text-center text-slate-600 mb-6">
            Tell us your project details and our engineers will send you a customized brewery layout and quotation.
          </p>
          <div className="mb-8 grid gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 text-sm text-slate-700 md:grid-cols-2">
            <p>✓ Free engineering consultation</p>
            <p>✓ No obligation, no spam</p>
            <p>✓ Fast response within 24 hours</p>
            <p>✓ Experienced export team support</p>
          </div>
          <form className="bg-white rounded-2xl border border-slate-200 p-8" action="/api/inquiry" method="POST">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Your Name *</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Business Email *</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Your Country *</label>
                  <input type="text" name="country" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Planned Brewery Capacity (HL) *</label>
                  <input type="text" name="capacity" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Equipment Type *</label>
                <select name="equipment_type" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20">
                  <option value="">Select an option</option>
                  <option value="new">New Equipment</option>
                  <option value="used">Used Equipment</option>
                  <option value="both">Either New or Used</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Describe your project, timeline, and requirements</label>
                <textarea name="message" rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20" placeholder="Example: We are planning a 1000L craft brewery in Germany, target launch in 6 months."></textarea>
              </div>
              <input type="hidden" name="company" value="brewery" />
              <button type="submit" className="w-full brand-button brand-button-primary py-3 text-lg font-semibold rounded-lg hover:shadow-lg transition-all">
                Get My Free Brewery Plan
              </button>
              <p className="text-center text-sm font-semibold text-orange-700">Limited engineering slots available this week.</p>
              <p className="text-center text-xs text-slate-500">We respect your privacy and will not share your information.</p>
            </div>
          </form>
        </div>
      </section>

      {/* Technical Updates / News */}
      <section className="section-gap bg-white">
        <div className="container-x">
          <SectionTitle title={t.sections.news} />
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 hover:border-[var(--brand)] hover:shadow-lg transition-all hover:-translate-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">{item.date}</p>
                <h3 className="mt-3 text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.brief}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Above Footer */}
      <section className="section-gap bg-slate-900">
        <div className="container-x">
          <div className="rounded-3xl border border-slate-700 bg-slate-800/70 p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold text-white">Ready to Start Your Brewery Project?</h2>
            <p className="mx-auto mt-4 max-w-3xl text-slate-300">
              Whether you are building a new brewery or expanding production, our engineering team is ready to help.
            </p>
            <div className="mt-7">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-lg bg-[var(--brand)] px-8 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
              >
                Request Your Brewery Equipment Quote Today
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">Fast response. Professional support. No obligation.</p>
          </div>
        </div>
      </section>

    </>
  );
}
