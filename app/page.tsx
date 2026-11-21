import Image from "next/image";
import Link from "next/link";

const HELLO_INTERVIEW = "https://www.hellointerview.com/learn/code";

const lessons = [
  {
    href: "/sliding-window",
    preview: "/sliding-window-preview.webp",
    alt: "Sliding window lesson on a phone: three worked examples and a row of numbers to drag across",
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
  ["16", "patterns, from Two Pointers to Dynamic Programming"],
  ["120", "lessons"],
  ["300+", "interactive visualizations to play and step through"],
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

      <a href={HELLO_INTERVIEW} className="work-card group mt-8 flex flex-col p-5 sm:p-6">
        <ul className="mb-6 space-y-2.5 text-lg sm:text-xl">
          {points.map(([n, label]) => (
            <li key={label} className="flex items-baseline gap-3">
              <span aria-hidden style={{ color: "var(--accent)" }}>&#9679;</span>
              <span>
                <strong className="font-extrabold" style={{ color: "var(--accent)" }}>{n}</strong>{" "}
                <span className="text-[var(--muted)]">{label}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="grid items-center gap-4 md:grid-cols-2">
          <div className="phone">
            <Image
              src="/hello-interview-article.webp"
              alt="A Hello Interview lesson article: a recursion tree for climbing stairs with explanatory text and a caption"
              width={1000}
              height={583}
              className="h-auto w-full"
            />
          </div>
          <div className="phone">
            <Image
              src="/hello-interview-preview.webp"
              alt="A Hello Interview lesson: an animated two-pointer visualization stepping through code"
              width={1000}
              height={702}
              className="h-auto w-full"
            />
          </div>
        </div>
        <ul className="mt-5 grid gap-3 md:grid-cols-3" aria-label="Learner comments on Hello Interview">
          {quotes.map((q) => (
            <li key={q} className="rounded-2xl border border-[var(--line)] p-4 text-sm leading-snug">
              <span aria-hidden className="mr-1 text-xl font-extrabold leading-none" style={{ color: "var(--accent)" }}>
                &ldquo;
              </span>
              {q}
              <span className="mt-2 block text-xs font-semibold text-[var(--muted)]">Learner comment on Hello Interview</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Learn DSA Through Visualizations</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Hello Interview &middot; every lesson written by me</p>
          </div>
          <span className="work-cta shrink-0 rounded-2xl px-4 py-2.5 text-sm font-bold">See it &#8599;</span>
        </div>
      </a>

      <footer className="mt-20 border-t border-[var(--line)] pt-8 text-sm text-[var(--muted)]">
        More lessons are on the way.
      </footer>
    </main>
  );
}
