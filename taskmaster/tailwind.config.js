/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // slate-700
        input: 'var(--color-input)', // slate-700
        ring: 'var(--color-ring)', // emerald-500
        background: 'var(--color-background)', // slate-900
        foreground: 'var(--color-foreground)', // slate-100
        primary: {
          DEFAULT: 'var(--color-primary)', // emerald-500
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // indigo-500
          foreground: 'var(--color-secondary-foreground)', // white
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // amber-500
          foreground: 'var(--color-accent-foreground)', // black
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-500
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // yellow-500
          foreground: 'var(--color-warning-foreground)', // black
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-700
          foreground: 'var(--color-muted-foreground)', // slate-400
        },
        card: {
          DEFAULT: 'var(--color-card)', // slate-800
          foreground: 'var(--color-card-foreground)', // slate-100
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // slate-800
          foreground: 'var(--color-popover-foreground)', // slate-100
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)', // 6px
        md: 'var(--radius-md)', // 10px
        lg: 'var(--radius-lg)', // 14px
        xl: 'var(--radius-xl)', // 18px
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '96': '24rem',
        '144': '36rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'glow-sm': '0 0 8px rgba(16, 185, 129, 0.15)',
        'glow-md': '0 0 12px rgba(99, 102, 241, 0.2)',
        'glow-lg': '0 0 24px rgba(245, 158, 11, 0.25)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}