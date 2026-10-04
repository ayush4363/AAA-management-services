/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF9F5',
        surface: '#FFFFFF',
        subtle: '#F3F1EB',
        ink: {
          DEFAULT: '#141518',
          light: '#26272B',
        },
        muted: '#686873',
        line: '#E6E3DA',
        accent: {
          DEFAULT: '#C44D2B',
          hover: '#B23F1E',
          soft: '#FBF0EC',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'pill': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'lift': '0 12px 32px -4px rgba(20, 21, 24, 0.06), 0 4px 12px -2px rgba(20, 21, 24, 0.03)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
}
