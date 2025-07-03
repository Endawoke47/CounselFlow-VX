import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, MoreHorizontal, UserCheck, UserX, Settings, Mail, Phone } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserManagementActions } from "./UserManagementActions";

export function UserDirectory() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      // @ts-expect-error: Supabase client is not typed with DB schema
      const { data, error } = await (supabase as any).from("users").select("*");
      if (error) {
        setError("Failed to load users");
        setUsers([]);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status?.toLowerCase() === statusFilter;
    const matchesRole = roleFilter === "all" || user.role?.toLowerCase().includes(roleFilter);
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleUserAction = (action: string, data: any) => {
    console.log("User action:", action, data);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>
            Comprehensive user management with detailed profiles and access controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="legal">Legal Officer</SelectItem>
                <SelectItem value="counsel">General Counsel</SelectItem>
                <SelectItem value="compliance">Compliance Manager</SelectItem>
                <SelectItem value="external">External Counsel</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading users...</div>
          ) : error ? (
            <div className="text-center text-destructive py-8">{error}</div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-medium">{user.name}</h3>
                            <Badge variant={
                              user.status === "Active" ? "default" :
                              user.status === "Temporary" ? "secondary" : "destructive"
                            }>
                              {user.status}
                            </Badge>
                            <Badge variant="outline">{user.role}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </div>
                            <div>Last login: {user.lastLogin}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                        >
                          {expandedUser === user.id ? "Collapse" : "Expand"}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCheck className="h-4 w-4 mr-2" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {expandedUser === user.id && (
                    <div className="border-t bg-muted/30 p-4 space-y-4">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Profile Details</h4>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">Department:</span> {user.department}</div>
                            <div><span className="font-medium">Location:</span> {user.location}</div>
                            <div><span className="font-medium">Manager:</span> {user.manager}</div>
                            <div><span className="font-medium">Entity Access:</span> {user.entity}</div>
                            {user.accessExpiry && (
                              <div><span className="font-medium">Access Expires:</span> {user.accessExpiry}</div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Module Access</h4>
                          <div className="flex flex-wrap gap-1">
                            {user.modules.map((module, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {module}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Quick Actions</h4>
                          <UserManagementActions
                            userId={user.id}
                            userEmail={user.email}
                            onAction={handleUserAction}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
