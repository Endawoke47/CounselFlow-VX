'use client'

import { useState, useEffect } from 'react'
import { ModernNavigation } from '../components/ui/ModernNavigation'
import { ModernDashboard } from '../components/ui/ModernDashboard'
import { LoginPage } from '../components/ui/LoginPage'
import { Button, Badge, Notification, Modal, Divider } from '../components/ui/UIComponents'
import { AuthProvider, useAuth } from '../lib/auth'
import { theme } from '../lib/theme'

function CounselFlowApp() {
  const { user, isAuthenticated, login, loading, error } = useAuth()
  const [activeModule, setActiveModule] = useState('dashboard')
  const [showWelcome, setShowWelcome] = useState(true)
  const [notifications, setNotifications] = useState<Array<{
    id: number
    type: 'success' | 'warning' | 'error' | 'info'
    title: string
    message: string
  }>>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      // Welcome notification for authenticated users
      setTimeout(() => {
        addNotification('success', `Welcome back, ${user.name || user.username}!`, 'Your professional legal support system is ready.')
      }, 1000)
    }
  }, [isAuthenticated, user])

  const addNotification = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, type, title, message }])
  }

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleModuleSelect = (moduleId: string) => {
    setActiveModule(moduleId)
    setShowWelcome(false)
    addNotification('info', 'Module Switched', `Now viewing ${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)} module`)
  }

  const handleLogin = async (credentials: { username: string; password: string }) => {
    const success = await login(credentials)
    if (success) {
      setShowWelcome(false)
    }
  }

  const handleForgotPassword = () => {
    addNotification('info', 'Password Reset', 'Password reset functionality would be implemented here. Contact your administrator.')
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onForgotPassword={handleForgotPassword}
        error={error || undefined}
        loading={loading}
      />
    )
  }

  if (showWelcome) {
    return <WelcomeScreen onEnter={() => setShowWelcome(false)} />
  }

  return (
    <>
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <ModernNavigation 
          onModuleSelect={handleModuleSelect} 
          activeModule={activeModule}
        />
        
        {/* Main Content Area */}
        <main 
          style={{
            marginLeft: '320px',
            minHeight: '100vh',
            transition: theme.animation.transition.normal
          }} 
          className="mobile-full"
        >
          {activeModule === 'dashboard' ? (
            <ModernDashboard />
          ) : (
            <ModuleContent 
              activeModule={activeModule} 
              onAddNotification={addNotification}
            />
          )}
        </main>

        {/* Notifications */}
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}

        {/* Example Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Contract Details"
          size="large"
        >
          <div style={{ color: theme.colors.neutral[400] }}>
            <h3 style={{ color: 'white', marginBottom: theme.spacing.lg }}>Service Agreement - TechCorp Inc.</h3>
            <p style={{ marginBottom: theme.spacing.lg }}>
              This comprehensive service agreement outlines the terms and conditions for legal services 
              provided to TechCorp Inc. The contract includes provisions for intellectual property, 
              confidentiality, and dispute resolution.
            </p>
            <Divider />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.xl, margin: `${theme.spacing.lg} 0` }}>
              <div>
                <strong style={{ color: 'white' }}>Contract Value:</strong>
                <p>$250,000</p>
              </div>
              <div>
                <strong style={{ color: 'white' }}>Duration:</strong>
                <p>12 months</p>
              </div>
              <div>
                <strong style={{ color: 'white' }}>Status:</strong>
                <p><Badge variant="warning">Under Review</Badge></p>
              </div>
              <div>
                <strong style={{ color: 'white' }}>Next Action:</strong>
                <p>Client signature required</p>
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', gap: theme.spacing.lg, justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary">
                Send for Signature
              </Button>
            </div>
          </div>
        </Modal>
      </div>

      {/* CSS Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 25px 70px ${theme.colors.primary[500]}40;
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 30px 80px ${theme.colors.primary[500]}60;
            }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .mobile-full {
              margin-left: 0 !important;
              padding-top: 80px !important;
            }
          }
        `
      }} />
    </>
  )
}

function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.neutral[900]} 0%, ${theme.colors.neutral[800]} 25%, ${theme.colors.neutral[700]} 50%, ${theme.colors.neutral[600]} 75%, ${theme.colors.neutral[500]} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.xl
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '900px',
        animation: 'fadeInUp 1s ease-out'
      }}>
        {/* Logo */}
        <div style={{
          width: '140px',
          height: '140px',
          background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.accent.purple})`,
          borderRadius: theme.borderRadius.xl,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3.5rem',
          margin: `0 auto ${theme.spacing['3xl']}`,
          boxShadow: `0 25px 70px ${theme.colors.primary[500]}40`,
          animation: 'pulse 3s infinite'
        }}>
          ⚖️
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: theme.typography.fontSize['4xl'],
          fontWeight: theme.typography.fontWeight.extrabold,
          marginBottom: theme.spacing.lg,
          background: `linear-gradient(135deg, ${theme.colors.primary[400]}, ${theme.colors.accent.purple}, ${theme.colors.accent.emerald})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: '1.1',
          fontFamily: theme.typography.fontFamily.sans.join(', ')
        }}>
          CounselFlow
        </h1>

        <p style={{
          fontSize: theme.typography.fontSize['2xl'],
          color: theme.colors.neutral[300],
          marginBottom: theme.spacing.md,
          fontWeight: theme.typography.fontWeight.normal
        }}>
          Professional Legal Support
        </p>

        <p style={{
          fontSize: theme.typography.fontSize.lg,
          color: theme.colors.neutral[400],
          marginBottom: theme.spacing['3xl'],
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: `0 auto ${theme.spacing['3xl']}`
        }}>
          Experience the future of legal practice with revolutionary AI-powered workflow automation, 
          advanced analytics, and comprehensive case management in one unified platform.
        </p>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: theme.spacing.xl,
          marginBottom: theme.spacing['3xl']
        }}>
          {[
            { icon: '🤖', title: 'AI Assistant', desc: 'Intelligent legal guidance' },
            { icon: '📊', title: 'Analytics', desc: 'Advanced insights & reports' },
            { icon: '⚖️', title: 'Case Management', desc: 'Streamlined workflows' },
            { icon: '🛡️', title: 'Compliance', desc: 'Risk monitoring & control' }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.colors.neutral[700]}`,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.xl,
                textAlign: 'center',
                transition: theme.animation.transition.normal,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = theme.shadows['2xl']
                e.currentTarget.style.borderColor = theme.colors.primary[500]
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = theme.colors.neutral[700]
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: theme.spacing.md }}>
                {feature.icon}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.semibold,
                marginBottom: theme.spacing.sm
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: theme.colors.neutral[400],
                fontSize: theme.typography.fontSize.sm,
                margin: 0
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onEnter}
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary[600]}, ${theme.colors.primary[700]})`,
            border: 'none',
            borderRadius: theme.borderRadius.lg,
            padding: `${theme.spacing.lg} ${theme.spacing['2xl']}`,
            color: 'white',
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            cursor: 'pointer',
            transition: theme.animation.transition.normal,
            boxShadow: theme.shadows.xl,
            fontFamily: theme.typography.fontFamily.sans.join(', ')
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = theme.shadows['2xl']
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = theme.shadows.xl
          }}
        >
          Enter CounselFlow →
        </button>

        <p style={{
          color: theme.colors.neutral[500],
          fontSize: theme.typography.fontSize.sm,
          marginTop: theme.spacing.lg
        }}>
          Click anywhere or press Enter to continue
        </p>
      </div>
    </div>
  )
}

