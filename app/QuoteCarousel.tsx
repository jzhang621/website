"use client";

import { useState } from "react";

export function QuoteCarousel({ quotes }: { quotes: string[] }) {
  const [i, setI] = useState(0);
  const n = quotes.length;

  return (
    <figure
      className="rounded-2xl border p-4"
      style={{
        background: "color-mix(in srgb, var(--accent) 7%, var(--card))",
        borderColor: "color-mix(in srgb, var(--accent) 22%, var(--line))",
      }}
      aria-roledescription="carousel"
      aria-label="Learner comments on Hello Interview"
    >
      <blockquote className="min-h-[6.5rem] text-[15px] leading-snug" aria-live="polite">
        &ldquo;{quotes[i]}&rdquo;
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-2 text-xs font-semibold text-[var(--muted)]">
        <span>Learner comment</span>
        <span className="flex-1" />
        <button
          type="button"
          aria-label="Previous comment"
          onClick={() => setI((i + n - 1) % n)}
          className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)]"
        >
          &larr;
        </button>
        <span className="flex gap-1.5" aria-hidden>
          {quotes.map((_, j) => (
            <span
              key={j}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: j === i ? "var(--accent)" : "var(--line)" }}
            />
          ))}
        </span>
        <button
          type="button"
          aria-label="Next comment"
          onClick={() => setI((i + 1) % n)}
          className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)]"
        >
          &rarr;
        </button>
      </figcaption>
    </figure>
  );
}
