import Image from "next/image";
import Link from "next/link";
import { QuoteCarousel } from "./QuoteCarousel";

const HELLO_INTERVIEW = "https://www.hellointerview.com/learn/code";

const lessons = [
  {
    href: "/sliding-window",
    preview: "/sliding-window-preview.webp",
    alt: "Sliding window lesson on a phone: the Try it yourself question, with a five-number window highlighted above four answer buttons",
    title: "Sliding window",
    height: 763,
  },
  {
    href: "/basis-vectors",
    preview: "/basis-vectors-preview.webp",
    alt: "Linear transformations lesson on a phone: a sheared letter F with draggable basis arrows and a 2 by 2 matrix",
    title: "Linear transformations and matrices",
    height: 763,
  },
  {
    href: "/svd",
    preview: "/svd-preview.webp",
    alt: "Singular value decomposition lesson on a phone: a pixel-art city image with a draggable window and the grid of numbers it covers",
    title: "Singular value decomposition",
    height: 835,
  },
];

const points = [
  "16 patterns, from Two Pointers to Dynamic Programming",
  "120 lessons",
  "100+ interactive visualizations used to help understand algorithm patterns and solutions",
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
  "The interactive illustrations here are so helpful and really have made this so much easier to understand for me. Thank you!",
  "Animations and the style of explanation are top-notch - thank you!",
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
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="h-px flex-1 bg-[var(--line)]" aria-hidden />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Jimmy Zhang</h1>
          <span className="h-px flex-1 bg-[var(--line)]" aria-hidden />
        </div>
        <p className="mt-3 text-center text-sm font-bold uppercase tracking-widest text-[var(--muted)]">
          Portfolio for Brilliant&rsquo;s Learning Designer roles
        </p>
      </section>

      <article className="work-card grid gap-8 p-5 sm:p-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
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

      <section aria-label="Interactive lessons" className="mt-14">
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-[var(--line)]" aria-hidden />
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Interactive lessons</h2>
          <span className="h-px flex-1 bg-[var(--line)]" aria-hidden />
        </div>
        <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3 md:justify-items-center">
        {lessons.map((l) => (
          <Link key={l.href} href={l.href} className="lesson-card group mx-auto flex w-full max-w-[340px] flex-col p-4">
            <h3 className="px-1 text-xl font-extrabold leading-tight tracking-tight md:min-h-[3.1rem]">
              {l.title.slice(0, l.title.lastIndexOf(" ") + 1)}
              <span className="whitespace-nowrap">
                {l.title.slice(l.title.lastIndexOf(" ") + 1)}
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1" aria-hidden>
                  &rarr;
                </span>
              </span>
            </h3>
            <div className="phone mt-3.5 w-full">
              <Image src={l.preview} alt={l.alt} width={520} height={l.height} className="h-auto w-full" />
            </div>
          </Link>
        ))}
        </div>
      </section>
    </main>
  );
}
