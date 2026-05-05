import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#0FFFC1', dim: '#0FFFC122' },
        violet: { DEFAULT: '#7C3AED', light: '#A78BFA' },
        amber: { DEFAULT: '#F59E0B', light: '#FCD34D' },
        sky: { DEFAULT: '#0EA5E9', light: '#7DD3FC' },
        navy: {
          DEFAULT: '#030d1a',
          light: '#051628',
          mid: '#0a2440',
          border: '#0f3460',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-teal-blue': 'linear-gradient(135deg, #0FFFC1, #0EA5E9)',
        'gradient-purple-teal': 'linear-gradient(135deg, #7C3AED, #0FFFC1)',
        'gradient-amber': 'linear-gradient(135deg, #F59E0B, #EF4444)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
    },
  },
  plugins: [],
}
export default config
