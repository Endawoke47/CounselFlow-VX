
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

const mockAccessRequests = [
  {
    id: "1",
    user: "John Smith",
    email: "john.smith@company.com",
    requestType: "Module Access",
    resource: "IP Management Module",
    reason: "New role requires IP portfolio management",
    status: "Pending",
    requestDate: "2024-01-14",
    approver: "Sarah Johnson"
  },
  {
    id: "2",
    user: "Lisa Chen",
    email: "lisa.chen@partner-firm.com",
    requestType: "External Access",
    resource: "Dispute #2024-001",
    reason: "External counsel assignment",
    status: "Approved",
    requestDate: "2024-01-13",
    approver: "Michael Chen"
  },
  {
    id: "3",
    user: "Robert Davis",
    email: "robert.davis@company.com",
    requestType: "Entity Access",
    resource: "European Subsidiaries",
    reason: "Regional compliance oversight",
    status: "Rejected",
    requestDate: "2024-01-12",
    approver: "Emily Rodriguez"
  }
];

export function AccessRequestWorkflow() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Access Request Workflow</CardTitle>
          <CardDescription>
            Review and approve access requests from users across the organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Request Type</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAccessRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.user}</div>
                      <div className="text-sm text-muted-foreground">{request.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{request.requestType}</TableCell>
                  <TableCell>{request.resource}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={request.reason}>
                      {request.reason}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      request.status === "Approved" ? "default" :
                      request.status === "Pending" ? "secondary" : "destructive"
                    }>
                      {request.status === "Pending" && <Clock className="h-3 w-3 mr-1" />}
                      {request.status === "Approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {request.status === "Rejected" && <XCircle className="h-3 w-3 mr-1" />}
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{request.approver}</TableCell>
                  <TableCell>
                    {request.status === "Pending" ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
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
