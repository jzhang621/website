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
                if (files.some((file) => file.match(/^page\.(mdx|tsx)$/))) {
                    // load the page and then extract the metadata object
                    const { metadata } = await import(`./${entry.name}/page.mdx`);
                    if (metadata.published) {
                        // For MDX files, you might want to read the file to extract the title
                        // For now, we'll just use the directory name as the title
                        posts.push({
                            ...metadata,
                            slug: entry.name,
                        });
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
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Jimmy Meets World!</h1>

            <div className="text-lg text-gray-500">
                Hey there! I'm Jimmy, and I like using visuals to help explain concepts I find
                interesting.
            </div>

            <div className="my-12  border-[#B0807038] lg:mx-12 mx-2">
                <div className="my-4 mx-auto lg:w-[90%]">
                    <AnimatedArray />
                    <div className="text-center mx-auto text-sm text-gray-400 my-4">
                        An animation of bubble sort I made for fun
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-semibold mb-2 mt-12">Posts</h2>

            <div className="grid gap-6 text-slate-700">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/${post.slug}`}
                        className="px-4 py-6 border-transparent border rounded-lg hover:border-gray-400 transition-colors hover:bg-gray-50"
                    >
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <div className="flex items-center justify-between text-gray-500">
                            {/* <span>Read more →</span> */}
                            <time dateTime={post.date}>{post.date}</time>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
