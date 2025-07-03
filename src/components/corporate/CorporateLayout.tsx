import React from 'react'
import { CorporateNavigation } from './CorporateNavigation'
import SmartTopNav from './SmartTopNav'
import { useSidebar } from '@/contexts/SidebarContext'
import { cn } from '@/lib/utils'

interface CorporateLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

export const CorporateLayout: React.FC<CorporateLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  actions 
}) => {
  const { isCollapsed } = useSidebar()
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <CorporateNavigation />
      
      {/* Main Content Area */}
      <div className={cn(
        'transition-all duration-300 ease-in-out min-h-screen',
        isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      )}>
        {/* Top Navigation */}
        <SmartTopNav />
        
        {/* Page Header */}
        {(title || subtitle || actions) && (
          <div className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4 lg:py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="min-w-0">
                {title && (
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 truncate">{title}</h1>
                )}
                {subtitle && (
                  <p className="mt-1 lg:mt-2 text-base lg:text-lg text-slate-600">{subtitle}</p>
                )}
              </div>
              {actions && (
                <div className="flex items-center space-x-3 flex-shrink-0">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <main className="px-4 lg:px-6 py-6 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default CorporateLayout
