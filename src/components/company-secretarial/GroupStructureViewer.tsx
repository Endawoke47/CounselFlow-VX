
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, GitBranch, Download, Edit, Plus } from "lucide-react";

export function GroupStructureViewer() {
  const groupStructure = {
    parent: {
      name: "Global Holdings Corp",
      jurisdiction: "Delaware, USA",
      ownership: "100%",
      entityType: "Corporation"
    },
    subsidiaries: [
      {
        name: "Acme Corporation Ltd",
        jurisdiction: "United Kingdom",
        ownership: "100%",
        entityType: "Private Limited",
        children: [
          {
            name: "Acme Europe BV",
            jurisdiction: "Netherlands",
            ownership: "75%",
            entityType: "BV"
          },
          {
            name: "Acme Asia Pte Ltd",
            jurisdiction: "Singapore",
            ownership: "100%",
            entityType: "Private Limited"
          }
        ]
      },
      {
        name: "Global Tech Solutions Pte Ltd",
        jurisdiction: "Singapore",
        ownership: "80%",
        entityType: "Private Limited",
        children: [
          {
            name: "Tech Innovation Ltd",
            jurisdiction: "Hong Kong",
            ownership: "100%",
            entityType: "Private Limited"
          }
        ]
      },
      {
        name: "Innovation Holdings Inc",
        jurisdiction: "Delaware, USA",
        ownership: "60%",
        entityType: "Corporation",
        status: "Dormant"
      }
    ]
  };

  const EntityCard = ({ entity, level = 0 }: { entity: any, level?: number }) => (
    <div className={`${level > 0 ? 'ml-8 mt-4' : ''}`}>
      <Card className="relative">
        {level > 0 && (
          <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-border"></div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-lg">{entity.name}</CardTitle>
                <CardDescription>{entity.jurisdiction}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{entity.ownership}</Badge>
              <Badge variant="secondary">{entity.entityType}</Badge>
              {entity.status && <Badge variant="outline">{entity.status}</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {entity.children ? `${entity.children.length} subsidiaries` : 'No subsidiaries'}
              </span>
              <span className="flex items-center gap-1">
                <GitBranch className="h-3 w-3" />
                Level {level + 1}
              </span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {entity.children && entity.children.map((child: any, index: number) => (
        <EntityCard key={index} entity={child} level={level + 1} />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GitBranch className="h-6 w-6" />
            Group Structure
          </h1>
          <p className="text-muted-foreground">
            Interactive organizational chart and ownership structure
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Chart
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Entity
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Corporate Structure Overview</CardTitle>
          <CardDescription>
            Visual representation of the group's ownership structure and subsidiaries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Parent Entity */}
            <EntityCard entity={groupStructure.parent} level={0} />
            
            {/* Subsidiaries */}
            {groupStructure.subsidiaries.map((subsidiary, index) => (
              <EntityCard key={index} entity={subsidiary} level={1} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Entities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Across all jurisdictions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Jurisdictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-sm text-muted-foreground">Active jurisdictions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ownership Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Maximum depth</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
