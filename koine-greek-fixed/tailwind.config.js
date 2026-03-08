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
        // Dark theme (defaults via CSS vars)
        night:   'var(--c-bg)',
        deep:    'var(--c-surface)',
        card:    'var(--c-card)',
        rim:     'var(--c-border)',
        muted:   'var(--c-muted)',
        soft:    'var(--c-soft)',
        textc:   'var(--c-text)',
        bright:  'var(--c-heading)',
        // Accent colors (same in both themes)
        gold:    '#c99a2e',
        goldl:   '#e8b84b',
        goldd:   '#8a6518',
        amber:   '#e07b39',
        teal:    '#2e9e8f',
        tealb:   '#3abfae',
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
