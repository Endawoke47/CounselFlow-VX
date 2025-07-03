import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, AlertTriangle, Eye, Edit, Calendar, User, Link } from "lucide-react";
import { AddRiskModal } from "./AddRiskModal";
import { RelationshipsPanel } from "@/components/ui/relationships-panel";
import { RelatedItem } from "@/services/relationshipService";
import { CentralDataService } from "@/services/centralDataService";

const centralRisks = CentralDataService.getRisks();

// Transform central data to match component interface
const mockRisks = centralRisks.map(risk => ({
  id: risk.id.toUpperCase(),
  title: risk.title,
  category: risk.category,
  riskLevel: risk.severity,
  probability: risk.probability === 'High' ? 85 : risk.probability === 'Medium' ? 60 : 35,
  impact: risk.severity,
  riskScore: risk.riskScore / 10,
  owner: CentralDataService.getPersonById(risk.ownerId)?.fullName || 'Unassigned',
  status: risk.status,
  identifiedDate: risk.identifiedDate.toLocaleDateString(),
  reviewDate: risk.reviewDate.toLocaleDateString(),
  description: risk.description,
  mitigationActions: risk.mitigationStatus === 'In Progress' ? 3 : risk.mitigationStatus === 'Planned' ? 1 : 0,
  lastUpdate: risk.reviewDate.toLocaleDateString()
}));

export function RiskRegistry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<any>(null);
  const [showRelationships, setShowRelationships] = useState(false);

  const filteredRisks = mockRisks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || risk.category === selectedCategory;
    const matchesRiskLevel = selectedRiskLevel === "all" || risk.riskLevel === selectedRiskLevel;
    const matchesStatus = selectedStatus === "all" || risk.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesRiskLevel && matchesStatus;
  });

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case "Critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case "High":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge className="bg-red-100 text-red-800">Open</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Mitigated":
        return <Badge className="bg-green-100 text-green-800">Mitigated</Badge>;
      case "Monitoring":
        return <Badge className="bg-yellow-100 text-yellow-800">Monitoring</Badge>;
      case "Closed":
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 8) return "text-red-600 font-bold";
    if (score >= 6) return "text-orange-600 font-semibold";
    if (score >= 4) return "text-yellow-600";
    return "text-green-600";
  };

  // Calculate summary statistics
  const totalRisks = mockRisks.length;
  const criticalRisks = mockRisks.filter(r => r.riskLevel === "Critical").length;
  const openRisks = mockRisks.filter(r => r.status === "Open").length;
  const avgRiskScore = (mockRisks.reduce((sum, r) => sum + r.riskScore, 0) / mockRisks.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Risk Registry</h2>
          <p className="text-muted-foreground">Comprehensive registry of all identified risks and their management</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Total Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRisks}</div>
            <p className="text-xs text-muted-foreground">{openRisks} currently open</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Critical Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalRisks}</div>
            <p className="text-xs text-muted-foreground">Require immediate action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Risk Owners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(mockRisks.map(r => r.owner)).size}
            </div>
            <p className="text-xs text-muted-foreground">Assigned owners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Avg. Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRiskScore}</div>
            <p className="text-xs text-muted-foreground">Portfolio average</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Registry Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Risk Registry
          </CardTitle>
          <CardDescription>Complete list of all identified and managed risks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search risks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Regulatory">Regulatory</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                <SelectItem value="Reputational">Reputational</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Mitigated">Mitigated</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Review Date</TableHead>
                  <TableHead>Mitigation Actions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRisks.map((risk) => (
                  <TableRow key={risk.id}>
                    <TableCell className="font-medium">{risk.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{risk.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {risk.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{risk.category}</Badge>
                    </TableCell>
                    <TableCell>{getRiskLevelBadge(risk.riskLevel)}</TableCell>
                    <TableCell>
                      <span className={getRiskScoreColor(risk.riskScore)}>
                        {risk.riskScore}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(risk.status)}</TableCell>
                    <TableCell>{risk.owner}</TableCell>
                    <TableCell className="text-sm">{risk.reviewDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{risk.mitigationActions} actions</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRisk(risk);
                            setShowRelationships(true);
                          }}
                          title="View Related Items"
                        >
                          <Link className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Relationships Panel */}
      {showRelationships && selectedRisk && (
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
            itemId={selectedRisk.id.toLowerCase().replace('rsk-2024-', 'risk-')}
            itemType="risks"
            itemTitle={selectedRisk.title}
            onItemClick={(item) => console.log('Related item clicked:', item)}
          />
        </div>
      )}

      <AddRiskModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
}
