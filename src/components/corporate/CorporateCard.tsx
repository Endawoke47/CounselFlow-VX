import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CorporateCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'flat' | 'outlined' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  interactive?: boolean
}

export const CorporateCard = React.forwardRef<HTMLDivElement, CorporateCardProps>(
  ({ 
    className, 
    variant = 'elevated', 
    padding = 'lg',
    hover = false,
    interactive = false,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = `
      rounded-xl transition-all duration-200 ease-out
      ${interactive ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:ring-offset-2' : ''}
    `

    const variants = {
      elevated: `
        bg-white border border-slate-200
        shadow-sm
        ${hover || interactive ? 'hover:shadow-md hover:border-slate-300' : ''}
      `,
      flat: `
        bg-white border border-slate-200
        ${hover || interactive ? 'hover:border-slate-300 hover:bg-slate-50' : ''}
      `,
      outlined: `
        bg-white border-2 border-slate-300
        ${hover || interactive ? 'hover:border-corporate-400 hover:shadow-sm' : ''}
      `,
      glass: `
        bg-white/80 backdrop-blur-sm border border-white/20
        shadow-lg
        ${hover || interactive ? 'hover:bg-white/90 hover:shadow-xl' : ''}
      `
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10'
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          className
        )}
        {...(interactive ? { tabIndex: 0 } : {})}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CorporateCard.displayName = 'CorporateCard'

// Card Header Component
interface CorporateCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export const CorporateCardHeader = React.forwardRef<HTMLDivElement, CorporateCardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start justify-between space-y-1.5 pb-6 border-b border-slate-200',
          className
        )}
        {...props}
      >
        <div className="space-y-1.5">
          {title && (
            <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="flex-shrink-0 ml-4">
            {action}
          </div>
        )}
      </div>
    )
  }
)

CorporateCardHeader.displayName = 'CorporateCardHeader'

// Card Content Component
interface CorporateCardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CorporateCardContent = React.forwardRef<HTMLDivElement, CorporateCardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('pt-6', className)}
        {...props}
      />
    )
  }
)

CorporateCardContent.displayName = 'CorporateCardContent'

// Card Footer Component
interface CorporateCardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CorporateCardFooter = React.forwardRef<HTMLDivElement, CorporateCardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center pt-6 mt-6 border-t border-slate-200',
          className
        )}
        {...props}
      />
    )
  }
)

CorporateCardFooter.displayName = 'CorporateCardFooter'
