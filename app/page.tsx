import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import AnimatedArray from "@/components/animations/AnimatedArray";

interface BlogPost {
  slug: string;
  title: string;
  published: boolean;
  description: string;
  date: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), "app");
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true });

  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Check for page.mdx or page.tsx in each directory
      try {
        const files = await fs.readdir(path.join(postsDirectory, entry.name));
        if (files.some((file) => file.match(/^page\.mdx$/))) {
          try {
            const { metadata } = await import(`./${entry.name}/metadata.tsx`);

            // load the metadata and then extract the metadata object
            if (metadata.published) {
              posts.push({
                ...metadata,
                slug: entry.name,
              });
            }
          } catch (error) {
            console.error(`Error importing metadata from ${entry.name}:`, error);
          }
        }
      } catch (error) {
        console.error(`Error reading directory ${entry.name}:`, error);
      }
    }
  }

  return posts;
}

export default async function Home() {
  const posts = await getBlogPosts();

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-[#3F5570] dark:text-gray-200 text-center">
        Jimmy Meets World
      </h1>

      <div className="text-lg text-gray-500 dark:text-gray-400">
        Hey there! I&apos;m Jimmy, and I like using visuals to make things easier to understand.
      </div>

      <div className="my-12 border-[#B0807038] dark:border-gray-700 lg:mx-12 mx-2">
        <div className="my-4 mx-auto lg:w-[90%]">
          <AnimatedArray />
          <div className="text-center mx-auto text-sm text-gray-400 dark:text-gray-500 my-4">
            Bubble sort, animated!
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-2 mt-12 text-slate-700 dark:text-gray-200">Posts</h2>

      <div className="grid gap-6 text-slate-700 dark:text-gray-300">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="px-4 py-6 border-transparent border rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
              {/* <span>Read more →</span> */}
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
