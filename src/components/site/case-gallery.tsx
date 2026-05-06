"use client";

import { useEffect, useState } from "react";

type CaseGalleryProps = {
  title: string;
  imageUrls: string[];
};

export function CaseGallery({ title, imageUrls }: CaseGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) {
            return current;
          }

          return (current + 1) % imageUrls.length;
        });
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) {
            return current;
          }

          return (current - 1 + imageUrls.length) % imageUrls.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, imageUrls.length]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {imageUrls.map((imageUrl, index) => (
          <button
            key={imageUrl}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-lg"
          >
            <img
              src={imageUrl}
              alt={`${title} image ${index + 1}`}
              className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-semibold text-slate-900">Image {index + 1}</span>
              <span className="text-sm font-medium text-[var(--brand)]">View larger</span>
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 sm:p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image preview`}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-2 top-2 z-10 rounded-full bg-white/95 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white sm:right-3 sm:top-3"
            >
              Close
            </button>
            <img
              src={imageUrls[activeIndex]}
              alt={`${title} image ${activeIndex + 1}`}
              className="max-h-[72vh] w-full rounded-2xl object-contain sm:max-h-[82vh]"
            />
            <div className="mt-4 hidden items-center justify-between text-white sm:flex">
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex - 1 + imageUrls.length) % imageUrls.length)}
                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
              >
                Previous
              </button>
              <span className="text-sm font-medium">
                Image {activeIndex + 1} / {imageUrls.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % imageUrls.length)}
                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
              >
                Next
              </button>
            </div>
            <div className="mt-3 rounded-2xl bg-slate-900/80 p-3 text-white shadow-lg sm:hidden">
              <div className="mb-3 flex items-center justify-center text-sm font-medium">
                Image {activeIndex + 1} / {imageUrls.length}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex - 1 + imageUrls.length) % imageUrls.length)}
                  className="rounded-xl border border-white/20 px-3 py-3 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                    Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % imageUrls.length)}
                  className="rounded-xl border border-white/20 px-3 py-3 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}