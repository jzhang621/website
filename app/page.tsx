import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

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
            <h1 className="text-4xl font-bold mb-8">Welcome to My Blog</h1>

            <div className="grid gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/${post.slug}`}
                        className="p-6 border-transparent border rounded-lg hover:border-gray-400 transition-colors"
                    >
                        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                        <div className="flex items-center justify-between text-gray-500">
                            <span>Read more →</span>
                            <time dateTime={post.date}>{post.date}</time>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
