'use client'

import { FloatingActionButton } from './FloatingActionButton'
import { VibrantCTAButton } from './VibrantCTAButton'
import { Vibrant3DCard } from './Vibrant3DCard'
import { VibrantMetricCard } from './VibrantMetricCard'
import { AnimatedBackground } from './AnimatedBackground'

export function ModernDashboard() {
  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`)
  }

  return (
    <>
      <AnimatedBackground 
        variant="professional" 
        showShapes={false} 
        showParticles={false} 
        intensity="minimal"
      />
      
      <div style={{ 
        minHeight: '100vh', 
        padding: '2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Section with 3D Effects */}
        <Vibrant3DCard 
          variant="gradient" 
          size="xl" 
          hover3D={false}
          className="mb-8"
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              color: 'white',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}>
              Welcome to CounselFlow
            </h1>
            <p style={{
              fontSize: '1.3rem',
              marginBottom: '2rem',
              opacity: 0.9,
              lineHeight: 1.6,
              color: 'white'
            }}>
              Experience the future of legal practice management with cutting-edge 3D interfaces, 
              intelligent automation, and seamless workflow integration.
            </p>
            <VibrantCTAButton
              variant="professional"
              size="lg"
              icon="🚀"
              onClick={() => handleQuickAction('explore')}
            >
              Explore Features
            </VibrantCTAButton>
          </div>
        </Vibrant3DCard>

        {/* Metrics Grid with Vibrant 3D Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <VibrantMetricCard
            title="Active Cases"
            value={127}
            subtitle="Currently open cases"
            icon="📋"
            trend={{ value: 12, direction: 'up', label: 'from last month' }}
            variant="professional"
            progressValue={85}
            animated={true}
          />

          <VibrantMetricCard
            title="Total Clients"
            value="1,248"
            subtitle="Registered clients"
            icon="👥"
            trend={{ value: 8, direction: 'up', label: 'from last month' }}
            variant="glass"
            progressValue={92}
            animated={true}
          />

          <VibrantMetricCard
            title="Monthly Revenue"
            value="$89,250"
            subtitle="This month's earnings"
            icon="💰"
            trend={{ value: 15, direction: 'up', label: 'from last month' }}
            variant="professional"
            progressValue={78}
            animated={true}
          />

          <VibrantMetricCard
            title="Pending Tasks"
            value={23}
            subtitle="Require attention"
            icon="⏳"
            trend={{ value: 5, direction: 'down', label: 'from last month' }}
            variant="default"
            progressValue={45}
            animated={true}
          />
        </div>

        {/* Quick Actions with Vibrant 3D Cards */}
        <Vibrant3DCard 
          variant="glass" 
          size="lg" 
          hover3D={false}
          className="mb-8"
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #1a237e 0%, #2196f3 50%, #673ab7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Quick Actions
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {[
              { icon: '➕', label: 'New Case', action: 'new-case' },
              { icon: '👤', label: 'Add Client', action: 'add-client' },
              { icon: '📄', label: 'Upload Document', action: 'upload-doc' },
              { icon: '💸', label: 'Create Invoice', action: 'create-invoice' },
              { icon: '📅', label: 'Schedule Meeting', action: 'schedule-meeting' },
              { icon: '⏱️', label: 'Time Entry', action: 'time-entry' }
            ].map((item, index) => (
              <VibrantCTAButton
                key={item.action}
                variant={(['professional', 'subtle', 'glass', 'primary', 'secondary', 'professional'][index % 6]) as 'professional' | 'subtle' | 'glass' | 'primary' | 'secondary'}
                size="md"
                icon={item.icon}
                onClick={() => handleQuickAction(item.action)}
                className="action-button"
                fullWidth
              >
                {item.label}
              </VibrantCTAButton>
            ))}
          </div>
        </Vibrant3DCard>

        {/* Features Section with Multiple Card Variants */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #1a237e 0%, #2196f3 50%, #673ab7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Revolutionary Legal Solutions
          </h2>
          
          <p style={{
            color: 'rgba(107, 114, 128, 0.8)',
            fontSize: '1.2rem',
            marginBottom: '3rem',
            textAlign: 'center',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Powered by cutting-edge technology and designed with legal professionals in mind
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem'
          }}>
            {[
              {
                icon: '⚖️',
                title: 'Advanced Case Management',
                description: 'Leverage AI-powered case organization with 3D timeline visualization, predictive analytics, and automated deadline tracking.',
                variant: 'vibrant'
              },
              {
                icon: '🤖',
                title: 'AI-Powered Insights',
                description: 'Harness machine learning algorithms to analyze case patterns, predict outcomes, and suggest optimal strategies.',
                variant: 'glass'
              },
              {
                icon: '🌐',
                title: 'Immersive Client Portal',
                description: 'Provide clients with a revolutionary 3D interface to explore their cases and access documents in virtual environments.',
                variant: 'professional'
              },
              {
                icon: '🔮',
                title: 'Predictive Analytics',
                description: 'Visualize data trends in stunning 3D charts and graphs. Predict case outcomes and optimize your practice.',
                variant: 'elevated'
              },
              {
                icon: '🛡️',
                title: 'Quantum Security',
                description: 'Future-proof your practice with quantum-encrypted security, biometric authentication, and blockchain-verified document integrity.',
                variant: 'gradient'
              },
              {
                icon: '🚀',
                title: 'Next-Gen Automation',
                description: 'Automate routine tasks with intelligent workflows, natural language processing, and smart contract generation.',
                variant: 'vibrant'
              }
            ].map((feature, index) => (
              <Vibrant3DCard
                key={index}
                variant={feature.variant as 'glass' | 'professional' | 'elevated' | 'subtle' | 'gradient'}
                size="lg"
                hover3D={false}
                glowEffect={false}
              >
                <div style={{
                  fontSize: '3.5rem',
                  marginBottom: '1.5rem',
                  display: 'inline-block',
                  background: feature.variant === 'gradient' || feature.variant === 'professional' 
                    ? 'white' 
                    : 'linear-gradient(135deg, #2196f3 0%, #673ab7 50%, #009688 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 6px 12px rgba(102, 126, 234, 0.3))'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: feature.variant === 'gradient' || feature.variant === 'professional' ? 'white' : '#1e293b'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{
                  lineHeight: 1.7,
                  color: feature.variant === 'gradient' || feature.variant === 'professional' 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'rgba(107, 114, 128, 1)'
                }}>
                  {feature.description}
                </p>
              </Vibrant3DCard>
            ))}
          </div>
        </div>

        {/* Analytics Section */}
        <Vibrant3DCard 
          variant="elevated" 
          size="xl" 
          hover3D={false}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #1a237e 0%, #2196f3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Performance Analytics
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { title: 'Case Success Rate', value: 87, icon: '🎯', color: '#4caf50' },
              { title: 'Client Satisfaction', value: 94, icon: '😊', color: '#2196f3' },
              { title: 'Efficiency Score', value: 92, icon: '⚡', color: '#ff9800' }
            ].map((metric, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                  {metric.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  marginBottom: '1rem',
                  color: '#1a237e'
                }}>
                  {metric.title}
                </h3>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: `conic-gradient(${metric.color} ${metric.value * 3.6}deg, rgba(255, 255, 255, 0.2) 0deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  position: 'relative' as const
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: metric.color
                  }}>
                    {metric.value}%
                  </div>
                </div>
                <p style={{ 
                  color: 'rgba(107, 114, 128, 1)',
                  fontSize: '0.9rem'
                }}>
                  Outstanding performance
                </p>
              </div>
            ))}
          </div>
        </Vibrant3DCard>

        {/* Floating Action Buttons */}
        <FloatingActionButton
          icon="💬"
          variant="professional"
          size="lg"
          position="bottom-right"
          tooltip="Chat Support"
          onClick={() => handleQuickAction('chat')}
        />
        
        <FloatingActionButton
          icon="📊"
          variant="professional"
          size="md"
          position="bottom-left"
          tooltip="Analytics"
          onClick={() => handleQuickAction('analytics')}
        />
      </div>
    </>
  )
}
