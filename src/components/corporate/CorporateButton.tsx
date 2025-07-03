import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { corporateTheme } from '@/styles/corporate-theme'

interface CorporateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const CorporateButton = forwardRef<HTMLButtonElement, CorporateButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 
      rounded-lg font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
    `

    const variants = {
      primary: `
        bg-gradient-to-r from-corporate-600 to-corporate-700 
        text-white border border-transparent
        hover:from-corporate-700 hover:to-corporate-800
        focus:ring-corporate-500
        shadow-sm hover:shadow-md
      `,
      secondary: `
        bg-white text-primary-700 border border-primary-200
        hover:bg-primary-50 hover:border-primary-300
        focus:ring-primary-500
        shadow-sm hover:shadow-md
      `,
      ghost: `
        bg-transparent text-primary-600 border border-transparent
        hover:bg-primary-50 hover:text-primary-700
        focus:ring-primary-500
      `,
      outline: `
        bg-transparent text-corporate-600 border border-corporate-300
        hover:bg-corporate-50 hover:border-corporate-400
        focus:ring-corporate-500
      `,
      danger: `
        bg-gradient-to-r from-error-600 to-error-700
        text-white border border-transparent
        hover:from-error-700 hover:to-error-800
        focus:ring-error-500
        shadow-sm hover:shadow-md
      `
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg'
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

CorporateButton.displayName = 'CorporateButton'
