'use client'

import { theme } from '../../lib/theme'
import { useState } from 'react'

interface Enhanced3DCardProps {
  children: React.ReactNode
  variant?: 'glass' | 'solid' | 'gradient' | 'professional'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  hoverable?: boolean
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
  title?: string
  subtitle?: string
  accent?: boolean
}

export function Enhanced3DCard({
  children,
  variant = 'glass',
  size = 'md',
  hoverable = true,
  onClick,
  className = '',
  icon,
  title,
  subtitle,
  accent = false
}: Enhanced3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return {
          background: theme.colors.gradients.glass,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.colors.glass.border}`,
          boxShadow: theme.shadows.professional,
        }
      case 'solid':
        return {
          background: 'white',
          border: `1px solid ${theme.colors.neutral[200]}`,
          boxShadow: theme.shadows.xl,
        }
      case 'gradient':
        return {
          background: theme.colors.gradients.legal,
          border: 'none',
          boxShadow: theme.shadows.professional,
          color: 'white',
        }
      case 'professional':
        return {
          background: theme.colors.professional.navy,
          border: 'none',
          boxShadow: theme.shadows.professional,
          color: 'white',
        }
      default:
        return {
          background: theme.colors.gradients.glass,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.colors.glass.border}`,
          boxShadow: theme.shadows.professional,
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: theme.spacing.lg, borderRadius: theme.borderRadius.lg }
      case 'md':
        return { padding: theme.spacing.xl, borderRadius: '25px' }
      case 'lg':
        return { padding: theme.spacing['2xl'], borderRadius: '25px' }
      case 'xl':
        return { padding: theme.spacing['3xl'], borderRadius: '30px' }
      default:
        return { padding: theme.spacing.xl, borderRadius: '25px' }
    }
  }

  const baseStyles = {
    position: 'relative' as const,
    transition: theme.animation.transition.smooth,
    overflow: 'hidden' as const,
    cursor: onClick ? 'pointer' : 'default',
    ...getVariantStyles(),
    ...getSizeStyles(),
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable) {
      setIsHovered(true)
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = theme.shadows.hover
      if (accent) {
        e.currentTarget.style.borderColor = theme.colors.blue.accent
      }
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable) {
      setIsHovered(false)
      e.currentTarget.style.transform = 'translateY(0px)'
      e.currentTarget.style.boxShadow = baseStyles.boxShadow as string
      if (accent) {
        e.currentTarget.style.borderColor = theme.colors.glass.border
      }
    }
  }

  const handleMouseMove = () => {
    // Removed complex 3D mouse tracking for professional look
  }

  return (
    <div
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`enhanced-3d-card ${className}`}
    >
      {/* Top accent bar */}
      {accent && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #2196f3 0%, #673ab7 50%, #009688 100%)',
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.6s ease',
            transformOrigin: 'left',
          }}
        />
      )}

      {/* Shimmer effect on hover */}
      {hoverable && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: isHovered ? '100%' : '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.15), transparent)',
            transition: 'left 0.8s ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Header with icon and title */}
      {(icon || title) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: title ? 'space-between' : 'center',
          marginBottom: title ? theme.spacing.lg : 0,
        }}>
          {title && (
            <div>
              <h3 style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.semibold,
                marginBottom: subtitle ? theme.spacing.xs : 0,
                color: variant === 'gradient' || variant === 'professional' ? 'white' : theme.colors.navy.primary,
              }}>
                {title}
              </h3>
              {subtitle && (
                <p style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: variant === 'gradient' || variant === 'professional' ? 'rgba(255,255,255,0.8)' : theme.colors.neutral[500],
                  margin: 0,
                }}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {icon && (
            <div style={{
              fontSize: '3rem',
              background: variant === 'gradient' || variant === 'professional' ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
              WebkitBackgroundClip: variant === 'gradient' || variant === 'professional' ? 'unset' : 'text',
              WebkitTextFillColor: variant === 'gradient' || variant === 'professional' ? 'white' : 'transparent',
              backgroundClip: variant === 'gradient' || variant === 'professional' ? 'unset' : 'text',
              animation: isHovered ? 'iconBounce 2s ease-in-out infinite' : 'none',
              filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))',
              borderRadius: variant === 'gradient' || variant === 'professional' ? '8px' : '0',
              padding: variant === 'gradient' || variant === 'professional' ? theme.spacing.md : '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: variant === 'gradient' || variant === 'professional' ? '60px' : 'auto',
              height: variant === 'gradient' || variant === 'professional' ? '60px' : 'auto',
            }}>
              {icon}
            </div>
          )}
        </div>
      )}

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>

      {/* CSS animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes iconBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `
      }} />
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  trend?: {
    direction: 'up' | 'down' | 'neutral'
    percentage: string
    label: string
  }
  icon?: React.ReactNode
  color?: 'blue' | 'purple' | 'teal' | 'orange' | 'pink'
}

export function EnhancedMetricCard({ title, value, trend, icon, color = 'blue' }: MetricCardProps) {
  const getColorStyles = () => {
    switch (color) {
      case 'purple':
        return {
          iconColor: theme.colors.accent.purple,
          gradientFrom: theme.colors.accent.purple,
          gradientTo: '#9c27b0',
        }
      case 'teal':
        return {
          iconColor: theme.colors.accent.teal,
          gradientFrom: theme.colors.accent.teal,
          gradientTo: '#26a69a',
        }
      case 'orange':
        return {
          iconColor: theme.colors.accent.orange,
          gradientFrom: theme.colors.accent.orange,
          gradientTo: '#ff7043',
        }
      case 'pink':
        return {
          iconColor: theme.colors.accent.pink,
          gradientFrom: theme.colors.accent.pink,
          gradientTo: '#ad1457',
        }
      default:
        return {
          iconColor: theme.colors.blue.accent,
          gradientFrom: theme.colors.blue.accent,
          gradientTo: theme.colors.blue.bright,
        }
    }
  }

  const colorStyles = getColorStyles()

  return (
    <Enhanced3DCard variant="glass" hoverable accent>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.lg }}>
        <h3 style={{
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.neutral[600],
          margin: 0,
        }}>
          {title}
        </h3>
        {icon && (
          <div style={{
            fontSize: '2.5rem',
            background: `linear-gradient(135deg, ${colorStyles.gradientFrom} 0%, ${colorStyles.gradientTo} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'iconBounce 2s ease-in-out infinite',
            filter: `drop-shadow(0 4px 8px ${colorStyles.iconColor}40)`,
          }}>
            {icon}
          </div>
        )}
      </div>

      <div style={{
        fontSize: theme.typography.fontSize['4xl'],
        fontWeight: theme.typography.fontWeight.extrabold,
        background: `linear-gradient(135deg, ${theme.colors.navy.primary} 0%, ${theme.colors.blue.accent} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: theme.spacing.sm,
        animation: 'numberCount 2s ease-out',
      }}>
        {value}
      </div>

      {trend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
        }}>
          <span style={{
            color: trend.direction === 'up' ? theme.colors.success : trend.direction === 'down' ? theme.colors.error : theme.colors.neutral[500],
            animation: trend.direction === 'up' ? 'trendUp 1s ease-in-out infinite alternate' : trend.direction === 'down' ? 'trendDown 1s ease-in-out infinite alternate' : 'none',
          }}>
            {trend.direction === 'up' ? '↗️' : trend.direction === 'down' ? '↘️' : '→'}
          </span>
          <span style={{ color: trend.direction === 'up' ? theme.colors.success : trend.direction === 'down' ? theme.colors.error : theme.colors.neutral[500] }}>
            {trend.percentage}
          </span>
          <span style={{ color: theme.colors.neutral[500] }}>
            {trend.label}
          </span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes numberCount {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          
          @keyframes trendUp {
            from { transform: translateY(0); }
            to { transform: translateY(-3px); }
          }
          
          @keyframes trendDown {
            from { transform: translateY(0); }
            to { transform: translateY(3px); }
          }
        `
      }} />
    </Enhanced3DCard>
  )
}

export default Enhanced3DCard
