import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, AlertTriangle, Clock, User, Link } from "lucide-react";
import { RelationshipsPanel } from "@/components/ui/relationships-panel";
import { useMatters } from "../../hooks/useMatters";

export function MattersList() {
  const { matters, loading, error } = useMatters();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMatter, setSelectedMatter] = useState<any>(null);
  const [showRelationships, setShowRelationships] = useState(false);

  const getStatusBadge = (status: string) => {
    const colors = {
      "In Progress": "bg-blue-100 text-blue-800",
      "Pending Review": "bg-yellow-100 text-yellow-800",
      "Complete": "bg-green-100 text-green-800",
      "On Hold": "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      "High": "bg-red-100 text-red-800",
      "Medium": "bg-orange-100 text-orange-800", 
      "Low": "bg-green-100 text-green-800"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getSLAIcon = (slaStatus: string) => {
    if (slaStatus === "At Risk") return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (slaStatus === "On Track") return <Clock className="h-4 w-4 text-green-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Clock className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="glass tab-fade-in">
        <CardContent className="p-6 text-center text-red-600">
          Error loading matters: {error}
        </CardContent>
      </Card>
    );
  }

  const filteredMatters = matters.filter((matter: any) =>
    matter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Card className="glass tab-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              All Matters
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search matters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
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
              <TableRow>
                <TableHead>Matter ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Business Unit</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatters.map((matter: any) => (
                <TableRow 
                  key={matter.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedMatter(matter)}
                >
                  <TableCell className="font-medium">{matter.matterNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{matter.title}</div>
                      <div className="text-sm text-muted-foreground">{matter.type}</div>
                    </div>
                  </TableCell>
                  <TableCell>{matter.businessUnit}</TableCell>
                  <TableCell>{matter.owner}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(matter.status)}>
                      {matter.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityBadge(matter.priority)}>
                      {matter.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getSLAIcon(matter.slaStatus)}
                      <span className="text-sm">{matter.slaStatus}</span>
                    </div>
                  </TableCell>
                  <TableCell>{matter.dueDate ? new Date(matter.dueDate).toLocaleDateString() : ''}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMatter(matter);
                        setShowRelationships(true);
                      }}
                      title="View Related Items"
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Relationships Panel */}
      {showRelationships && selectedMatter && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Related Items</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowRelationships(false)}
            >
              Close
            </Button>
          </div>
          <RelationshipsPanel
            itemId={selectedMatter.id}
            itemType="matters"
            itemTitle={selectedMatter.title}
          />
        </div>
      )}
    </div>
  );
}
