
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Clock, AlertTriangle, CheckCircle, X } from "lucide-react";

export function NotificationsCenter() {
  const notifications = [
    {
      id: 1,
      type: "renewal",
      title: "Contract Renewal Due",
      message: "Software License Agreement expires in 15 days",
      contract: "Software License Agreement",
      entity: "Acme Corp Ltd",
      time: "2 hours ago",
      priority: "high",
      status: "unread"
    },
    {
      id: 2,
      type: "task",
      title: "Task Overdue",
      message: "Review contract renewal terms is past due",
      contract: "Master Service Agreement",
      entity: "Global Holdings Inc",
      time: "1 day ago",
      priority: "high",
      status: "unread"
    },
    {
      id: 3,
      type: "alert",
      title: "Document Updated",
      message: "Property Lease terms have been modified",
      contract: "Property Lease",
      entity: "Regional Office LLC",
      time: "3 days ago",
      priority: "medium",
      status: "read"
    },
    {
      id: 4,
      type: "completion",
      title: "Task Completed",
      message: "Legal review has been completed",
      contract: "Vendor Agreement",
      entity: "Tech Subsidiary Co",
      time: "1 week ago",
      priority: "low",
      status: "read"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "renewal":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "task":
        return <Clock className="h-4 w-4 text-red-500" />;
      case "alert":
        return <Bell className="h-4 w-4 text-blue-500" />;
      case "completion":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Notifications Center</h2>
          <p className="text-muted-foreground">Stay updated on contract activities and deadlines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            Settings
          </Button>
        </div>
      </div>

      {/* Notification Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">All Notifications</Button>
            <Button variant="outline" size="sm">Unread Only</Button>
            <Button variant="outline" size="sm">Renewals</Button>
            <Button variant="outline" size="sm">Tasks</Button>
            <Button variant="outline" size="sm">High Priority</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            Contract-related alerts and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
                  notification.status === 'unread' ? 'bg-muted/20 border-primary/20' : 'bg-background'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityBadgeVariant(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {notification.status === 'unread' && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">{notification.contract}</span>
                        <span> • </span>
                        <span>{notification.entity}</span>
                        <span> • </span>
                        <span>{notification.time}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          View Contract
                        </Button>
                        <Button variant="ghost" size="sm">
                          Snooze
                        </Button>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
