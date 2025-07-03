
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, FileText, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { AddLicenseModal } from "./AddLicenseModal";
import { LicenseDetailModal } from "./LicenseDetailModal";

export function LicenseRegistryDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");

  const stats = [
    {
      title: "Total Licenses",
      value: "124",
      change: "+8 this month",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Expiring Soon",
      value: "12",
      change: "Next 90 days",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Overdue",
      value: "3",
      change: "Immediate action",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Compliant",
      value: "109",
      change: "88% compliance",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const licenses = [
    {
      id: 1,
      title: "Financial Services License",
      entity: "TechCorp UK Ltd",
      jurisdiction: "United Kingdom",
      regulator: "FCA",
      type: "Financial Services",
      expiryDate: "2024-12-15",
      status: "Active",
      owner: "Sarah Johnson",
      renewalStatus: "Not Started"
    },
    {
      id: 2,
      title: "Data Protection Registration",
      entity: "TechCorp GmbH",
      jurisdiction: "Germany",
      regulator: "BfDI",
      type: "Data Protection",
      expiryDate: "2024-08-30",
      status: "Expiring",
      owner: "Michael Chen",
      renewalStatus: "In Progress"
    },
    {
      id: 3,
      title: "Broadcasting License",
      entity: "TechCorp Inc",
      jurisdiction: "United States",
      regulator: "FCC",
      type: "Broadcasting",
      expiryDate: "2024-06-01",
      status: "Overdue",
      owner: "Emma Wilson",
      renewalStatus: "Overdue"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>;
      case "Expiring":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Expiring</Badge>;
      case "Overdue":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRenewalStatusBadge = (status: string) => {
    switch (status) {
      case "Not Started":
        return <Badge variant="outline">Not Started</Badge>;
      case "In Progress":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Submitted":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Submitted</Badge>;
      case "Completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case "Overdue":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>License Registry</CardTitle>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New License
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search licenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={entityFilter} onValueChange={setEntityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="uk">TechCorp UK Ltd</SelectItem>
                <SelectItem value="de">TechCorp GmbH</SelectItem>
                <SelectItem value="us">TechCorp Inc</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Licenses Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License Title</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Regulator</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Renewal Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenses.map((license) => (
                <TableRow 
                  key={license.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedLicense(license)}
                >
                  <TableCell className="font-medium">{license.title}</TableCell>
                  <TableCell>{license.entity}</TableCell>
                  <TableCell>{license.jurisdiction}</TableCell>
                  <TableCell>{license.regulator}</TableCell>
                  <TableCell>{license.expiryDate}</TableCell>
                  <TableCell>{getStatusBadge(license.status)}</TableCell>
                  <TableCell>{getRenewalStatusBadge(license.renewalStatus)}</TableCell>
                  <TableCell>{license.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddLicenseModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      <LicenseDetailModal license={selectedLicense} onOpenChange={setSelectedLicense} />
    </div>
  );
}
