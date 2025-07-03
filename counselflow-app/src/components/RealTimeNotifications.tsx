'use client';

import React, { useState } from 'react';
import { Bell, Check, CheckCheck, X, ExternalLink, Clock, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { useRealTimeNotifications, Notification } from '@/hooks/useRealTimeNotifications';
import { formatDistanceToNow } from 'date-fns';

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'error':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case 'info':
    default:
      return <Info className="w-4 h-4 text-blue-500" />;
  }
};

const NotificationItem = ({ 
  notification, 
  onMarkAsRead, 
  onRemove 
}: { 
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}) => {
  const getPriorityStyles = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'medium':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'low':
      default:
        return 'border-l-4 border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className={`p-4 mb-2 rounded-lg transition-all duration-200 ${
      notification.read ? 'bg-gray-50 opacity-75' : 'bg-white shadow-sm'
    } ${getPriorityStyles(notification.priority)}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <NotificationIcon type={notification.type} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className={`text-sm font-medium ${
                notification.read ? 'text-gray-600' : 'text-gray-900'
              }`}>
                {notification.title}
              </h4>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
            <p className={`text-sm mt-1 ${
              notification.read ? 'text-gray-500' : 'text-gray-700'
            }`}>
              {notification.message}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
              </span>
              {notification.module && (
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  {notification.module}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {notification.actionUrl && (
            <button
              onClick={() => window.open(notification.actionUrl, '_self')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              title={notification.actionLabel || 'View'}
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-gray-500 hover:text-green-600 transition-colors"
              title="Mark as read"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onRemove(notification.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Remove notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const RealTimeNotifications = () => {
  const {
    notifications,
    unreadCount,
    isConnected,
    connectionStatus,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  } = useRealTimeNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high' | 'medium' | 'low'>('all');

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'high':
      case 'medium':
      case 'low':
        return notification.priority === filter;
      case 'all':
      default:
        return true;
    }
  });

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-500';
      case 'connecting':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      case 'disconnected':
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors"
        title="Notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        {/* Connection status indicator */}
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${getConnectionStatusColor()} ${
          isConnected ? 'bg-current' : ''
        }`}></div>
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Panel */}
          <div className="absolute right-0 mt-2 w-96 max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({unreadCount} unread)
                    </span>
                  )}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getConnectionStatusColor()} ${
                    isConnected ? 'bg-current' : 'border border-current'
                  }`}></div>
                  <span className="text-xs text-gray-500 capitalize">
                    {connectionStatus}
                  </span>
                </div>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex space-x-1 mt-3">
                {['all', 'unread', 'high', 'medium', 'low'].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption as typeof filter)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      filter === filterOption
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              {notifications.length > 0 && (
                <div className="flex space-x-2 mt-3">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <CheckCheck className="w-3 h-3 mr-1" />
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onRemove={removeNotification}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    {filter === 'all' 
                      ? 'No notifications yet'
                      : `No ${filter} notifications`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RealTimeNotifications;
