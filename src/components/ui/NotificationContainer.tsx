import React from "react";
import { X, Check, AlertCircle } from "lucide-react";

interface Notification {
  id: number | string;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface NotificationContainerProps {
  notifications: Notification[];
  onRemove: (id: number | string) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onRemove }) => (
  <div className="fixed top-4 right-4 z-50 space-y-2">
    {notifications.slice(0, 3).map((notification) => (
      <div
        key={notification.id}
        className={`max-w-sm w-full transition-all duration-300 transform ${notification.id ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <div className={`border rounded-lg p-4 shadow-xl glass backdrop-blur-md bg-glass/80 transition-all duration-300 ${
          notification.type === 'success' ? 'border-green-200' :
          notification.type === 'error' ? 'border-red-200' :
          notification.type === 'warning' ? 'border-yellow-200' :
          'border-blue-200'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              notification.type === 'success' ? 'text-green-600' :
              notification.type === 'error' ? 'text-red-600' :
              notification.type === 'warning' ? 'text-yellow-600' :
              'text-blue-600'
            }`}>
              {notification.type === 'success' ? <Check size={20} /> :
                notification.type === 'error' ? <X size={20} /> :
                notification.type === 'warning' ? <AlertCircle size={20} /> :
                <AlertCircle size={20} />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-medium ${
                notification.type === 'success' ? 'text-green-800' :
                notification.type === 'error' ? 'text-red-800' :
                notification.type === 'warning' ? 'text-yellow-800' :
                'text-blue-800'
              }`}>
                {notification.title}
              </h4>
              {notification.message && (
                <p className={`text-sm mt-1 ${
                  notification.type === 'success' ? 'text-green-700' :
                  notification.type === 'error' ? 'text-red-700' :
                  notification.type === 'warning' ? 'text-yellow-700' :
                  'text-blue-700'
                }`}>
                  {notification.message}
                </p>
              )}
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-white/50 transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);
