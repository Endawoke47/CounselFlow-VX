
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Edit, Trash2, Download, Search, Filter } from "lucide-react";

interface StatutoryRegisterDetailProps {
  registerType: "directors" | "members" | "charges";
  onBack: () => void;
}

export function StatutoryRegisterDetail({ registerType, onBack }: StatutoryRegisterDetailProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const getRegisterData = () => {
    switch (registerType) {
      case "directors":
        return {
          title: "Directors Register",
          description: "Manage director appointments and resignations",
          icon: Users,
          data: [
            {
              id: 1,
              name: "John Smith",
              position: "Executive Director",
              appointmentDate: "15 Mar 2020",
              nationality: "British",
              address: "123 Director Street, London",
              status: "Active"
            },
            {
              id: 2,
              name: "Sarah Johnson",
              position: "Non-Executive Director",
              appointmentDate: "20 Jun 2021",
              nationality: "American",
              address: "456 Board Avenue, New York",
              status: "Active"
            },
            {
              id: 3,
              name: "Michael Brown",
              position: "Independent Director",
              appointmentDate: "10 Jan 2022",
              nationality: "Canadian",
              address: "789 Corporate Blvd, Toronto",
              status: "Resigned",
              resignationDate: "30 Sep 2024"
            }
          ]
        };
      case "members":
        return {
          title: "Members Register",
          description: "Manage shareholder records and transfers",
          icon: Users,
          data: [
            {
              id: 1,
              name: "Acme Holdings Ltd",
              shares: "450,000",
              percentage: "60%",
              shareClass: "Ordinary",
              transferDate: "15 Mar 2020",
              status: "Active"
            },
            {
              id: 2,
              name: "Investment Partners LLC",
              shares: "225,000",
              percentage: "30%",
              shareClass: "Ordinary",
              transferDate: "20 Jun 2021",
              status: "Active"
            },
            {
              id: 3,
              name: "Employee Share Scheme",
              shares: "75,000",
              percentage: "10%",
              shareClass: "Ordinary",
              transferDate: "01 Jan 2022",
              status: "Active"
            }
          ]
        };
      case "charges":
        return {
          title: "Charges Register",
          description: "Monitor security interests and charges",
          icon: Users,
          data: [
            {
              id: 1,
              chargeHolder: "First National Bank",
              amount: "$2,500,000",
              chargeType: "Fixed Charge",
              property: "Office Building - 123 Main Street",
              registrationDate: "15 Mar 2020",
              status: "Active"
            },
            {
              id: 2,
              chargeHolder: "Equipment Finance Corp",
              amount: "$500,000",
              chargeType: "Floating Charge",
              property: "Manufacturing Equipment",
              registrationDate: "10 Aug 2021",
              status: "Active"
            },
            {
              id: 3,
              chargeHolder: "Regional Credit Union",
              amount: "$750,000",
              chargeType: "Fixed Charge",
              property: "Vehicle Fleet",
              registrationDate: "05 Feb 2022",
              status: "Satisfied",
              satisfactionDate: "15 Nov 2024"
            }
          ]
        };
      default:
        return { title: "", description: "", icon: Users, data: [] };
    }
  };

  const registerData = getRegisterData();
  const IconComponent = registerData.icon;

  const renderTableHeaders = () => {
    switch (registerType) {
      case "directors":
        return (
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        );
      case "members":
        return (
          <TableRow>
            <TableHead>Member Name</TableHead>
            <TableHead>Shares Held</TableHead>
            <TableHead>Percentage</TableHead>
            <TableHead>Share Class</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        );
      case "charges":
        return (
          <TableRow>
            <TableHead>Charge Holder</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    return registerData.data.map((item: any) => (
      <TableRow key={item.id}>
        {registerType === "directors" && (
          <>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.position}</TableCell>
            <TableCell>{item.appointmentDate}</TableCell>
            <TableCell>{item.nationality}</TableCell>
            <TableCell>
              <Badge variant={item.status === "Active" ? "secondary" : "outline"}>
                {item.status}
              </Badge>
            </TableCell>
          </>
        )}
        {registerType === "members" && (
          <>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.shares}</TableCell>
            <TableCell>{item.percentage}</TableCell>
            <TableCell>{item.shareClass}</TableCell>
            <TableCell>
              <Badge variant="secondary">{item.status}</Badge>
            </TableCell>
          </>
        )}
        {registerType === "charges" && (
          <>
            <TableCell className="font-medium">{item.chargeHolder}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>{item.chargeType}</TableCell>
            <TableCell>{item.property}</TableCell>
            <TableCell>
              <Badge variant={item.status === "Active" ? "secondary" : "outline"}>
                {item.status}
              </Badge>
            </TableCell>
          </>
        )}
        <TableCell>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <IconComponent className="h-6 w-6" />
              {registerData.title}
            </h1>
            <p className="text-muted-foreground">{registerData.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Register Entries</CardTitle>
              <CardDescription>
                {registerData.data.length} entries in this register
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              {renderTableHeaders()}
            </TableHeader>
            <TableBody>
              {renderTableRows()}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
