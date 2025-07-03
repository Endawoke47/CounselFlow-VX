
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, Building, MapPin } from "lucide-react";

const mockEntityAssignments = [
  {
    id: "1",
    user: "Sarah Johnson",
    role: "Legal Officer",
    entities: ["Company Inc.", "Subsidiary A"],
    regions: ["North America"],
    restrictions: "Contract approval limit: $100K"
  },
  {
    id: "2",
    user: "Michael Chen",
    role: "General Counsel",
    entities: ["All Entities"],
    regions: ["Global"],
    restrictions: "No restrictions"
  },
  {
    id: "3",
    user: "Emily Rodriguez",
    role: "Compliance Manager",
    entities: ["Company Inc.", "European Holdings"],
    regions: ["North America", "Europe"],
    restrictions: "Compliance matters only"
  },
  {
    id: "4",
    user: "David Kim",
    role: "External Counsel",
    entities: ["Limited - Matter specific"],
    regions: ["Asia Pacific"],
    restrictions: "Dispute #2024-001 only, expires 2024-03-01"
  }
];

export function EntityAssignment() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Entity & Geography Access
          </CardTitle>
          <CardDescription>
            Manage user access to specific entities, regions, and business units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Entity Access</TableHead>
                <TableHead>Regional Scope</TableHead>
                <TableHead>Access Restrictions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEntityAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div className="font-medium">{assignment.user}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{assignment.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {assignment.entities.map((entity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Building className="h-3 w-3 mr-1" />
                          {entity}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {assignment.regions.map((region, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm">{assignment.restrictions}</div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit Access
                    </Button>
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
