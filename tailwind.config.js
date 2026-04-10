/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0f',
                surface: '#12131c',
                panel: '#171923',
                accent: '#6366f1',
                muted: '#9ca3af',
                line: 'rgba(255, 255, 255, 0.08)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                glow: '0 0 0 1px rgba(99, 102, 241, 0.25), 0 0 30px rgba(99, 102, 241, 0.18)',
            },
            animation: {
                fadeUp: 'fadeUp 0.8s ease-out forwards',
                glowPulse: 'glowPulse 3s ease-in-out infinite',
                typewriter: 'typewriter 3.5s steps(28) 0.4s 1 both',
            },
            backgroundImage: {
                'grid-fade': 'radial-gradient(circle at top, rgba(99, 102, 241, 0.18), transparent 32%), linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
            },
        },
    },
    plugins: [],
}