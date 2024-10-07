import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            keyframes: {
                "pulse-slightly": {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.15)" }, // Slight increase
                },
            },
            animation: {
                "pulse-slightly": "pulse-slightly 2s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
export default config;
