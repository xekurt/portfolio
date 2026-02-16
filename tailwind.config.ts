import type { Config } from "tailwindcss";

export default {
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
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                accent: "var(--accent)",
                muted: "var(--muted)",
            },
            fontFamily: {
                sans: ['var(--font-outfit)', 'sans-serif'],
                iranian: ['var(--font-vazirmatn)', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 3s linear infinite',
                'spin-slow': 'spin-slow 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                'spin-slow': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
} satisfies Config;
