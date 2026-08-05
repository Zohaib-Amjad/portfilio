/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          light: 'rgb(var(--color-accent-light) / <alpha-value>)',
        },
        heading: 'rgb(var(--color-heading) / <alpha-value>)',
        body: 'rgb(var(--color-body) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        faint: 'rgb(var(--color-faint) / <alpha-value>)',
        onAccent: 'rgb(var(--color-on-accent) / <alpha-value>)',
        code: 'rgb(var(--color-code) / <alpha-value>)',
        steel: 'rgb(var(--color-steel) / <alpha-value>)',
        moss: 'rgb(var(--color-moss) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui'],
        display: ['DM Sans', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 38px rgb(var(--color-accent) / 0.22)',
      },
      keyframes: {
        cursor: {
          '0%, 45%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        cursor: 'cursor 1s step-end infinite',
      },
    },
  },
  plugins: [],
}

export default config
