import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, Calendar, Shield, AlertTriangle } from "lucide-react";

export function ExternalUserPanel() {
  const [externalUsers, setExternalUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExternalUsers() {
      setLoading(true);
      setError(null);
      // @ts-expect-error: Supabase client is not typed with DB schema
      const { data, error } = await (supabase as any).from("external_users").select("*");
      if (error) {
        setError("Failed to load external users");
        setExternalUsers([]);
      } else {
        setExternalUsers(data || []);
      }
      setLoading(false);
    }
    fetchExternalUsers();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            External User Access Control
          </CardTitle>
          <CardDescription>
            Manage access for external counsel, consultants, and auditors
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading external users...</div>
          ) : error ? (
            <div className="text-center text-destructive py-8">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Firm/Organization</TableHead>
                  <TableHead>Access Type</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead>Access Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>NDA Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {externalUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.firm}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.accessType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(user.resources || []).map((resource: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{user.startDate} to {user.expiryDate}</div>
                        {user.expiryDate && new Date(user.expiryDate) < new Date() && (
                          <div className="text-destructive flex items-center gap-1 mt-1">
                            <AlertTriangle className="h-3 w-3" />
                            Expired
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        user.status === "Active" ? "default" : "destructive"
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        user.nda === "Signed" ? "default" : "secondary"
                      }>
                        <Shield className="h-3 w-3 mr-1" />
                        {user.nda}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Extend
                        </Button>
                        <Button variant="outline" size="sm">
                          Revoke
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
    </div>
  );
}
