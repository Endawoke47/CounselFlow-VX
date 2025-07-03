'use client'

import { useState } from 'react'

interface VibrantCTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'professional' | 'subtle' | 'glass'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  className?: string
  href?: string
}

export function VibrantCTAButton({
  children,
  onClick,
  variant = 'professional',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon,
  className = '',
  href
}: VibrantCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case 'professional':
        return {
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: 'white',
          border: 'none',
          boxShadow: isHovered 
            ? '0 10px 30px rgba(37, 99, 235, 0.3)'
            : '0 6px 20px rgba(37, 99, 235, 0.2)',
        }
      case 'primary':
        return {
          background: 'white',
          color: '#1e293b',
          border: '2px solid #e2e8f0',
          boxShadow: isHovered 
            ? '0 8px 25px rgba(30, 41, 59, 0.15)'
            : '0 4px 15px rgba(30, 41, 59, 0.1)',
        }
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          color: 'white',
          border: 'none',
          boxShadow: isHovered 
            ? '0 8px 25px rgba(30, 41, 59, 0.25)'
            : '0 4px 15px rgba(30, 41, 59, 0.15)',
        }
      case 'subtle':
        return {
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          color: '#1e293b',
          border: '1px solid #cbd5e1',
          boxShadow: isHovered 
            ? '0 6px 20px rgba(30, 41, 59, 0.1)'
            : '0 2px 10px rgba(30, 41, 59, 0.05)',
        }
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          color: '#1e293b',
          border: '1px solid rgba(226, 232, 240, 0.3)',
          boxShadow: isHovered 
            ? '0 6px 20px rgba(30, 41, 59, 0.15)'
            : '0 2px 10px rgba(30, 41, 59, 0.1)',
        }
      default:
        return {
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: 'white',
          border: 'none',
          boxShadow: isHovered 
            ? '0 20px 60px rgba(102, 126, 234, 0.4)'
            : '0 15px 35px rgba(102, 126, 234, 0.3)',
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '0.75rem 1.5rem',
          fontSize: '0.875rem',
          borderRadius: '25px',
        }
      case 'md':
        return {
          padding: '1rem 2rem',
          fontSize: '1rem',
          borderRadius: '30px',
        }
      case 'lg':
        return {
          padding: '1.25rem 2.5rem',
          fontSize: '1.125rem',
          borderRadius: '35px',
        }
      case 'xl':
        return {
          padding: '1.5rem 3rem',
          fontSize: '1.25rem',
          borderRadius: '40px',
        }
      default:
        return {
          padding: '1.25rem 2.5rem',
          fontSize: '1rem',
          borderRadius: '50px',
        }
    }
  }

  const buttonStyle = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon ? '0.5rem' : '0',
    position: 'relative' as const,
    overflow: 'hidden',
    transform: isHovered && !disabled 
      ? 'translateY(-2px) scale(1.005)' 
      : 'translateY(0px) scale(1)',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
  }

  const shimmerStyle = {
    content: '',
    position: 'absolute' as const,
    top: 0,
    left: isHovered ? '100%' : '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    transition: 'left 0.6s ease',
    pointerEvents: 'none' as const,
  }

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return
    
    if (onClick) {
      onClick()
    }
    
    // Add ripple effect
    const button = e.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    
    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.8s linear;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
    `
    
    button.appendChild(ripple)
    
    setTimeout(() => {
      ripple.remove()
    }, 800)
  }

  const Component = href ? 'a' : 'button'

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.01); }
          100% { transform: scale(1); }
        }
          100% { transform: perspective(1000px) scale(1); }
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .vibrant-cta:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        
        .vibrant-cta:hover:before {
          left: 100%;
        }
      `}</style>
      
      <Component
        style={buttonStyle}
        onClick={handleClick}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`vibrant-cta ${className}`}
        href={href}
        disabled={Component === 'button' ? disabled : undefined}
        aria-disabled={disabled}
      >
        <div style={shimmerStyle} />
        
        {icon && (
          <span style={{ 
            display: 'flex', 
            alignItems: 'center',
            transform: isHovered ? 'scale(1.1) rotateY(10deg)' : 'scale(1) rotateY(0deg)',
            transition: 'transform 0.3s ease'
          }}>
            {icon}
          </span>
        )}
        
        <span style={{ 
          position: 'relative', 
          zIndex: 2,
          transform: isHovered ? 'translateZ(5px)' : 'translateZ(0px)',
          transition: 'transform 0.3s ease'
        }}>
          {children}
        </span>
      </Component>
    </>
  )
}
