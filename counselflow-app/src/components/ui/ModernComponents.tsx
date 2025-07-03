'use client'

import { ReactNode } from 'react'
import { theme } from '../../lib/theme'

interface ModernCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'gradient' | 'elevated'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export function ModernCard({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'lg',
  hover = false,
  onClick,
  style = {}
}: ModernCardProps) {
  const paddingValues = {
    sm: theme.spacing.md,
    md: theme.spacing.lg,
    lg: theme.spacing.xl,
    xl: theme.spacing['2xl']
  }

  const baseStyles: React.CSSProperties = {
    borderRadius: theme.borderRadius.lg,
    transition: theme.animation.transition.normal,
    cursor: onClick ? 'pointer' : 'default',
    ...style
  }

  const variantStyles = {
    default: {
      background: theme.colors.neutral[800],
      border: `1px solid ${theme.colors.neutral[700]}`,
      boxShadow: theme.shadows.md,
    },
    glass: {
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      boxShadow: theme.shadows.lg,
    },
    gradient: {
      background: `linear-gradient(135deg, ${theme.colors.neutral[800]}, ${theme.colors.neutral[700]})`,
      border: `1px solid ${theme.colors.neutral[600]}`,
      boxShadow: theme.shadows.xl,
    },
    elevated: {
      background: theme.colors.neutral[800],
      border: `1px solid ${theme.colors.neutral[700]}`,
      boxShadow: theme.shadows['2xl'],
      transform: 'translateY(-2px)',
    }
  }

  const hoverStyles = hover ? {
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows['2xl'],
      borderColor: theme.colors.primary[500],
    }
  } : {}

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        padding: paddingValues[padding],
        ...(hover && {
          ':hover': hoverStyles[':hover']
        })
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = theme.shadows['2xl']
          e.currentTarget.style.borderColor = theme.colors.primary[500]
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = variant === 'elevated' ? 'translateY(-2px)' : 'translateY(0)'
          e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow
          e.currentTarget.style.borderColor = variantStyles[variant].border?.split(' ')[2] || theme.colors.neutral[700]
        }
      }}
    >
      {children}
    </div>
  )
}

interface ModernButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export function ModernButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  className = '',
  style = {}
}: ModernButtonProps) {
  const sizeStyles = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.sm,
      borderRadius: theme.borderRadius.sm,
    },
    md: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.base,
      borderRadius: theme.borderRadius.md,
    },
    lg: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
      fontSize: theme.typography.fontSize.lg,
      borderRadius: theme.borderRadius.lg,
    }
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg, ${theme.colors.primary[600]}, ${theme.colors.primary[700]})`,
      color: 'white',
      border: 'none',
      boxShadow: theme.shadows.md,
    },
    secondary: {
      background: theme.colors.neutral[700],
      color: 'white',
      border: `1px solid ${theme.colors.neutral[600]}`,
      boxShadow: theme.shadows.sm,
    },
    outline: {
      background: 'transparent',
      color: theme.colors.primary[400],
      border: `1px solid ${theme.colors.primary[500]}`,
    },
    ghost: {
      background: 'transparent',
      color: theme.colors.neutral[300],
      border: 'none',
    },
    danger: {
      background: `linear-gradient(135deg, ${theme.colors.error}, #DC2626)`,
      color: 'white',
      border: 'none',
      boxShadow: theme.shadows.md,
    }
  }

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        fontFamily: theme.typography.fontFamily.sans.join(', '),
        fontWeight: theme.typography.fontWeight.medium,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: theme.animation.transition.fast,
        opacity: disabled ? 0.6 : 1,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = theme.shadows.lg
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow || 'none'
        }
      }}
    >
      {loading && (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
      )}
      {!loading && leftIcon && leftIcon}
      {children}
      {!loading && rightIcon && rightIcon}
    </button>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon?: ReactNode
  color?: string
  subtitle?: string
}

export function MetricCard({ title, value, change, icon, color = theme.colors.primary[500], subtitle }: MetricCardProps) {
  return (
    <ModernCard variant="glass" hover>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <p style={{ 
            color: theme.colors.neutral[400], 
            fontSize: theme.typography.fontSize.sm,
            margin: 0,
            marginBottom: theme.spacing.xs
          }}>
            {title}
          </p>
          <h3 style={{ 
            color: 'white', 
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            margin: 0,
            marginBottom: subtitle ? theme.spacing.xs : 0
          }}>
            {value}
          </h3>
          {subtitle && (
            <p style={{ 
              color: theme.colors.neutral[500], 
              fontSize: theme.typography.fontSize.xs,
              margin: 0
            }}>
              {subtitle}
            </p>
          )}
          {change && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: theme.spacing.xs,
              marginTop: theme.spacing.sm
            }}>
              <span style={{ 
                color: change.type === 'increase' ? theme.colors.success : theme.colors.error,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium
              }}>
                {change.type === 'increase' ? '↗' : '↘'} {Math.abs(change.value)}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: theme.borderRadius.lg,
            background: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            {icon}
          </div>
        )}
      </div>
    </ModernCard>
  )
}
