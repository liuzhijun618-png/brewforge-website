type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8 space-y-2">
      <h2 className="font-[var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
        {title}
      </h2>
      {subtitle ? <p className="max-w-3xl text-sm text-[var(--text-soft)] md:text-base">{subtitle}</p> : null}
    </div>
  );
}
