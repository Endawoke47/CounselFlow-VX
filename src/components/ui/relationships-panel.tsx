import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Link, 
  ExternalLink, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users,
  Building,
  Scale,
  Shield,
  BookOpen,
  Briefcase
} from "lucide-react";
import { RelationshipService, RelatedItem } from "@/services/relationshipService";

interface RelationshipsPanelProps {
  itemId: string;
  itemType: string;
  itemTitle: string;
  onItemClick?: (item: RelatedItem) => void;
}

export function RelationshipsPanel({ itemId, itemType, itemTitle, onItemClick }: RelationshipsPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const relatedItems = RelationshipService.getRelatedItems(itemId, itemType);
  const relationshipSummary = RelationshipService.getRelationshipSummary(itemId, itemType);

  const getModuleIcon = (module: string) => {
    switch (module.toLowerCase()) {
      case 'contract management': return <FileText className="h-4 w-4" />;
      case 'matter management': return <Briefcase className="h-4 w-4" />;
      case 'task management': return <CheckCircle className="h-4 w-4" />;
      case 'risk management': return <AlertTriangle className="h-4 w-4" />;
      case 'dispute resolution': return <Scale className="h-4 w-4" />;
      case 'data protection': return <Shield className="h-4 w-4" />;
      case 'knowledge management': return <BookOpen className="h-4 w-4" />;
      case 'outsourced matters': return <Users className="h-4 w-4" />;
      default: return <Link className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-green-100 text-green-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'open': 'bg-red-100 text-red-800',
      'escalated': 'bg-red-100 text-red-800',
      'draft': 'bg-gray-100 text-gray-800',
      'compliant': 'bg-green-100 text-green-800',
      'not_started': 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getRelationshipTypeBadge = (type: string) => {
    const typeColors: Record<string, string> = {
      'primary': 'bg-purple-100 text-purple-800',
      'related': 'bg-blue-100 text-blue-800',
      'dependent': 'bg-orange-100 text-orange-800',
      'referenced': 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge variant="outline" className={typeColors[type] || 'bg-gray-100 text-gray-800'}>
        {type}
      </Badge>
    );
  };

  const filteredItems = relatedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.module.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    return matchesSearch && item.type === selectedTab;
  });

  const uniqueTypes = [...new Set(relatedItems.map(item => item.type))];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Related Items
            </CardTitle>
            <CardDescription>
              Items connected to "{itemTitle}" ({relationshipSummary.total} total)
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {relationshipSummary.byType.contract || 0}
            </div>
            <div className="text-sm text-muted-foreground">Contracts</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {relationshipSummary.byType.matter || 0}
            </div>
            <div className="text-sm text-muted-foreground">Matters</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {relationshipSummary.byType.task || 0}
            </div>
            <div className="text-sm text-muted-foreground">Tasks</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {relationshipSummary.byType.risk || 0}
            </div>
            <div className="text-sm text-muted-foreground">Risks</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search related items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({relatedItems.length})</TabsTrigger>
            {uniqueTypes.slice(0, 4).map(type => (
              <TabsTrigger key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}s ({relationshipSummary.byType[type] || 0})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedTab} className="mt-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Link className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No related items found</p>
                {searchTerm && (
                  <p className="text-sm">Try adjusting your search terms</p>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow 
                      key={item.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => onItemClick?.(item)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getModuleIcon(item.module)}
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {item.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getModuleIcon(item.module)}
                          <span className="text-sm">{item.module}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell>
                        {getRelationshipTypeBadge(item.relationshipType)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>

        {/* Relationship Type Summary */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-3">Relationship Types</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(relationshipSummary.byRelationshipType).map(([type, count]) => (
              <div key={type} className="flex items-center gap-2 text-sm">
                {getRelationshipTypeBadge(type)}
                <span className="text-muted-foreground">({count})</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}