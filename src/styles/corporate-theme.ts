/**
 * CounselFlow Corporate Design System
 * Enterprise-grade, professional, corporate look and feel
 */

export const corporateTheme = {
  // Color Palette - Professional Corporate Colors
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    
    // Corporate Blues - Trust, Reliability, Professionalism
    corporate: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    
    // Accent Colors - Sophisticated and Professional
    accent: {
      gold: '#f59e0b',
      goldLight: '#fbbf24',
      goldDark: '#d97706',
      teal: '#0d9488',
      tealLight: '#14b8a6',
      tealDark: '#0f766e',
      purple: '#7c3aed',
      purpleLight: '#8b5cf6',
      purpleDark: '#6d28d9'
    },
    
    // Semantic Colors
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d'
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309'
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c'
    },
    
    // Neutral Grays - Professional Hierarchy
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a'
    }
  },
  
  // Typography - Professional Font System
  typography: {
    fontFamily: {
      primary: ['"Inter"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      secondary: ['"Source Sans Pro"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem'   // 60px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em'
    }
  },
  
  // Spacing System - Consistent Rhythm
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem'     // 256px
  },
  
  // Shadows - Professional Depth
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    corporate: '0 4px 20px 0 rgb(37 99 235 / 0.1)',
    hover: '0 8px 30px 0 rgb(37 99 235 / 0.15)'
  },
  
  // Border Radius - Clean, Professional
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px'
  },
  
  // Animation - Subtle, Professional
  animation: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms'
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      corporate: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },
  
  // Layout - Grid and Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
} as const

// Component Variants - Consistent, Professional Styling
export const componentVariants = {
  button: {
    primary: {
      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      color: '#ffffff',
      border: 'none',
      shadow: '0 4px 12px 0 rgb(37 99 235 / 0.2)',
      hoverShadow: '0 6px 20px 0 rgb(37 99 235 / 0.3)'
    },
    secondary: {
      background: '#ffffff',
      color: '#334155',
      border: '1px solid #e2e8f0',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      hoverShadow: '0 4px 12px 0 rgb(0 0 0 / 0.1)'
    },
    ghost: {
      background: 'transparent',
      color: '#64748b',
      border: 'none',
      shadow: 'none',
      hoverShadow: '0 2px 8px 0 rgb(0 0 0 / 0.1)'
    }
  },
  
  card: {
    elevated: {
      background: '#ffffff',
      border: '1px solid #f1f5f9',
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      hoverShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    },
    flat: {
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      shadow: 'none',
      hoverShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      shadow: '0 8px 32px 0 rgb(31 38 135 / 0.1)',
      backdropFilter: 'blur(8px)'
    }
  }
}

export type CorporateTheme = typeof corporateTheme
export type ComponentVariants = typeof componentVariants
