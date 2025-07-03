
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Mail, MessageSquare, Edit, Trash2 } from "lucide-react";

export function AlertManagement() {
  const alerts = [
    {
      id: 1,
      contract: "Software License Agreement",
      entity: "Acme Corp Ltd",
      alertDate: "2024-11-15",
      timing: "30 days before",
      recipients: ["sarah@company.com", "legal@company.com"],
      channels: ["Email", "In-app"],
      status: "Active"
    },
    {
      id: 2,
      contract: "Master Service Agreement",
      entity: "Global Holdings Inc",
      alertDate: "2024-06-20",
      timing: "30 days before",
      recipients: ["mike@company.com"],
      channels: ["Email", "Slack"],
      status: "Active"
    },
    {
      id: 3,
      contract: "Property Lease",
      entity: "Regional Office LLC",
      alertDate: "2025-02-01",
      timing: "60 days before",
      recipients: ["lisa@company.com", "facilities@company.com"],
      channels: ["Email"],
      status: "Active"
    },
    {
      id: 4,
      contract: "Vendor Agreement",
      entity: "Tech Subsidiary Co",
      alertDate: "2024-08-10",
      timing: "45 days before",
      recipients: ["david@company.com"],
      channels: ["Email", "In-app"],
      status: "Disabled"
    }
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email":
        return <Mail className="h-3 w-3" />;
      case "Slack":
        return <MessageSquare className="h-3 w-3" />;
      case "In-app":
        return <Bell className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Alert Management</h2>
          <p className="text-muted-foreground">Configure and manage contract renewal alerts</p>
        </div>
        <Button>
          Add New Alert
        </Button>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active Alerts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Triggered Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Due This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Disabled</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Configured Alerts</CardTitle>
          <CardDescription>
            Manage alert settings for contract renewals and expirations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Alert Date</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.contract}</TableCell>
                  <TableCell>{alert.entity}</TableCell>
                  <TableCell>{alert.alertDate}</TableCell>
                  <TableCell>{alert.timing}</TableCell>
                  <TableCell>
                    <div className="text-xs">
                      {alert.recipients.slice(0, 2).map((recipient, index) => (
                        <div key={index}>{recipient}</div>
                      ))}
                      {alert.recipients.length > 2 && (
                        <div className="text-muted-foreground">
                          +{alert.recipients.length - 2} more
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {alert.channels.map((channel, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <span className="flex items-center gap-1">
                            {getChannelIcon(channel)}
                            {channel}
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={alert.status === "Active" ? "default" : "secondary"}
                    >
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
