/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary': {
          '50': 'var(--color-primary-50)',
          '100': 'var(--color-primary-100)',
          '200': 'var(--color-primary-200)',
          '300': 'var(--color-primary-300)',
          '400': 'var(--color-primary-400)',
          '500': 'var(--color-primary-500)',
          '600': 'var(--color-primary-600)',
          '700': 'var(--color-primary-700)',
          '800': 'var(--color-primary-800)',
          '900': 'var(--color-primary-900)',
          '950': 'var(--color-primary-950)',
          'DEFAULT': 'var(--color-primary-600)'
        },
        // Secondary colors
        'secondary': {
          '50': 'var(--color-secondary-50)',
          '100': 'var(--color-secondary-100)',
          '200': 'var(--color-secondary-200)',
          '300': 'var(--color-secondary-300)',
          '400': 'var(--color-secondary-400)',
          '500': 'var(--color-secondary-500)',
          '600': 'var(--color-secondary-600)',
          '700': 'var(--color-secondary-700)',
          '800': 'var(--color-secondary-800)',
          '900': 'var(--color-secondary-900)',
          'DEFAULT': 'var(--color-secondary-600)'
        },
        // Neutral colors
        'neutral': {
          '50': 'var(--color-neutral-50)',
          '100': 'var(--color-neutral-100)',
          '200': 'var(--color-neutral-200)',
          '300': 'var(--color-neutral-300)',
          '400': 'var(--color-neutral-400)',
          '500': 'var(--color-neutral-500)',
          '600': 'var(--color-neutral-600)',
          '700': 'var(--color-neutral-700)',
          '800': 'var(--color-neutral-800)',
          '900': 'var(--color-neutral-900)',
          '950': 'var(--color-neutral-950)',
          'DEFAULT': 'var(--color-neutral-500)'
        },
        // Slate colors for dark mode
        'slate': {
          '50': 'var(--color-slate-50)',
          '100': 'var(--color-slate-100)',
          '200': 'var(--color-slate-200)',
          '300': 'var(--color-slate-300)',
          '400': 'var(--color-slate-400)',
          '500': 'var(--color-slate-500)',
          '600': 'var(--color-slate-600)',
          '700': 'var(--color-slate-700)',
          '800': 'var(--color-slate-800)',
          '900': 'var(--color-slate-900)',
          '950': 'var(--color-slate-950)',
          'DEFAULT': 'var(--color-slate-500)'
        },
        // Truck-specific colors
        'truck-blue': 'hsl(var(--truck-blue))',
        'truck-orange': 'hsl(var(--truck-orange))',
        'truck-green': 'hsl(var(--truck-green))',
        'accent': 'hsl(var(--accent))',

        // Semantic colors
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
        'info': 'var(--color-info)',

        // UI colors
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-inverse': 'var(--color-text-inverse)',
        'border-light': 'var(--color-border-light)',
        'border-default': 'var(--color-border-default)',
        'border-dark': 'var(--color-border-dark)',
        'surface': 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)'
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to right, hsl(var(--truck-orange)), hsl(var(--accent)))'
      },
      fontFamily: {
        'sans': ['var(--font-sans)'],
        'mono': ['var(--font-mono)']
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px -4px rgba(0, 0, 0, 0.1)',
        'hard': '0 8px 24px -8px rgba(0, 0, 0, 0.15)',
        'blue': '0 4px 16px -4px rgba(59, 130, 246, 0.3)'
      },
      animation: {
        'in': 'animateIn 0.3s ease-out',
        'out': 'animateOut 0.3s ease-out'
      }
    }
  },
  plugins: []
}
