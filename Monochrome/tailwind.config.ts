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
        // Minimalist Monochrome Palette
        background: '#FFFFFF',
        foreground: '#000000',
        muted: '#F5F5F5',
        mutedForeground: '#525252',
        accent: '#000000',
        accentForeground: '#FFFFFF',
        border: '#000000',
        borderLight: '#E5E5E5',
        card: '#FFFFFF',
        cardForeground: '#000000',
        ring: '#000000',
      },
      fontFamily: {
        display: ['var(--font-playfair-display)', 'Georgia', 'serif'],
        body: ['var(--font-source-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '2rem',    // 32px
        '4xl': '2.5rem',  // 40px
        '5xl': '3.5rem',  // 56px
        '6xl': '4.5rem',  // 72px
        '7xl': '6rem',    // 96px
        '8xl': '8rem',    // 128px
        '9xl': '10rem',   // 160px
      },
      borderRadius: {
        'none': '0px',
        '0': '0px',
      },
      borderWidth: {
        'hairline': '1px',
        'thin': '1px',
        'medium': '2px',
        'thick': '4px',
        'ultra': '8px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      screens: {
        'xs': '475px',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'line-in': 'lineIn 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        lineIn: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      transitionDuration: {
        '0': '0ms',
        '100': '100ms',
      },
    },
  },
  plugins: [],
  corePlugins: {
    borderRadius: false, // We'll override all border-radius to 0
  },
}

export default config