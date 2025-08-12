/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',   // App router
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If you're mixing pages
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                bg0: 'var(--bg-0)',
                bg1: 'var(--bg-1)',
                bg2: 'var(--bg-2)',
                text_primary: 'var(--text-primary)',
                text_contrast: 'var(--text-contrast)',
                text_muted: 'var(--text-muted)',
                accent: 'var(--accent)',
                success: 'var(--success)',
                warning: 'var(--warning)',
                error: 'var(--error)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
        },
    },
    plugins: [],
};
