import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  sidebarWidth: string
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: ReactNode
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('counselflow-sidebar-collapsed')
    if (savedState) {
      setIsCollapsed(JSON.parse(savedState))
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('counselflow-sidebar-collapsed', JSON.stringify(newState))
  }

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-72'

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, sidebarWidth }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContext
