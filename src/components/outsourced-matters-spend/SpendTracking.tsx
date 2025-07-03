
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter, AlertCircle, CheckCircle, Clock } from "lucide-react";

export function SpendTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const budgets = [
    { category: "Litigation", allocated: 850000, spent: 634000, remaining: 216000, utilization: 75 },
    { category: "M&A", allocated: 520000, spent: 423000, remaining: 97000, utilization: 81 },
    { category: "Regulatory", allocated: 380000, spent: 267000, remaining: 113000, utilization: 70 },
    { category: "IP", allocated: 290000, spent: 198000, remaining: 92000, utilization: 68 },
    { category: "Employment", allocated: 160000, spent: 124000, remaining: 36000, utilization: 78 }
  ];

  const invoices = [
    {
      id: "INV-2024-001",
      vendor: "Davis Polk & Wardwell",
      matter: "M&A - TechCorp Acquisition",
      amount: 45000,
      date: "2024-03-15",
      dueDate: "2024-04-15",
      status: "Approved",
      category: "M&A"
    },
    {
      id: "INV-2024-002",
      vendor: "Clifford Chance",
      matter: "Banking Regulatory Review",
      amount: 28500,
      date: "2024-03-10",
      dueDate: "2024-04-10",
      status: "Pending",
      category: "Regulatory"
    },
    {
      id: "INV-2024-003",
      vendor: "Baker McKenzie",
      matter: "Employment Policy Update",
      amount: 15600,
      date: "2024-03-08",
      dueDate: "2024-04-08",
      status: "Overdue",
      category: "Employment"
    },
    {
      id: "INV-2024-004",
      vendor: "Local Boutique Firm",
      matter: "IP Trademark Filing",
      amount: 8900,
      date: "2024-03-05",
      dueDate: "2024-04-05",
      status: "Disputed",
      category: "IP"
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.matter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "overdue":
      case "disputed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Spend Tracking & Budget Controls</h2>
          <p className="text-muted-foreground">Monitor budgets and manage invoice processing</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Invoice
        </Button>
      </div>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs. Actual Spend</CardTitle>
          <CardDescription>Current year budget utilization by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgets.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{budget.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${(budget.spent / 1000).toFixed(0)}K spent of ${(budget.allocated / 1000).toFixed(0)}K allocated
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{budget.utilization}%</div>
                    <div className="text-sm text-muted-foreground">
                      ${(budget.remaining / 1000).toFixed(0)}K remaining
                    </div>
                  </div>
                </div>
                <Progress value={budget.utilization} className="h-3" />
                {budget.utilization > 80 && (
                  <div className="flex items-center gap-1 text-sm text-orange-600">
                    <AlertCircle className="h-3 w-3" />
                    <span>Budget threshold exceeded</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Invoice Management
          </CardTitle>
          <CardDescription>Track and approve external legal invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Matter</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.vendor}</TableCell>
                  <TableCell>{invoice.matter}</TableCell>
                  <TableCell className="font-semibold">
                    ${invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.status)}
                      <Badge 
                        variant={
                          invoice.status === "Approved" ? "default" :
                          invoice.status === "Pending" ? "secondary" : "destructive"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                      {invoice.status === "Pending" && (
                        <Button size="sm">
                          Approve
                        </Button>
                      )}
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
