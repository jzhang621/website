import rehypePrettyCode from "rehype-pretty-code";
import createMDX from "@next/mdx";
import bundleAnalyzer from "@next/bundle-analyzer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const prettyCodeOptions = {
  theme: "github-light",
  keepBackground: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeKatex],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/cache',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=60, public',
          },
        ],
      },
    ];
  },
};

export default process.env.ANALYZE === "true" ? withBundleAnalyzer(withMDX(nextConfig)) : withMDX(nextConfig);
