'use client'

import { useState } from 'react'
import { VibrantCTAButton } from './VibrantCTAButton'
import { Vibrant3DCard } from './Vibrant3DCard'
import { AnimatedBackground } from './AnimatedBackground'

interface LoginPageProps {
  onLogin: (credentials: { username: string; password: string }) => void
  onForgotPassword?: () => void
  error?: string
  loading?: boolean
}

export function LoginPage({ 
  onLogin, 
  onForgotPassword, 
  error, 
  loading = false 
}: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && password.trim()) {
      onLogin({ username: username.trim(), password })
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '2px solid rgba(226, 232, 240, 0.5)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(5px)',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.25s ease',
    fontWeight: 500,
  }

  const inputFocusStyle = {
    borderColor: '#2563eb',
    boxShadow: '0 0 10px rgba(37, 99, 235, 0.2)',
    transform: 'translateY(-1px)',
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    color: '#1a237e',
    fontSize: '0.9rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  }

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative' as const,
  }

  return (
    <>
      <AnimatedBackground 
        variant="professional" 
        showShapes={false} 
        showParticles={false} 
        intensity="minimal"
      />
      
      <div style={containerStyle}>
        <div style={{ maxWidth: '450px', width: '100%' }}>
          <Vibrant3DCard 
            variant="glass" 
            size="lg" 
            hover3D={true}
            className="login-card"
          >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            {/* Logo */}
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              animation: 'logoFloat 3s ease-in-out infinite',
              display: 'inline-block',
            }}>
              ⚖️
            </div>
            
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #1a237e 0%, #2196f3 50%, #673ab7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              CounselFlow
            </h1>
            
            <p style={{
              color: 'rgba(26, 35, 126, 0.7)',
              fontSize: '1.1rem',
              fontWeight: 500,
            }}>
              Professional Legal Support
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {/* Username Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="username" style={labelStyle}>
                👤 Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={loading}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, { 
                  borderColor: 'rgba(102, 126, 234, 0.2)', 
                  boxShadow: 'none',
                  transform: 'translateY(0)'
                })}
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={labelStyle}>
                🔒 Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  style={{ ...inputStyle, paddingRight: '3.5rem' }}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, { 
                    borderColor: 'rgba(102, 126, 234, 0.2)', 
                    boxShadow: 'none',
                    transform: 'translateY(0)'
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    color: '#1a237e',
                    opacity: 0.7,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(229, 57, 53, 0.05) 100%)',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                color: '#d32f2f',
                fontSize: '0.9rem',
                fontWeight: 500,
                textAlign: 'center' as const,
                animation: 'shake 0.5s ease-in-out',
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Login Button */}
            <VibrantCTAButton
              variant="professional"
              size="lg"
              fullWidth
              disabled={loading || !username.trim() || !password.trim()}
              onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
              icon={loading ? '⏳' : '�'}
            >
              {loading ? 'Signing In...' : 'Sign In to CounselFlow'}
            </VibrantCTAButton>

            {/* Forgot Password */}
            {onForgotPassword && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2196f3',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1976d2'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#2196f3'}
                >
                  🔑 Forgot your password?
                </button>
              </div>
            )}
          </form>

          {/* Demo Credentials */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '15px',
            border: '1px solid rgba(102, 126, 234, 0.2)',
          }}>
            <h3 style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
              color: '#1a237e',
              textAlign: 'center' as const,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.5px',
            }}>
              🔑 Demo Credentials
            </h3>
            <div style={{
              display: 'grid',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'rgba(26, 35, 126, 0.8)',
            }}>
              <div><strong>Username:</strong> admin</div>
              <div><strong>Password:</strong> counselflow2025</div>
            </div>
            <div style={{
              marginTop: '0.75rem',
              fontSize: '0.8rem',
              color: 'rgba(26, 35, 126, 0.6)',
              textAlign: 'center' as const,
              fontStyle: 'italic',
            }}>
              Or try: lawyer / legal123
            </div>
          </div>
          </Vibrant3DCard>
        </div>
      </div>

      <style jsx>{`
        @keyframes logoFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(5deg); 
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .login-card input:focus {
          border-color: #2196f3 !important;
          box-shadow: 0 0 20px rgba(33, 150, 243, 0.3) !important;
          transform: translateY(-2px) !important;
        }
        
        .login-card input::placeholder {
          color: rgba(26, 35, 126, 0.5);
          font-weight: 400;
        }
      `}</style>
    </>
  )
}
