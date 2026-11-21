import Image from "next/image";
import Link from "next/link";
import { QuoteCarousel } from "./QuoteCarousel";

const HELLO_INTERVIEW = "https://www.hellointerview.com/learn/code";

const lessons = [
  {
    href: "/sliding-window",
    preview: "/sliding-window-preview.webp",
    alt: "Sliding window lesson on a phone: after choosing Expand right correctly, with the flowchart highlighting that step and a Next button",
    title: "Sliding window",
  },
  {
    href: "/basis-vectors",
    preview: "/basis-vectors-preview.webp",
    alt: "Linear transformations lesson on a phone: a sheared letter F with draggable basis arrows and a 2 by 2 matrix",
    title: "Linear transformations and matrices",
  },
];

const points = [
  "16 patterns, from Two Pointers to Dynamic Programming",
  "120 lessons",
  "100+ interactive visualizations used to help understand algorithm solutions",
];

const tiles = [
  {
    title: "Two pointers",
    href: `${HELLO_INTERVIEW}/two-pointers/overview`,
    src: "/hello-interview-preview.webp",
    alt: "A Hello Interview lesson: an animated two-pointer visualization stepping through code",
    width: 1000,
    height: 702,
  },
  {
    title: "Recursion",
    href: `${HELLO_INTERVIEW}/depth-first-search/introduction`,
    src: "/hello-interview-article.webp",
    alt: "A Hello Interview lesson article: a recursion tree for climbing stairs with explanatory text and a caption",
    width: 1000,
    height: 583,
  },
  {
    title: "Linked Lists",
    href: `${HELLO_INTERVIEW}/linked-list/overview`,
    src: "/hello-interview-cycle.webp",
    alt: "A Hello Interview linked list visualization: slow and fast pointers detecting a cycle",
    width: 1000,
    height: 745,
  },
  {
    title: "Backtracking",
    href: `${HELLO_INTERVIEW}/backtracking/overview`,
    src: "/hello-interview-backtracking.webp",
    alt: "A Hello Interview backtracking visualization: a decision tree being explored to find paths that sum to a target",
    width: 1000,
    height: 537,
  },
];

const quotes = [
  "Animations and the style of explanation are top-notch - thank you!",
  "The interactive illustrations here are so helpful and really have made this so much easier to understand for me. Thank you!",
  "This is the cleanest explanation I have read about Dynamic Programming. Love your work!",
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 pt-8 sm:px-8">
      <header className="flex items-center justify-end gap-5 text-sm font-semibold text-[var(--muted)]">
        <a href="https://github.com/jzhang621" className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/jzhang621"
          className="underline-offset-4 hover:text-[var(--ink)] hover:underline"
        >
          LinkedIn
        </a>
      </header>

      <section className="pb-12 pt-14 sm:pt-20">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Jimmy Zhang</h1>
        <p className="mt-3 text-sm font-bold uppercase tracking-widest text-[var(--muted)]">
          Portfolio for Brilliant&rsquo;s Learning Designer roles
        </p>
      </section>

      <section aria-label="Interactive lessons" className="grid gap-8 md:grid-cols-2">
        {lessons.map((l) => (
          <Link key={l.href} href={l.href} className="work-card group flex flex-col p-5 sm:p-6">
            <div className="phone mx-auto w-full max-w-[300px]">
              <Image src={l.preview} alt={l.alt} width={520} height={1126} className="h-auto w-full" />
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <h2 className="text-xl font-extrabold tracking-tight">{l.title}</h2>
              <span className="work-cta shrink-0 rounded-2xl px-4 py-2.5 text-sm font-bold">Open &rarr;</span>
            </div>
          </Link>
        ))}
      </section>

      <article className="work-card mt-8 grid gap-8 p-5 sm:p-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
            Hello Interview &middot; primary author
          </p>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
            An interactive data structures and algorithms course
          </h2>
          <a
            href={HELLO_INTERVIEW}
            className="-mt-2 text-[15px] font-bold underline-offset-4 hover:underline"
            style={{ color: "var(--accent)" }}
          >
            See the course &#8599;
          </a>
          <ul className="list-disc space-y-2.5 pl-5 text-base marker:text-[var(--accent)]">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <QuoteCarousel quotes={quotes} />
        </div>

        <ul className="grid grid-cols-2 content-center gap-x-4 gap-y-5" aria-label="Hello Interview lesson screenshots">
          {tiles.map((t) => (
            <li key={t.title}>
              <a href={t.href} className="block">
                <div className="flex aspect-[4/3] items-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)]">
                  <Image
                    src={t.src}
                    alt={t.alt}
                    width={t.width}
                    height={t.height}
                    sizes="(min-width: 768px) 280px, 45vw"
                    className="h-auto w-full"
                  />
                </div>
                <span className="mt-2 block text-sm font-bold">{t.title} &#8599;</span>
              </a>
            </li>
          ))}
        </ul>
      </article>

      <footer className="mt-20 border-t border-[var(--line)] pt-8 text-sm text-[var(--muted)]">
        More lessons are on the way.
      </footer>
    </main>
  );
}
