import Link from "next/link";
import { CaseStudy, Product } from "@/lib/site-content";

type ProductCardProps = {
  product: Product;
  locale: "en" | "zh";
};

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-blue-400 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{product.capacity}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{product.name}</h3>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{product.brief}</p>
      <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:gap-3 transition-all">
        Request proposal
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </Link>
    </article>
  );
}

type CaseCardProps = {
  item: CaseStudy;
};

export function CaseCard({ item }: CaseCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 hover:border-blue-400 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
        {item.country}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{item.brief}</p>
    </article>
  );
}
