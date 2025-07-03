'use client'

import { useState } from 'react'
import { Badge } from './UIComponents'

interface NavigationProps {
  onModuleSelect: (moduleId: string) => void
  activeModule?: string
}

export function Navigation({ onModuleSelect, activeModule }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications] = useState([
    { id: 1, type: 'urgent', count: 3 },
    { id: 2, type: 'pending', count: 8 },
    { id: 3, type: 'due', count: 5 }
  ])

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠', color: '#3B82F6' },
    { id: 'analytics', name: 'Analytics', icon: '📊', color: '#8B5CF6' },
    { id: 'contracts', name: 'Contracts', icon: '📄', color: '#10B981' },
    { id: 'matters', name: 'Matters', icon: '⚖️', color: '#F59E0B' },
    { id: 'documents', name: 'Documents', icon: '📁', color: '#06B6D4' },
    { id: 'compliance', name: 'Compliance', icon: '🛡️', color: '#EF4444' },
    { id: 'ai-assistant', name: 'AI Assistant', icon: '🤖', color: '#8B5CF6' },
    { id: 'reports', name: 'Reports', icon: '📈', color: '#10B981' }
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '280px',
        height: '100vh',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(148, 163, 184, 0.1)',
        zIndex: 100,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column'
      }} className="mobile-hide">
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>
            ⚖️
          </div>
          <div>
            <h1 style={{ color: 'white', fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>
              CounselFlow
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.8rem', margin: 0 }}>
              Legal Support
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => onModuleSelect(module.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                background: activeModule === module.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                border: activeModule === module.id ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                borderRadius: '10px',
                color: activeModule === module.id ? '#60A5FA' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                if (activeModule !== module.id) {
                  e.currentTarget.style.background = 'rgba(148, 163, 184, 0.05)'
                  e.currentTarget.style.color = 'white'
                }
              }}
              onMouseOut={(e) => {
                if (activeModule !== module.id) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#94A3B8'
                }
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{module.icon}</span>
              <span style={{ fontWeight: '500' }}>{module.name}</span>
              {module.id === 'matters' && (
                <Badge variant="warning" size="small">3</Badge>
              )}
              {module.id === 'contracts' && (
                <Badge variant="error" size="small">5</Badge>
              )}
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div style={{
          marginTop: 'auto',
          padding: '1rem',
          background: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #10B981, #06B6D4)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}>
              👤
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontSize: '0.9rem', fontWeight: '500' }}>
                John Smith
              </div>
              <div style={{ color: '#64748B', fontSize: '0.7rem' }}>
                Senior Partner
              </div>
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}>
              ⚙️
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div style={{ display: 'none' }} className="mobile-show">
        {/* Mobile Header */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem'
            }}>
              ⚖️
            </div>
            <h1 style={{ color: 'white', fontSize: '1.1rem', margin: 0 }}>
              CounselFlow
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}>
                🔔
              </button>
              <div style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '18px',
                height: '18px',
                background: '#EF4444',
                borderRadius: '50%',
                fontSize: '0.7rem',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                3
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                fontSize: '1.5rem'
              }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 150,
            padding: '1rem',
            animation: 'slideDown 0.3s ease'
          }}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
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
                    gap: '1rem',
                    padding: '1rem',
                    background: activeModule === module.id ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 41, 59, 0.5)',
                    border: 'none',
                    borderRadius: '12px',
                    color: activeModule === module.id ? '#60A5FA' : 'white',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '1rem'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{module.icon}</span>
                  <span style={{ fontWeight: '500' }}>{module.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '300px',
        right: '20px',
        height: '50px',
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        borderRadius: '12px',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50
      }} className="mobile-hide">
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: '#22C55E',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
              System Online
            </span>
          </div>
          <div style={{ color: '#64748B', fontSize: '0.8rem' }}>
            Last sync: 2 minutes ago
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {notifications.map((notif) => (
            <Badge key={notif.id} variant={notif.type === 'urgent' ? 'error' : notif.type === 'pending' ? 'warning' : 'info'} size="small">
              {notif.count} {notif.type}
            </Badge>
          ))}
        </div>
      </div>
    </>
  )
}
