/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Light luxury palette
        canvas: {
          base:     '#FAFAF8',
          secondary:'#F4F2ED',
          white:    '#FFFFFF',
        },
        ink: {
          primary:  '#2F2D2A',
          secondary:'#555555',
          muted:    '#999999',
          faint:    '#CCCCCC',
        },
        accent: {
          DEFAULT:  '#D4AF37',
          light:    '#E3C76F',
          dark:     '#B58A18',
          glow:     'rgba(212,175,55,0.15)',
        },
        border: {
          DEFAULT:  'rgba(0,0,0,0.08)',
          medium:   'rgba(0,0,0,0.14)',
          strong:   'rgba(0,0,0,0.22)',
        },
        // Legacy dark colors preserved for compatibility
        void: {
          base:     '#05050A',
          deep:     '#0A0A14',
          surface:  '#0F0F1E',
          elevated: '#141428',
        },
        gold: {
          bright: '#FFD166',
          warm:   '#E8B94B',
          muted:  '#B8922E',
          dim:    '#7A5F1E',
        },
        teal: {
          bright: '#00F5D4',
          mid:    '#00C4A7',
          muted:  '#007A6A',
        },
        text: {
          primary: '#2F2D2A',
          secondary:'#555555',
          muted:   '#999999',
          heading: '#2F2D2A',
          gold:    '#D4AF37',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'General Sans', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif:   ['"Cormorant Garamond"', 'serif'],
      },
      fontSize: {
        'hero':    ['clamp(2.5rem,8vw,6rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem,5vw,4rem)',  { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'section': ['clamp(2rem,3.5vw,3rem)',   { lineHeight: '1.15' }],
      },
      boxShadow: {
        glass:   '0 8px 32px 0 rgba(0,0,0,0.06)',
        luxury:  '0 20px 60px rgba(0,0,0,0.08)',
        'accent-glow': '0 0 30px rgba(212,175,55,0.25)',
        'card':  '0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
      },
      keyframes: {
        sweep: {
          '0%':   { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-drift': {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '33%':      { transform: 'translate(10px, -8px) rotate(0.5deg)' },
          '66%':      { transform: 'translate(-6px, 6px) rotate(-0.5deg)' },
        },
        'mask-reveal': {
          '0%':   { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
      },
      animation: {
        'sweep':      'sweep 0.7s ease-in-out',
        'fade-up':    'fade-up 0.8s ease forwards',
        'slow-drift': 'slow-drift 20s ease-in-out infinite',
        'mask-reveal':'mask-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury':   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}
