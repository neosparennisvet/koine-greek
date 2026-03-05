/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        night:   '#0d0f14',
        deep:    '#13161e',
        card:    '#1a1e2a',
        rim:     '#2a3045',
        muted:   '#4a5270',
        soft:    '#8892aa',
        textc:   '#c8d0e0',
        bright:  '#eef2ff',
        gold:    '#d4a843',
        goldl:   '#f0c96a',
        goldd:   '#9b7520',
        amber:   '#e07b39',
        teal:    '#3a9e8f',
        tealb:   '#4dc3b2',
        rose:    '#c0445a',
        indigo:  '#5b6ef5',
        indigol: '#7c8ef8',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,67,.12) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
