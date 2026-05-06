import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-gap">
      <div className="container-x rounded-2xl border border-[var(--line)] bg-white p-8 text-center shadow-soft">
        <h1 className="font-[var(--font-space-grotesk)] text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-[var(--text-soft)]">The page you requested is unavailable.</p>
        <Link href="/en" className="brand-button brand-button-primary mt-5">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
