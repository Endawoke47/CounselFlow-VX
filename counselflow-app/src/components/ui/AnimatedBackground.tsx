'use client'

import { useEffect, useState } from 'react'

interface AnimatedBackgroundProps {
  variant?: 'professional' | 'subtle' | 'legal' | 'minimal' | 'elegant'
  showShapes?: boolean
  showParticles?: boolean
  intensity?: 'minimal' | 'low' | 'medium'
  className?: string
}

export function AnimatedBackground({
  variant = 'professional',
  showShapes = false,
  showParticles = false,
  intensity = 'minimal',
  className = ''
}: AnimatedBackgroundProps) {
  const [gradientAngle, setGradientAngle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle(prev => (prev + 0.05) % 360)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const getBackgroundGradient = () => {
    switch (variant) {
      case 'professional':
        return `linear-gradient(${gradientAngle}deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)`
      case 'subtle':
        return `linear-gradient(${gradientAngle}deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)`
      case 'legal':
        return `linear-gradient(${gradientAngle}deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #94a3b8 100%)`
      case 'minimal':
        return `linear-gradient(${gradientAngle}deg, #ffffff 0%, #f8fafc 100%)`
      case 'elegant':
        return `linear-gradient(${gradientAngle}deg, #1a237e 0%, #283593 50%, #3f51b5 100%)`
      default:
        return `linear-gradient(${gradientAngle}deg, #f8fafc 0%, #e2e8f0 50%, #ffffff 100%)`
    }
  }

  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'minimal': return 0.1
      case 'low': return 0.3
      case 'medium': return 0.5
      default: return 0.3
    }
  }

  const floatingShapes = [
    { 
      id: 1, 
      type: 'square', 
      color: 'linear-gradient(135deg, #2196f3, #03a9f4)',
      delay: 0,
      size: 80 * getIntensityMultiplier(),
      position: { top: '10%', left: '10%' }
    },
    { 
      id: 2, 
      type: 'circle', 
      color: 'linear-gradient(135deg, #673ab7, #9c27b0)',
      delay: 4,
      size: 100 * getIntensityMultiplier(),
      position: { top: '20%', right: '15%' }
    },
    { 
      id: 3, 
      type: 'triangle', 
      color: 'linear-gradient(135deg, #009688, #26a69a)',
      delay: 8,
      size: 70 * getIntensityMultiplier(),
      position: { bottom: '30%', left: '20%' }
    },
    { 
      id: 4, 
      type: 'diamond', 
      color: 'linear-gradient(135deg, #ff9800, #ff7043)',
      delay: 12,
      size: 90 * getIntensityMultiplier(),
      position: { bottom: '20%', right: '25%' }
    },
    { 
      id: 5, 
      type: 'hexagon', 
      color: 'linear-gradient(135deg, #e91e63, #ad1457)',
      delay: 16,
      size: 60 * getIntensityMultiplier(),
      position: { top: '50%', left: '50%' }
    }
  ]

  const getShapeClipPath = (type: string) => {
    switch (type) {
      case 'circle':
        return 'circle(50%)'
      case 'triangle':
        return 'polygon(50% 0%, 0% 100%, 100% 100%)'
      case 'diamond':
        return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
      case 'hexagon':
        return 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
      default:
        return 'none'
    }
  }

  return (
    <>
      <style jsx>{`
        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          overflow: hidden;
          background: ${getBackgroundGradient()};
          animation: backgroundPulse 10s ease-in-out infinite;
        }

        @keyframes backgroundPulse {
          0%, 100% { 
            filter: brightness(1) saturate(1);
          }
          50% { 
            filter: brightness(1.1) saturate(1.2);
          }
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(102, 126, 234, ${0.2 * getIntensityMultiplier()}) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(245, 87, 108, ${0.2 * getIntensityMultiplier()}) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(79, 172, 254, ${0.15 * getIntensityMultiplier()}) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, rgba(240, 147, 251, ${0.18 * getIntensityMultiplier()}) 0%, transparent 50%);
          z-index: -1;
        }

        .background-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(45deg, transparent 48%, rgba(102, 126, 234, ${0.05 * getIntensityMultiplier()}) 49%, rgba(102, 126, 234, ${0.05 * getIntensityMultiplier()}) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(245, 87, 108, ${0.03 * getIntensityMultiplier()}) 49%, rgba(245, 87, 108, ${0.03 * getIntensityMultiplier()}) 51%, transparent 52%);
          background-size: 80px 80px;
          animation: backgroundShift 25s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes backgroundShift {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-10px) translateY(-10px); }
          50% { transform: translateX(10px) translateY(-5px); }
          75% { transform: translateX(-5px) translateY(10px); }
        }

        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .shape {
          position: absolute;
          opacity: ${0.15 * getIntensityMultiplier()};
          animation: float3D 20s ease-in-out infinite;
          border-radius: 20px;
        }

        @keyframes float3D {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          20% {
            transform: translateY(-10px) translateX(8px);
          }
          40% {
            transform: translateY(-15px) translateX(-5px);
          }
          60% {
            transform: translateY(-8px) translateX(10px);
          }
          80% {
            transform: translateY(-12px) translateX(-3px);
          }
        }

        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          animation: particleFloat 15s linear infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) translateX(0px) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) translateX(10px) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(10vh) translateX(-10px) scale(1);
          }
          100% {
            transform: translateY(0vh) translateX(0px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
      
      <div className={`animated-background ${className}`}>
        <div className="background-overlay" />
        <div className="background-pattern" />
        
        {showShapes && (
          <div className="floating-shapes">
            {floatingShapes.map((shape) => (
              <div
                key={shape.id}
                className="shape"
                style={{
                  ...shape.position,
                  width: shape.size,
                  height: shape.size,
                  background: shape.color,
                  animationDelay: `${shape.delay}s`,
                  clipPath: getShapeClipPath(shape.type),
                  boxShadow: `0 20px 40px rgba(102, 126, 234, ${0.3 * getIntensityMultiplier()})`,
                }}
              />
            ))}
          </div>
        )}
        
        {showParticles && (
          <div className="particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
