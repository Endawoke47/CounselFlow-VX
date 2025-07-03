import { useEffect, useState, useCallback } from 'react';
import { useWebSocket, WebSocketMessage } from '@/hooks/useWebSocket';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  priority: 'low' | 'medium' | 'high';
  module?: string;
}

export interface RealTimeNotificationState {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  connectionStatus: string;
}

// Helper function to get authentication token
const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const useRealTimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // WebSocket connection URL with authentication token
  const token = getAuthToken();
  const wsUrl = token 
    ? `ws://localhost:8000/api/v1/ws/ws/${token}`
    : '';

  const handleWebSocketMessage = useCallback((message: WebSocketMessage) => {
    console.log('Received WebSocket message:', message);

    const createNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
      const newNotification: Notification = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        read: false,
        ...notificationData
      };

      setNotifications(prev => {
        const updated = [newNotification, ...prev];
        // Keep only last 100 notifications
        return updated.slice(0, 100);
      });

      setUnreadCount(prev => prev + 1);
    };

    switch (message.type) {
      case 'task_update':
        createNotification({
          type: 'info',
          title: 'Task Updated',
          message: `Task "${message.data.title}" status changed to ${message.data.status}`,
          priority: message.data.priority === 'high' ? 'high' : 'medium',
          module: 'tasks',
          actionUrl: `/tasks/${message.data.task_id}`
        });
        break;

      case 'document_update':
        createNotification({
          type: 'info',
          title: 'Document Updated',
          message: `Document "${message.data.title}" was modified by ${message.data.last_modified_by}`,
          priority: 'medium',
          module: 'documents',
          actionUrl: `/documents/${message.data.document_id}`
        });
        break;

      case 'risk_alert':
        createNotification({
          type: message.data.severity === 'high' ? 'error' : 'warning',
          title: 'Risk Alert',
          message: `${message.data.title}: ${message.data.description}`,
          priority: 'high',
          module: 'risks',
          actionUrl: `/risks/${message.data.risk_id}`,
          actionLabel: 'Review Risk'
        });
        break;

      case 'compliance_alert':
        createNotification({
          type: 'warning',
          title: 'Compliance Alert',
          message: `${message.data.regulation} compliance issue in ${message.data.jurisdiction}`,
          priority: 'high',
          module: 'compliance',
          actionUrl: '/compliance',
          actionLabel: 'View Details'
        });
        break;

      case 'contract_update':
        createNotification({
          type: 'info',
          title: 'Contract Updated',
          message: `Contract was updated and requires your attention`,
          priority: 'medium',
          module: 'contracts',
          actionUrl: `/contracts/${message.data.contract_id}`
        });
        break;

      case 'matter_update':
        createNotification({
          type: 'info',
          title: 'Matter Updated',
          message: `Legal matter has been updated`,
          priority: 'medium',
          module: 'matters',
          actionUrl: `/matters/${message.data.matter_id}`
        });
        break;

      case 'ai_progress':
        // Handle AI task progress updates
        if (message.data.status === 'completed') {
          createNotification({
            type: 'success',
            title: 'AI Task Completed',
            message: `Your AI analysis is ready`,
            priority: 'medium',
            module: 'ai',
            actionUrl: `/ai/results/${message.data.task_id}`,
            actionLabel: 'View Results'
          });
        }
        break;

      case 'user_activity':
        // Handle user activity notifications (optional, for collaboration)
        break;

      case 'system_status':
        console.log('System status update:', message.data);
        break;

      case 'heartbeat':
        // Handle heartbeat responses
        break;

      default:
        console.log('Unknown message type:', message.type);
    }
  }, []);

  const { connect, disconnect, sendMessage, isConnected, connectionStatus } = useWebSocket(
    wsUrl,
    {
      onMessage: handleWebSocketMessage,
      onConnect: () => {
        console.log('WebSocket connected for notifications');
        // Request current status
        sendMessage({ type: 'request_status', data: {} });
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected');
      },
      onError: (error) => {
        console.error('WebSocket error:', error);
      },
      autoReconnect: true,
      reconnectInterval: 5000,
      maxReconnectAttempts: 10
    }
  );

  const addNotification = useCallback((notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...notificationData
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      // Keep only last 100 notifications
      return updated.slice(0, 100);
    });

    setUnreadCount(prev => prev + 1);
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    );

    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === notificationId);
      const filtered = prev.filter(notif => notif.id !== notificationId);
      
      if (notification && !notification.read) {
        setUnreadCount(prevCount => Math.max(0, prevCount - 1));
      }
      
      return filtered;
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  const subscribeToRoom = useCallback((roomId: string) => {
    if (isConnected) {
      sendMessage({
        type: 'subscribe_room',
        data: { room_id: roomId }
      });
    }
  }, [isConnected, sendMessage]);

  const unsubscribeFromRoom = useCallback((roomId: string) => {
    if (isConnected) {
      sendMessage({
        type: 'unsubscribe_room',
        data: { room_id: roomId }
      });
    }
  }, [isConnected, sendMessage]);

  // Connect when token is available
  useEffect(() => {
    if (token && wsUrl) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [token, wsUrl, connect, disconnect]);

  // Calculate unread count whenever notifications change
  useEffect(() => {
    const unread = notifications.filter(notif => !notif.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    isConnected,
    connectionStatus,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    subscribeToRoom,
    unsubscribeFromRoom,
    // WebSocket methods for direct use
    sendMessage,
    connect,
    disconnect
  };
};
