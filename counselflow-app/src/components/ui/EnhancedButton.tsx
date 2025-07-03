'use client'

import { theme } from '../../lib/theme'

interface EnhancedButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'glass' | 'professional'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  className?: string
}

export function EnhancedButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  fullWidth = false,
  icon,
  className = ''
}: EnhancedButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'professional':
        return {
          background: theme.colors.gradients.professional,
          color: 'white',
          border: 'none',
          boxShadow: theme.shadows.professional,
        }
      case 'primary':
        return {
          background: theme.colors.gradients.button,
          color: 'white',
          border: 'none',
          boxShadow: theme.shadows.light,
        }
      case 'secondary':
        return {
          background: 'white',
          color: theme.colors.navy.primary,
          border: `2px solid ${theme.colors.navy.primary}`,
          boxShadow: theme.shadows.md,
        }
      case 'accent':
        return {
          background: `linear-gradient(135deg, ${theme.colors.accent.purple}, ${theme.colors.accent.teal})`,
          color: 'white',
          border: 'none',
          boxShadow: theme.shadows.glow,
        }
      case 'glass':
        return {
          background: theme.colors.glass.bg,
          backdropFilter: 'blur(20px)',
          color: theme.colors.navy.primary,
          border: `1px solid ${theme.colors.glass.border}`,
          boxShadow: theme.shadows.light,
        }
      default:
        return {
          background: theme.colors.gradients.button,
          color: 'white',
          border: 'none',
          boxShadow: theme.shadows.light,
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.sm,
        }
      case 'md':
        return {
          padding: `${theme.spacing.md} ${theme.spacing.xl}`,
          fontSize: theme.typography.fontSize.base,
        }
      case 'lg':
        return {
          padding: `${theme.spacing.lg} ${theme.spacing['2xl']}`,
          fontSize: theme.typography.fontSize.lg,
        }
      case 'xl':
        return {
          padding: `${theme.spacing.xl} ${theme.spacing['3xl']}`,
          fontSize: theme.typography.fontSize.xl,
        }
      default:
        return {
          padding: `${theme.spacing.md} ${theme.spacing.xl}`,
          fontSize: theme.typography.fontSize.base,
        }
    }
  }

  const baseStyles = {
    position: 'relative' as const,
    borderRadius: '50px',
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: theme.animation.transition.smooth,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    overflow: 'hidden' as const,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    opacity: disabled ? 0.5 : 1,
    ...getVariantStyles(),
    ...getSizeStyles(),
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = theme.shadows.hover
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.transform = 'translateY(0px)'
      e.currentTarget.style.boxShadow = baseStyles.boxShadow as string
    }
  }

  return (
    <>
      <button
        style={baseStyles}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`enhanced-button ${className}`}
      >
        {/* Shimmer effect */}
        <span 
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            transition: 'left 0.6s ease',
            zIndex: 1,
          }}
          className="shimmer-effect"
        />
        
        {/* Content */}
        <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
          {icon && <span>{icon}</span>}
          {children}
        </span>
      </button>

      {/* CSS for hover effects */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .enhanced-button:hover .shimmer-effect {
            left: 100% !important;
          }
          
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `
      }} />
    </>
  )
}

interface FloatingActionButtonProps {
  children: React.ReactNode
  onClick?: () => void
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  size?: 'md' | 'lg'
  variant?: 'primary' | 'accent' | 'professional'
}

export function FloatingActionButton({
  children,
  onClick,
  position = 'bottom-right',
  size = 'lg',
  variant = 'primary'
}: FloatingActionButtonProps) {
  const getPositionStyles = () => {
    const offset = theme.spacing['2xl']
    switch (position) {
      case 'bottom-right':
        return { position: 'fixed' as const, bottom: offset, right: offset }
      case 'bottom-left':
        return { position: 'fixed' as const, bottom: offset, left: offset }
      case 'top-right':
        return { position: 'fixed' as const, top: offset, right: offset }
      case 'top-left':
        return { position: 'fixed' as const, top: offset, left: offset }
      default:
        return { position: 'fixed' as const, bottom: offset, right: offset }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'md':
        return { width: '56px', height: '56px', fontSize: theme.typography.fontSize.lg }
      case 'lg':
        return { width: '72px', height: '72px', fontSize: theme.typography.fontSize.xl }
      default:
        return { width: '72px', height: '72px', fontSize: theme.typography.fontSize.xl }
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'professional':
        return { background: theme.colors.gradients.professional }
      case 'accent':
        return { background: `linear-gradient(135deg, ${theme.colors.accent.purple}, ${theme.colors.accent.teal})` }
      default:
        return { background: theme.colors.gradients.button }
    }
  }

  const fabStyles = {
    ...getPositionStyles(),
    ...getSizeStyles(),
    ...getVariantStyles(),
    borderRadius: '50%',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows.hover,
    transition: theme.animation.transition.smooth,
    zIndex: 1000,
    animation: theme.animation.effects.float,
  }

  return (
    <button
      style={fabStyles}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
        e.currentTarget.style.boxShadow = theme.shadows.glow
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px) scale(1)'
        e.currentTarget.style.boxShadow = theme.shadows.hover
      }}
    >
      {children}
    </button>
  )
}

export default EnhancedButton
