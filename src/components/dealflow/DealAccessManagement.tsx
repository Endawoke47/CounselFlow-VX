import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Shield, Clock, Building } from "lucide-react";

export function DealAccessManagement() {
  const [accessUsers, setAccessUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccessUsers() {
      setLoading(true);
      setError(null);
      // @ts-expect-error: Supabase client is not typed with DB schema
      const { data, error } = await (supabase as any).from("deal_access_users").select("*");
      if (error) {
        setError("Failed to load access users");
        setAccessUsers([]);
      } else {
        setAccessUsers(data || []);
      }
      setLoading(false);
    }
    fetchAccessUsers();
  }, []);

  const getTypeColor = (type: string) => {
    const colors = {
      "Internal": "bg-blue-100 text-blue-800",
      "External": "bg-orange-100 text-orange-800",
      "Target": "bg-purple-100 text-purple-800"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getAccessColor = (access: string) => {
    const colors = {
      "Full Access": "bg-green-100 text-green-800",
      "Limited": "bg-yellow-100 text-yellow-800",
      "Read-Only": "bg-blue-100 text-blue-800",
      "Upload Only": "bg-purple-100 text-purple-800"
    };
    return colors[access as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const accessLevels = [
    { level: "Full Access", count: 3, description: "View, edit, download all documents" },
    { level: "Limited", count: 2, description: "View and download specific sections" },
    { level: "Read-Only", count: 4, description: "View only, no downloads" },
    { level: "Upload Only", count: 1, description: "Upload documents, limited viewing" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">3 internal, 7 external</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Currently accessing deal</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Access</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Expiring within 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Access Level Distribution</CardTitle>
          <CardDescription>
            Current access permissions across all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accessLevels.map((level) => (
              <div key={level.level} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{level.level}</h4>
                  <Badge variant="outline">{level.count} users</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{level.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Access Management</CardTitle>
          <CardDescription>
            Manage individual user permissions and access controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading access users...</div>
          ) : error ? (
            <div className="text-center text-destructive py-8">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>Sections</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(user.type)}>
                        {user.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge className={getAccessColor(user.access)}>
                        {user.access}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(user.sections || []).map((section: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={user.expiry !== "N/A" ? "text-orange-600" : ""}>
                        {user.expiry}
                      </span>
                    </TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit Access
                        </Button>
                        <Button variant="outline" size="sm">
                          View Activity
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Add User
        </Button>
        <Button variant="outline">
          <Building className="h-4 w-4 mr-2" />
          Bulk Invite
        </Button>
        <Button variant="outline">
          Export Access Report
        </Button>
      </div>
    </div>
  );
}
