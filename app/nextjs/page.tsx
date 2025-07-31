import Link from "next/link";
import { metadata as isrMetadata } from "../nextjs-isr/metadata";
import { metadata as prefetchingMetadata } from "../nextjs-prefetching/metadata";
import { metadata as claudeCodeMetadata } from "../claude-code-personal-tutor/metadata";

interface NextJSPost {
  slug: string;
  title: string;
  description: string;
  date: string;
}

const nextjsPosts: NextJSPost[] = [
  {
    slug: "nextjs-isr",
    title: isrMetadata.title,
    description: isrMetadata.description,
    date: isrMetadata.date,
  },
  {
    slug: "nextjs-prefetching",
    title: prefetchingMetadata.title,
    description: prefetchingMetadata.description,
    date: prefetchingMetadata.date,
  },
  {
    slug: "claude-code-personal-tutor",
    title: claudeCodeMetadata.title,
    description: claudeCodeMetadata.description,
    date: claudeCodeMetadata.date,
  },
];

export default function NextJSPage() {
  const sortedPosts = [...nextjsPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mt-4 mb-8 text-[#3F5570] dark:text-gray-200">
        Next.js Posts
      </h1>
      
      <div className="grid gap-6 text-slate-700 dark:text-gray-300">
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-md dark:hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-3 group-hover:text-[#3F5570] dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                <time dateTime={post.date} className="font-medium">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}