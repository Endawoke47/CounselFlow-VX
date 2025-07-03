
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, MessageSquare, User, Calendar } from "lucide-react";

const mockPendingRequests = [
  {
    id: "req-001",
    user: {
      name: "Alex Thompson",
      email: "alex.thompson@company.com",
      department: "Legal"
    },
    requestType: "Role Change",
    currentRole: "Viewer",
    requestedRole: "Legal Officer",
    resource: "Contract Management Module",
    business_justification: "Promoted to Legal Associate position, requires contract drafting and review capabilities",
    urgency: "Medium",
    requestDate: "2024-01-15",
    approver: "Sarah Johnson",
    manager_approval: "Approved",
    it_security_review: "Pending"
  },
  {
    id: "req-002",
    user: {
      name: "Maria Santos",
      email: "maria.santos@external-firm.com",
      department: "External"
    },
    requestType: "Temporary Access",
    currentRole: "None",
    requestedRole: "External Counsel",
    resource: "Dispute Case #2024-005",
    business_justification: "Lead counsel for ongoing commercial dispute requiring access to case files and documentation",
    urgency: "High",
    requestDate: "2024-01-14",
    approver: "Michael Chen",
    manager_approval: "Approved",
    it_security_review: "Approved",
    nda_status: "Signed",
    access_duration: "90 days"
  },
  {
    id: "req-003",
    user: {
      name: "James Wilson",
      email: "james.wilson@company.com",
      department: "Compliance"
    },
    requestType: "Module Access",
    currentRole: "Compliance Manager",
    requestedRole: "Compliance Manager",
    resource: "IP Management Module",
    business_justification: "New responsibility for IP compliance review requires access to patent and trademark data",
    urgency: "Low",
    requestDate: "2024-01-13",
    approver: "Emily Rodriguez",
    manager_approval: "Approved",
    it_security_review: "Approved"
  }
];

export function AccessRequestApproval() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null);
  const [approvalComments, setApprovalComments] = useState("");

  const handleApprovalAction = (request: any, action: "approve" | "reject") => {
    setSelectedRequest(request);
    setApprovalAction(action);
    setShowApprovalDialog(true);
  };

  const submitApproval = () => {
    console.log("Submitting approval:", {
      requestId: selectedRequest.id,
      action: approvalAction,
      comments: approvalComments
    });
    setShowApprovalDialog(false);
    setSelectedRequest(null);
    setApprovalAction(null);
    setApprovalComments("");
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "default";
      case "Pending": return "secondary";
      case "Rejected": return "destructive";
      default: return "outline";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Access Request Approval Workflow
          </CardTitle>
          <CardDescription>
            Review and approve pending access requests with detailed approval workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requestor</TableHead>
                <TableHead>Request Details</TableHead>
                <TableHead>Business Justification</TableHead>
                <TableHead>Approval Status</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPendingRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{request.user.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{request.user.email}</div>
                      <Badge variant="outline" className="text-xs">{request.user.department}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{request.requestType}</Badge>
                      </div>
                      <div className="text-sm">
                        <div><strong>From:</strong> {request.currentRole}</div>
                        <div><strong>To:</strong> {request.requestedRole}</div>
                        <div><strong>Resource:</strong> {request.resource}</div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {request.requestDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm">{request.business_justification}</div>
                    {request.access_duration && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        Duration: {request.access_duration}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Manager:</span>
                        <Badge variant={getStatusColor(request.manager_approval)}>
                          {request.manager_approval}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">IT Security:</span>
                        <Badge variant={getStatusColor(request.it_security_review)}>
                          {request.it_security_review}
                        </Badge>
                      </div>
                      {request.nda_status && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">NDA:</span>
                          <Badge variant="default">{request.nda_status}</Badge>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getUrgencyColor(request.urgency)}>
                      {request.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApprovalAction(request, "approve")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleApprovalAction(request, "reject")}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {approvalAction === "approve" ? "Approve" : "Reject"} Access Request
            </DialogTitle>
            <DialogDescription>
              Review the access request for {selectedRequest?.user.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Request Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Requestor:</span> {selectedRequest.user.name}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {selectedRequest.requestType}
                  </div>
                  <div>
                    <span className="font-medium">Current Role:</span> {selectedRequest.currentRole}
                  </div>
                  <div>
                    <span className="font-medium">Requested Role:</span> {selectedRequest.requestedRole}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Resource:</span> {selectedRequest.resource}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Justification:</span> {selectedRequest.business_justification}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">
                  {approvalAction === "approve" ? "Approval" : "Rejection"} Comments
                </Label>
                <Textarea
                  id="comments"
                  placeholder={`Provide ${approvalAction === "approve" ? "approval notes" : "reason for rejection"}...`}
                  value={approvalComments}
                  onChange={(e) => setApprovalComments(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={submitApproval}
                  variant={approvalAction === "approve" ? "default" : "destructive"}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {approvalAction === "approve" ? "Approve Request" : "Reject Request"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
