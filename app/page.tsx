import Image from "next/image";
import Link from "next/link";

const CS_ROLE = "https://jobs.lever.co/brilliant/0c5c22a0-4487-4435-af54-fe39ef33fbec";
const MATH_ROLE = "https://jobs.lever.co/brilliant/b0b97281-179b-4b47-b5d6-a0cfaad3f425";

type Lesson = {
  href: string;
  preview: string;
  alt: string;
  accent: string;
  role: string;
  roleHref: string;
  title: string;
  summary: string;
  moves: string[];
};

const lessons: Lesson[] = [
  {
    href: "/sliding-window",
    preview: "/sliding-window-preview.webp",
    alt: "Sliding window lesson on a phone: three worked examples and a row of numbers to drag across",
    accent: "var(--cs)",
    role: "CS Learning Designer",
    roleHref: CS_ROLE,
    title: "Sliding window",
    summary:
      "An algorithm taught as a decision you make, not a recipe you read. You hunt for a subarray that hits a target, then see why a moving window beats checking everything.",
    moves: [
      "Try the problem by dragging across the numbers",
      "Compare brute force to the window, side by side",
      "Predict whether to shrink or extend",
      "Step through the flowchart and code",
    ],
  },
  {
    href: "/basis-vectors",
    preview: "/basis-vectors-preview.webp",
    alt: "Linear transformations lesson on a phone: a sheared letter F with draggable basis arrows and a 2 by 2 matrix",
    accent: "var(--math)",
    role: "Math Learning Designer",
    roleHref: MATH_ROLE,
    title: "Linear transformations and matrices",
    summary:
      "A matrix is just where two arrows land. Push the arrows around and watch the shape, and the four numbers, move together.",
    moves: [
      "Drag the two basis vectors",
      "Read the matrix as you move them",
      "Tap Rotate, Shear, Stretch or Flip",
      "Solve tap-based puzzles, no keyboard",
    ],
  },
];

const HELLO_INTERVIEW = "https://www.hellointerview.com/learn/code";

const patterns = [
  "Two Pointers", "Sliding Window", "Intervals", "Stack", "Linked List", "Binary Search",
  "Heap", "DFS", "BFS", "Backtracking", "Graphs", "Dynamic Programming",
  "Greedy", "Trie", "Prefix Sum", "Matrices",
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

      <section aria-label="Lessons" className="grid gap-8 md:grid-cols-2">
        {lessons.map((l) => (
          <article
            key={l.href}
            className="work-card flex flex-col p-5 sm:p-6"
            style={{ ["--accent" as string]: l.accent }}
          >
            <Link href={l.href} className="phone mx-auto block w-full max-w-[300px]" aria-label={`Open ${l.title}`}>
              <Image src={l.preview} alt={l.alt} width={520} height={1040} className="h-auto w-full" />
            </Link>

            <div className="mt-6 flex flex-1 flex-col">
              <a
                href={l.roleHref}
                className="text-xs font-bold uppercase tracking-widest underline-offset-4 hover:underline"
                style={{ color: "var(--accent)" }}
              >
                For the {l.role} role &#8599;
              </a>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight">{l.title}</h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">{l.summary}</p>
              <ul className="mt-4 space-y-1.5 text-sm leading-snug">
                {l.moves.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span aria-hidden style={{ color: "var(--accent)" }}>&#9679;</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={l.href}
                className="work-cta mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-base font-bold sm:w-auto sm:self-start"
              >
                Open the lesson &rarr;
              </Link>
            </div>
          </article>
        ))}
      </section>

      <a
        href={HELLO_INTERVIEW}
        className="work-card mt-8 grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[1fr_1.4fr]"
        style={{ ["--accent" as string]: "var(--cs)" }}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            Earlier work
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Learn DSA Through Visualizations</h2>
          <p className="mt-3 leading-relaxed text-[var(--muted)]">
            The Hello Interview guide I originally wrote in 2024&ndash;25.
          </p>
          <span className="mt-5 inline-block font-bold" style={{ color: "var(--accent)" }}>
            See the guide &#8599;
          </span>
        </div>
        <ul className="flex flex-wrap gap-2" aria-label="Patterns covered">
          {patterns.map((n) => (
            <li
              key={n}
              className="rounded-full border border-[var(--line)] px-3.5 py-1.5 text-sm font-semibold"
            >
              {n}
            </li>
          ))}
        </ul>
      </a>

      <footer className="mt-20 border-t border-[var(--line)] pt-8 text-sm text-[var(--muted)]">
        More lessons are on the way. They will show up here.
      </footer>
    </main>
  );
}
