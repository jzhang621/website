"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Slide = { src: string; alt: string; width: number; height: number };

export function Carousel({ slides, label }: { slides: Slide[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div role="group" aria-roledescription="carousel" aria-label={label} className="relative">
      <ul
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <li
            key={s.src}
            className="w-full shrink-0 snap-center"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <div className="phone flex aspect-[4/3] items-center justify-center" style={{ background: "var(--card)" }}>
              <Image src={s.src} alt={s.alt} width={s.width} height={s.height} className="h-auto max-h-full w-full object-contain" />
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label="Previous screenshot"
        onClick={() => go(index - 1)}
        disabled={index === 0}
        className="carousel-btn left-3"
      >
        &larr;
      </button>
      <button
        type="button"
        aria-label="Next screenshot"
        onClick={() => go(index + 1)}
        disabled={index === slides.length - 1}
        className="carousel-btn right-3"
      >
        &rarr;
      </button>

      <div className="mt-3 flex justify-center gap-2" aria-hidden>
        {slides.map((s, i) => (
          <span
            key={s.src}
            className="h-2 w-2 rounded-full transition-colors"
            style={{ background: i === index ? "var(--accent)" : "var(--line)" }}
          />
        ))}
      </div>
    </div>
  );
}
