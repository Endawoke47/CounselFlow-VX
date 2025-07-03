'use client'

import { useState, useEffect } from 'react'

interface VibrantMetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: number
    direction: 'up' | 'down'
    label: string
  }
  variant?: 'default' | 'professional' | 'glass' | 'subtle' | 'gradient'
  progressValue?: number
  animated?: boolean
  className?: string
}

export function VibrantMetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  progressValue,
  animated = true,
  className = ''
}: VibrantMetricCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    if (animated && typeof value === 'number') {
      const duration = 2000
      const increment = value / (duration / 16)
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          current = value
          clearInterval(timer)
        }
        setAnimatedValue(Math.floor(current))
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [value, animated])

  const getVariantStyles = () => {
    switch (variant) {
      case 'professional':
        return {
          background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(226, 232, 240, 0.3)',
          color: '#1e293b',
        }
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(226, 232, 240, 0.3)',
          color: '#1e293b',
        }
      case 'subtle':
        return {
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(226, 232, 240, 0.2)',
          color: '#475569',
        }
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(148, 163, 184, 0.3)',
          color: 'white',
        }
      default:
        return {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(102, 126, 234, 0.1)',
          color: '#1a237e',
        }
    }
  }

  const cardStyle = {
    ...getVariantStyles(),
    borderRadius: '15px',
    padding: '2rem',
    position: 'relative' as const,
    overflow: 'hidden',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'default',
    transform: isHovered 
      ? 'translateY(-2px) scale(1.005)'
      : 'translateY(0px) scale(1)',
    boxShadow: isHovered
      ? '0 10px 30px rgba(37, 99, 235, 0.2)'
      : '0 6px 20px rgba(30, 41, 59, 0.1)',
  }

  const topBorderStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
    transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.6s ease',
    borderRadius: '25px 25px 0 0',
  }

  const shimmerStyle = {
    position: 'absolute' as const,
    top: 0,
    left: isHovered ? '100%' : '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.15), transparent)',
    transition: 'left 0.8s ease',
    pointerEvents: 'none' as const,
  }

  const iconContainerStyle = {
    fontSize: '3rem',
    background: variant === 'gradient' 
      ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
      : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: animated ? 'iconBounce 4s ease-in-out infinite' : 'none',
    filter: 'drop-shadow(0 1px 2px rgba(37, 99, 235, 0.1))',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    transition: 'transform 0.2s ease',
  }

  const valueStyle = {
    fontSize: '3.5rem',
    fontWeight: 800,
    background: variant === 'gradient' 
      ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
      : 'linear-gradient(135deg, #1e293b 0%, #2563eb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
    animation: animated ? 'numberCount 2s ease-out' : 'none',
    textShadow: '0 2px 4px rgba(30, 41, 59, 0.1)',
    ...(variant === 'gradient' && {
      background: 'white',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }),
  }

  const trendStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: trend?.direction === 'up' ? '#4caf50' : '#f44336',
    animation: trend ? `trend${trend.direction === 'up' ? 'Up' : 'Down'} 1s ease-in-out infinite alternate` : 'none',
  }

  const progressBarStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    marginTop: '1rem',
    overflow: 'hidden' as const,
    position: 'relative' as const,
  }

  const progressFillStyle = {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
    borderRadius: '4px',
    transform: `scaleX(${isVisible ? (progressValue || 0) / 100 : 0})`,
    transformOrigin: 'left',
    transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
  }

  return (
    <>
      <style jsx>{`
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-1px) scale(1.01); }
        }

        @keyframes numberCount {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes trendUp {
          from { transform: translateY(0); }
          to { transform: translateY(-1px); }
        }

        @keyframes trendDown {
          from { transform: translateY(0); }
          to { transform: translateY(1px); }
        }

        @keyframes neonPulse {
          0% { 
            filter: brightness(1) saturate(1);
            box-shadow: 0 0 30px rgba(0, 229, 255, 0.6);
          }
          100% { 
            filter: brightness(1.2) saturate(1.2);
            box-shadow: 0 0 60px rgba(0, 229, 255, 0.8), 0 20px 40px rgba(0, 229, 255, 0.4);
          }
        }

        .metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s ease;
          border-radius: 25px 25px 0 0;
        }

        .metric-card.visible::before {
          transform: scaleX(1);
        }
      `}</style>
      
      <div
        style={cardStyle}
        className={`metric-card ${isVisible ? 'visible' : ''} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={topBorderStyle} />
        <div style={shimmerStyle} />
        
        <div style={{ 
          position: 'relative', 
          zIndex: 2,
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
          transition: 'transform 0.4s ease'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              margin: 0,
              color: 'inherit'
            }}>
              {title}
            </h3>
            <div style={iconContainerStyle}>
              {icon}
            </div>
          </div>

          <div style={valueStyle}>
            {animated && typeof value === 'number' ? animatedValue : value}
          </div>

          {subtitle && (
            <div style={{
              color: variant === 'gradient' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(107, 114, 128, 1)',
              fontSize: '0.9rem',
              marginBottom: trend ? '0' : '1rem'
            }}>
              {subtitle}
            </div>
          )}

          {trend && (
            <div style={trendStyle}>
              <span>{trend.direction === 'up' ? '↗️' : '↘️'}</span>
              <span>{trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}</span>
            </div>
          )}

          {progressValue !== undefined && (
            <div style={progressBarStyle}>
              <div style={progressFillStyle} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
