import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import createMDX from '@next/mdx';

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    reactStrictMode: true,
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