// Module Content Component (placeholder for other modules)
function ModuleContent({ 
  activeModule, 
  onAddNotification
}: {
  activeModule: string
  onAddNotification: (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => void
}) {
  return (
    <div style={{ 
      padding: theme.spacing.xl,
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        textAlign: 'center',
        padding: theme.spacing['3xl']
      }}>
        <h2 style={{
          color: 'white',
          fontSize: theme.typography.fontSize['3xl'],
          fontWeight: theme.typography.fontWeight.bold,
          marginBottom: theme.spacing.lg
        }}>
          {activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} Module
        </h2>
        <p style={{
          color: theme.colors.neutral[400],
          fontSize: theme.typography.fontSize.lg,
          marginBottom: theme.spacing.xl
        }}>
          This module is under development. Enhanced features coming soon!
        </p>
        <button
          onClick={() => onAddNotification('info', 'Module Demo', `${activeModule} features will be available in the next update.`)}
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary[600]}, ${theme.colors.primary[700]})`,
            border: 'none',
            borderRadius: theme.borderRadius.lg,
            padding: `${theme.spacing.md} ${theme.spacing.xl}`,
            color: 'white',
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.medium,
            cursor: 'pointer',
            transition: theme.animation.transition.normal
          }}
        >
          Request Demo
        </button>
      </div>
    </div>
  )
}

// Main App Component with Auth Provider
export default function App() {
  return (
    <AuthProvider>
      <CounselFlowApp />
    </AuthProvider>
  )
}
