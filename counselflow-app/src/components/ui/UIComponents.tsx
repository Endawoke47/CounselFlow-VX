'use client'

import { useState, useEffect } from 'react'

interface NotificationProps {
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  onClose: () => void
}

export function Notification({ type, title, message, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: { bg: 'rgba(34, 197, 94, 0.1)', border: '#22C55E', icon: '✅' },
    warning: { bg: 'rgba(245, 158, 11, 0.1)', border: '#F59E0B', icon: '⚠️' },
    error: { bg: 'rgba(239, 68, 68, 0.1)', border: '#EF4444', icon: '❌' },
    info: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3B82F6', icon: 'ℹ️' }
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: colors[type].bg,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${colors[type].border}`,
      borderRadius: '12px',
      padding: '1rem',
      minWidth: '300px',
      maxWidth: '400px',
      zIndex: 1000,
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{colors[type].icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>
            {title}
          </div>
          <div style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.4' }}>
            {message}
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: 0
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export function LoadingSpinner({ size = 'medium', color = '#60A5FA' }: LoadingSpinnerProps) {
  const sizes = {
    small: '16px',
    medium: '24px',
    large: '32px'
  }

  return (
    <div style={{
      width: sizes[size],
      height: sizes[size],
      border: `2px solid rgba(255, 255, 255, 0.1)`,
      borderLeftColor: color,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  )
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
}

export function Modal({ isOpen, onClose, title, children, size = 'medium' }: ModalProps) {
  if (!isOpen) return null

  const sizes = {
    small: '400px',
    medium: '600px',
    large: '800px'
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '16px',
        width: '90%',
        maxWidth: sizes[size],
        maxHeight: '90vh',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ color: 'white', fontSize: '1.3rem', fontWeight: '600', margin: 0 }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(148, 163, 184, 0.1)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div style={{
          padding: '1.5rem',
          overflowY: 'auto',
          maxHeight: 'calc(90vh - 100px)'
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: string
  onClick?: () => void
}

export function Card({ children, className = '', hover = false, padding = '1.5rem', onClick }: CardProps) {
  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        borderRadius: '12px',
        padding: padding,
        cursor: onClick ? 'pointer' : 'default',
        transition: hover ? 'all 0.3s ease' : 'none'
      }}
      className={`${className} ${hover ? 'card-hover' : ''}`}
      onClick={onClick}
      onMouseOver={hover ? (e) => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)'
      } : undefined}
      onMouseOut={hover ? (e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      } : undefined}
    >
      {children}
    </div>
  )
}

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button'
}: ButtonProps) {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      color: 'white',
      border: 'none'
    },
    secondary: {
      background: 'rgba(148, 163, 184, 0.1)',
      color: '#94A3B8',
      border: '1px solid rgba(148, 163, 184, 0.3)'
    },
    outline: {
      background: 'transparent',
      color: '#60A5FA',
      border: '1px solid rgba(59, 130, 246, 0.5)'
    },
    ghost: {
      background: 'transparent',
      color: '#94A3B8',
      border: 'none'
    }
  }

  const sizes = {
    small: { padding: '0.5rem 1rem', fontSize: '0.9rem' },
    medium: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    large: { padding: '1rem 2rem', fontSize: '1.1rem' }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: '8px',
        fontWeight: '600',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'all 0.2s ease'
      }}
    >
      {loading && <LoadingSpinner size="small" color="currentColor" />}
      {children}
    </button>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'small' | 'medium'
}

export function Badge({ children, variant = 'neutral', size = 'medium' }: BadgeProps) {
  const variants = {
    success: { bg: 'rgba(34, 197, 94, 0.2)', color: '#22C55E' },
    warning: { bg: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' },
    error: { bg: 'rgba(239, 68, 68, 0.2)', color: '#EF4444' },
    info: { bg: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' },
    neutral: { bg: 'rgba(148, 163, 184, 0.2)', color: '#94A3B8' }
  }

  const sizes = {
    small: { padding: '0.25rem 0.5rem', fontSize: '0.7rem' },
    medium: { padding: '0.25rem 0.75rem', fontSize: '0.8rem' }
  }

  return (
    <span style={{
      ...sizes[size],
      background: variants[variant].bg,
      color: variants[variant].color,
      borderRadius: '12px',
      fontWeight: '500',
      whiteSpace: 'nowrap'
    }}>
      {children}
    </span>
  )
}

export function Divider({ margin = '1rem' }: { margin?: string }) {
  return (
    <div style={{
      height: '1px',
      background: 'rgba(148, 163, 184, 0.1)',
      margin: `${margin} 0`
    }} />
  )
}
