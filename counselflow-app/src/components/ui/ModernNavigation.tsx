'use client'

import { useState } from 'react'
import { theme } from '../../lib/theme'
import { ModernButton } from './ModernComponents'

interface ModernNavigationProps {
  onModuleSelect: (moduleId: string) => void
  activeModule?: string
}

export function ModernNavigation({ onModuleSelect, activeModule }: ModernNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const modules = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: '🏠', 
      color: theme.colors.primary[500],
      description: 'Overview & Analytics'
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: '📊', 
      color: theme.colors.accent.purple,
      description: 'Advanced Insights'
    },
    { 
      id: 'ai-assistant', 
      name: 'AI Assistant', 
      icon: '🤖', 
      color: theme.colors.accent.indigo,
      description: 'Legal AI Hub'
    },
    { 
      id: 'contracts', 
      name: 'Contracts', 
      icon: '📄', 
      color: theme.colors.accent.emerald,
      description: 'Lifecycle Management'
    },
    { 
      id: 'matters', 
      name: 'Matters', 
      icon: '⚖️', 
      color: theme.colors.accent.orange,
      description: 'Case Management'
    },
    { 
      id: 'documents', 
      name: 'Documents', 
      icon: '📁', 
      color: theme.colors.accent.cyan,
      description: 'Repository & Search'
    },
    { 
      id: 'compliance', 
      name: 'Compliance', 
      icon: '🛡️', 
      color: theme.colors.accent.rose,
      description: 'Risk & Monitoring'
    },
    { 
      id: 'reports', 
      name: 'Reports', 
      icon: '📈', 
      color: theme.colors.accent.emerald,
      description: 'Business Intelligence'
    }
  ]

  const quickActions = [
    { icon: '🔔', label: 'Notifications', count: 12 },
    { icon: '📨', label: 'Messages', count: 5 },
    { icon: '⚡', label: 'Quick Actions', count: 3 },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isCollapsed ? '80px' : '320px',
        height: '100vh',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: `1px solid ${theme.colors.neutral[700]}`,
        zIndex: 100,
        padding: theme.spacing.lg,
        display: 'flex',
        flexDirection: 'column',
        transition: theme.animation.transition.normal,
        boxShadow: theme.shadows.xl
      }} className="mobile-hide">
        
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.xl
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.accent.purple})`,
              borderRadius: theme.borderRadius.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              boxShadow: theme.shadows.lg
            }}>
              ⚖️
            </div>
            {!isCollapsed && (
              <div>
                <h1 style={{ 
                  color: 'white', 
                  fontSize: theme.typography.fontSize.xl, 
                  margin: 0, 
                  fontWeight: theme.typography.fontWeight.bold,
                  fontFamily: theme.typography.fontFamily.sans.join(', ')
                }}>
                  CounselFlow
                </h1>
                <p style={{ 
                  color: theme.colors.neutral[400], 
                  fontSize: theme.typography.fontSize.sm, 
                  margin: 0 
                }}>
                  Legal Support
                </p>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              background: 'transparent',
              border: `1px solid ${theme.colors.neutral[600]}`,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.sm,
              color: theme.colors.neutral[400],
              cursor: 'pointer',
              transition: theme.animation.transition.fast
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.colors.primary[500]
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.colors.neutral[600]
              e.currentTarget.style.color = theme.colors.neutral[400]
            }}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div style={{ marginBottom: theme.spacing.xl }}>
            <h3 style={{
              color: theme.colors.neutral[300],
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              margin: 0,
              marginBottom: theme.spacing.md,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', gap: theme.spacing.sm }}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  style={{
                    flex: 1,
                    background: 'rgba(148, 163, 184, 0.1)',
                    border: `1px solid ${theme.colors.neutral[600]}`,
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.sm,
                    color: theme.colors.neutral[300],
                    cursor: 'pointer',
                    position: 'relative',
                    transition: theme.animation.transition.fast
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
                    e.currentTarget.style.borderColor = theme.colors.primary[500]
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)'
                    e.currentTarget.style.borderColor = theme.colors.neutral[600]
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{action.icon}</span>
                  {action.count > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      background: theme.colors.error,
                      color: 'white',
                      borderRadius: theme.borderRadius.full,
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: theme.typography.fontWeight.bold
                    }}>
                      {action.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: theme.spacing.sm,
          overflowY: 'auto'
        }}>
          <h3 style={{
            color: theme.colors.neutral[300],
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            margin: 0,
            marginBottom: theme.spacing.md,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {isCollapsed ? 'Modules' : 'Main Modules'}
          </h3>
          
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => onModuleSelect(module.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.md,
                padding: isCollapsed ? theme.spacing.md : theme.spacing.lg,
                background: activeModule === module.id 
                  ? `linear-gradient(135deg, ${module.color}20, ${module.color}10)` 
                  : 'transparent',
                border: activeModule === module.id 
                  ? `1px solid ${module.color}40` 
                  : '1px solid transparent',
                borderRadius: theme.borderRadius.lg,
                color: activeModule === module.id ? module.color : theme.colors.neutral[300],
                cursor: 'pointer',
                transition: theme.animation.transition.normal,
                width: '100%',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeModule !== module.id) {
                  e.currentTarget.style.background = `${module.color}10`
                  e.currentTarget.style.borderColor = `${module.color}30`
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeModule !== module.id) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.color = theme.colors.neutral[300]
                  e.currentTarget.style.transform = 'translateX(0)'
                }
              }}
            >
              <span style={{ 
                fontSize: '1.5rem',
                minWidth: '24px',
                textAlign: 'center'
              }}>
                {module.icon}
              </span>
              {!isCollapsed && (
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.medium,
                    marginBottom: '2px'
                  }}>
                    {module.name}
                  </div>
                  <div style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.neutral[500]
                  }}>
                    {module.description}
                  </div>
                </div>
              )}
              
              {activeModule === module.id && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  background: module.color,
                  borderRadius: '0 3px 3px 0'
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div style={{
            borderTop: `1px solid ${theme.colors.neutral[700]}`,
            paddingTop: theme.spacing.lg
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
              marginBottom: theme.spacing.md
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: theme.borderRadius.full,
                background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.accent.purple})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: theme.typography.fontWeight.bold
              }}>
                YE
              </div>
              <div>
                <div style={{ color: 'white', fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>
                  Yadel Endawoke
                </div>
                <div style={{ color: theme.colors.neutral[400], fontSize: theme.typography.fontSize.xs }}>
                  Legal Administrator
                </div>
              </div>
            </div>
            
            <ModernButton
              variant="outline"
              size="sm"
              onClick={() => console.log('Settings')}
              style={{ width: '100%' }}
            >
              ⚙️ Settings
            </ModernButton>
          </div>
        )}
      </nav>

      {/* Mobile Navigation */}
      <div 
        className="mobile-show"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.colors.neutral[700]}`,
          zIndex: 100,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${theme.spacing.lg}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.accent.purple})`,
            borderRadius: theme.borderRadius.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
          }}>
            ⚖️
          </div>
          <h1 style={{ 
            color: 'white', 
            fontSize: theme.typography.fontSize.lg, 
            margin: 0, 
            fontWeight: theme.typography.fontWeight.bold
          }}>
            CounselFlow
          </h1>
        </div>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 99,
          padding: theme.spacing.lg,
          display: 'none'
        }} className="mobile-show">
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => {
                  onModuleSelect(module.id)
                  setIsMobileMenuOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.lg,
                  padding: theme.spacing.lg,
                  background: activeModule === module.id 
                    ? `linear-gradient(135deg, ${module.color}20, ${module.color}10)` 
                    : 'transparent',
                  border: activeModule === module.id 
                    ? `1px solid ${module.color}40` 
                    : `1px solid ${theme.colors.neutral[700]}`,
                  borderRadius: theme.borderRadius.lg,
                  color: activeModule === module.id ? module.color : 'white',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{module.icon}</span>
                <div>
                  <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                    {module.name}
                  </div>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.sm, 
                    color: theme.colors.neutral[400] 
                  }}>
                    {module.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-hide { display: none !important; }
          .mobile-show { display: flex !important; }
          .mobile-full { margin-left: 0 !important; padding-top: 80px !important; }
        }
      `}</style>
    </>
  )
}
