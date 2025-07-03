'use client'

import { useState } from 'react'

interface Vibrant3DCardProps {
  children: React.ReactNode
  variant?: 'professional' | 'elevated' | 'subtle' | 'outlined' | 'glass' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  onClick?: () => void
  hover3D?: boolean
  glowEffect?: boolean
}

export function Vibrant3DCard({
  children,
  variant = 'professional',
  size = 'md',
  className = '',
  onClick,
  hover3D = false,
  glowEffect = false
}: Vibrant3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case 'professional':
        return {
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(226, 232, 240, 0.6)',
          boxShadow: isHovered 
            ? '0 10px 25px rgba(30, 41, 59, 0.12)'
            : '0 4px 15px rgba(30, 41, 59, 0.08)',
        }
      case 'elevated':
        return {
          background: 'rgba(255, 255, 255, 0.98)',
          border: '1px solid rgba(226, 232, 240, 0.4)',
          boxShadow: isHovered 
            ? '0 15px 35px rgba(30, 41, 59, 0.15)'
            : '0 8px 20px rgba(30, 41, 59, 0.1)',
        }
      case 'subtle':
        return {
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(226, 232, 240, 0.5)',
          boxShadow: isHovered 
            ? '0 6px 15px rgba(30, 41, 59, 0.08)'
            : '0 2px 8px rgba(30, 41, 59, 0.04)',
        }
      case 'outlined':
        return {
          background: 'rgba(255, 255, 255, 0.98)',
          border: '2px solid rgba(226, 232, 240, 0.8)',
          boxShadow: isHovered 
            ? '0 8px 20px rgba(30, 41, 59, 0.1)'
            : '0 2px 8px rgba(30, 41, 59, 0.05)',
        }
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          boxShadow: isHovered 
            ? '0 8px 32px rgba(31, 38, 135, 0.37)'
            : '0 4px 20px rgba(31, 38, 135, 0.2)',
        }
      case 'gradient':
        return {
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
          border: '1px solid rgba(226, 232, 240, 0.6)',
          boxShadow: isHovered 
            ? '0 12px 30px rgba(30, 41, 59, 0.15)'
            : '0 6px 18px rgba(30, 41, 59, 0.1)',
        }
      default:
        return {
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(226, 232, 240, 0.6)',
          boxShadow: isHovered 
            ? '0 10px 25px rgba(30, 41, 59, 0.12)'
            : '0 4px 15px rgba(30, 41, 59, 0.08)',
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '1.25rem',
          borderRadius: '12px',
          minHeight: '120px',
        }
      case 'md':
        return {
          padding: '1.5rem',
          borderRadius: '16px',
          minHeight: '160px',
        }
      case 'lg':
        return {
          padding: '2rem',
          borderRadius: '20px',
          minHeight: '200px',
        }
      case 'xl':
        return {
          padding: '2.5rem',
          borderRadius: '24px',
          minHeight: '240px',
        }
      default:
        return {
          padding: '1.5rem',
          borderRadius: '16px',
          minHeight: '160px',
        }
    }
  }

  const cardStyle = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    position: 'relative' as const,
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: onClick ? 'pointer' : 'default',
    transform: isHovered && hover3D
      ? `translateY(-2px) rotateX(2deg) rotateY(2deg)`
      : isHovered
      ? `translateY(-2px)`
      : 'translateY(0px)',
    filter: glowEffect && isHovered ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' : 'none',
  }

  return (
    <div
      style={cardStyle}
      className={`professional-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        height: '100%'
      }}>
        {children}
      </div>
    </div>
  )
}
