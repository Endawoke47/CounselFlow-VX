'use client'

import { useState } from 'react'
import { theme } from '../../lib/theme'

interface FloatingActionButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  variant?: 'primary' | 'professional' | 'glass' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  tooltip?: string
  className?: string
}

export function FloatingActionButton({
  icon,
  onClick,
  position = 'bottom-right',
  variant = 'professional',
  size = 'md',
  tooltip,
  className = ''
}: FloatingActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getPositionStyles = () => {
    const baseOffset = '2rem'
    switch (position) {
      case 'bottom-right':
        return { bottom: baseOffset, right: baseOffset }
      case 'bottom-left':
        return { bottom: baseOffset, left: baseOffset }
      case 'top-right':
        return { top: baseOffset, right: baseOffset }
      case 'top-left':
        return { top: baseOffset, left: baseOffset }
      default:
        return { bottom: baseOffset, right: baseOffset }
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'professional':
        return {
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          boxShadow: isHovered 
            ? '0 10px 30px rgba(37, 99, 235, 0.3)'
            : '0 6px 20px rgba(37, 99, 235, 0.2)',
        }
      case 'primary':
        return {
          background: theme.colors.gradients.button,
          boxShadow: isHovered 
            ? theme.shadows.hover
            : theme.shadows.lg,
        }
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(226, 232, 240, 0.3)',
          boxShadow: isHovered 
            ? theme.shadows.light 
            : theme.shadows.light,
        }
      case 'subtle':
        return {
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          boxShadow: isHovered 
            ? '0 6px 20px rgba(30, 41, 59, 0.1)'
            : '0 2px 10px rgba(30, 41, 59, 0.05)',
        }
      default:
        return {
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          boxShadow: isHovered 
            ? '0 10px 30px rgba(37, 99, 235, 0.3)'
            : '0 6px 20px rgba(37, 99, 235, 0.2)',
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { width: '48px', height: '48px', fontSize: '18px' }
      case 'md':
        return { width: '60px', height: '60px', fontSize: '24px' }
      case 'lg':
        return { width: '72px', height: '72px', fontSize: '30px' }
      default:
        return { width: '60px', height: '60px', fontSize: '24px' }
    }
  }

  const buttonStyle = {
    position: 'fixed' as const,
    ...getPositionStyles(),
    ...getSizeStyles(),
    ...getVariantStyles(),
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered 
      ? 'translateY(-1px) scale(1.02)' 
      : 'translateY(0) scale(1)',
    zIndex: 1000,
    overflow: 'hidden',
  }

  const glowStyle = {
    position: 'absolute' as const,
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    borderRadius: '50%',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease',
    animation: isHovered ? 'rotate 3s linear infinite' : 'none',
    pointerEvents: 'none' as const,
  }

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .fab-tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1001;
        }
        
        .fab-tooltip.show {
          opacity: 1;
          visibility: visible;
        }
        
        .fab-tooltip.bottom-right {
          bottom: 100%;
          right: 0;
          margin-bottom: 10px;
        }
        
        .fab-tooltip.bottom-left {
          bottom: 100%;
          left: 0;
          margin-bottom: 10px;
        }
        
        .fab-tooltip.top-right {
          top: 100%;
          right: 0;
          margin-top: 10px;
        }
        
        .fab-tooltip.top-left {
          top: 100%;
          left: 0;
          margin-top: 10px;
        }
      `}</style>
      
      <button
        style={buttonStyle}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
        aria-label={tooltip}
      >
        <div style={glowStyle} />
        <span style={{ position: 'relative', zIndex: 2 }}>
          {icon}
        </span>
        
        {tooltip && (
          <div className={`fab-tooltip ${position} ${isHovered ? 'show' : ''}`}>
            {tooltip}
          </div>
        )}
      </button>
    </>
  )
}
