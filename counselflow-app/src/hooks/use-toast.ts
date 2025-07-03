import React, { useState, useCallback } from 'react'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

const toastState: ToastState = { toasts: [] }
const listeners: Array<(state: ToastState) => void> = []

function notifyListeners() {
  listeners.forEach(listener => listener(toastState))
}

function addToast(toast: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substr(2, 9)
  const newToast: Toast = { ...toast, id }
  
  toastState.toasts.push(newToast)
  notifyListeners()
  
  // Auto remove after duration
  const duration = toast.duration || 5000
  setTimeout(() => {
    removeToast(id)
  }, duration)
  
  return id
}

function removeToast(id: string) {
  toastState.toasts = toastState.toasts.filter(toast => toast.id !== id)
  notifyListeners()
}

export function useToast() {
  const [, setState] = useState(toastState)
  
  const subscribe = useCallback((listener: (state: ToastState) => void) => {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    return addToast(props)
  }, [])

  const dismiss = useCallback((toastId: string) => {
    removeToast(toastId)
  }, [])

  // Subscribe to changes
  React.useEffect(() => {
    const unsubscribe = subscribe(setState)
    return unsubscribe
  }, [subscribe])

  return {
    toast,
    dismiss,
    toasts: toastState.toasts
  }
}
