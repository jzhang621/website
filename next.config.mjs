import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from "rehype-pretty-code";
import createMDX from "@next/mdx";

const prettyCodeOptions = {
    theme: "github-light",
    keepBackground: true,
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, [rehypePrettyCode, prettyCodeOptions]],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    reactStrictMode: true,
};

export default withMDX(nextConfig);
