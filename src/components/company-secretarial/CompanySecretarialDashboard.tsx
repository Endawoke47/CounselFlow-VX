import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  FileText, 
  Calendar, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle,
  BookOpen
} from "lucide-react";
import { EntityDetailModal } from "./EntityDetailModal";
import { AddEntityModal } from "./AddEntityModal";
import { StatutoryRegisterDetail } from "./StatutoryRegisterDetail";
import { MeetingScheduler } from "./MeetingScheduler";
import { GroupStructureViewer } from "./GroupStructureViewer";
import { AIResolutionDrafter } from "./AIResolutionDrafter";
import { MeetingCalendar } from "./MeetingCalendar";
import { BoardPackManager } from "./BoardPackManager";
import { useEntities } from '@/hooks/useEntities';
import type { Database } from '@/types/database';

export function CompanySecretarialDashboard() {
  const { entities, loading, error } = useEntities();
  const [selectedEntity, setSelectedEntity] = useState<Database['public']['Tables']['entities']['Row'] | null>(null);
  const [isEntityModalOpen, setIsEntityModalOpen] = useState(false);
  const [isAddEntityModalOpen, setIsAddEntityModalOpen] = useState(false);
  const [isMeetingSchedulerOpen, setIsMeetingSchedulerOpen] = useState(false);
  const [selectedRegister, setSelectedRegister] = useState<string | null>(null);
  const [showGroupStructure, setShowGroupStructure] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'resolutions' | 'calendar' | 'boardpacks'>('dashboard');

  const handleEntityClick = (entity: Database['public']['Tables']['entities']['Row']) => {
    setSelectedEntity(entity);
    setIsEntityModalOpen(true);
  };

  const handleAddEntity = (entityData: Database['public']['Tables']['entities']['Insert']) => {
    console.log("Adding new entity:", entityData);
    // Here you would typically save to your backend
  };

  interface MeetingFormData {
    title: string;
    type: string;
    entity: string;
    date: string;
    time: string;
    location: string;
    agenda: string;
    attendees: string;
  }

  const handleScheduleMeeting = (meetingData: MeetingFormData) => {
    console.log("Scheduling meeting:", meetingData);
    // Here you would typically save to your backend
  };

  if (showGroupStructure) {
    return <GroupStructureViewer />;
  }

  if (selectedRegister) {
    return (
      <StatutoryRegisterDetail 
        registerType={selectedRegister as "directors" | "members" | "charges"}
        onBack={() => setSelectedRegister(null)}
      />
    );
  }

  // Render different views based on activeView
  if (activeView === 'resolutions') {
    return <AIResolutionDrafter />;
  }

  if (activeView === 'calendar') {
    return <MeetingCalendar />;
  }

  if (activeView === 'boardpacks') {
    return <BoardPackManager />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Company Secretarial & Corporate Governance</h1>
          <p className="text-muted-foreground mt-2">
            Manage entity records, statutory registers, and compliance across your organization
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setActiveView('resolutions')} variant="outline">
            <Briefcase className="h-4 w-4 mr-2" />
            AI Resolutions
          </Button>
          <Button onClick={() => setActiveView('calendar')} variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Meeting Calendar
          </Button>
          <Button onClick={() => setActiveView('boardpacks')} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Board Packs
          </Button>
          <Button onClick={() => setIsAddEntityModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entity
          </Button>
        </div>
      </div>

      {/* Quick Access Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Entity-Centric Document Management</h3>
            <p className="text-sm text-blue-700 mt-1">
              Constitutional documents and statutory registers are now managed per entity. 
              Click on any entity below to access its documents, registers, and AI-powered features.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entities</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">231 Active</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-blue-600">423 Clauses</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Resolutions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-purple-600">34 This Month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Board Packs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-orange-600">12 Pending</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">7 Confirmed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600">3 High Priority</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="entities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="entities">Entity Directory</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="registers">Statutory Registers</TabsTrigger>
          <TabsTrigger value="filings">Regulatory Filings</TabsTrigger>
          <TabsTrigger value="meetings">Meetings & Resolutions</TabsTrigger>
          <TabsTrigger value="calendar">Meeting Calendar</TabsTrigger>
          <TabsTrigger value="structure">Group Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Constitutional Documents</CardTitle>
                  <CardDescription>AI-powered document analysis and clause extraction - now managed per entity</CardDescription>
                </div>
                <Badge variant="outline">Entity-Specific</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-6 border rounded-lg">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">Upload & Analyze</h3>
                  <p className="text-sm text-muted-foreground">Upload constitutional documents for AI analysis</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Search className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">AI Query</h3>
                  <p className="text-sm text-muted-foreground">Ask questions about your documents</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">Extract Clauses</h3>
                  <p className="text-sm text-muted-foreground">Automatically extract key governance clauses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entities" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Entity Directory</CardTitle>
                  <CardDescription>Manage and monitor all entities across jurisdictions</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entities.map((entity) => (
                  <div key={entity.id} className="border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors" onClick={() => handleEntityClick(entity)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Building2 className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{entity.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {entity.jurisdiction}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statutory Registers</CardTitle>
              <CardDescription>Maintain directors, members, and other statutory records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => setSelectedRegister("directors")}>
                  <CardHeader>
                    <CardTitle className="text-lg">Directors Register</CardTitle>
                    <CardDescription>Track director appointments and resignations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">156</div>
                    <div className="text-sm text-muted-foreground">Active appointments</div>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Users className="h-4 w-4 mr-2" />
                      View Register
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => setSelectedRegister("members")}>
                  <CardHeader>
                    <CardTitle className="text-lg">Members Register</CardTitle>
                    <CardDescription>Manage shareholder records and transfers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">89</div>
                    <div className="text-sm text-muted-foreground">Registered members</div>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Briefcase className="h-4 w-4 mr-2" />
                      View Register
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => setSelectedRegister("charges")}>
                  <CardHeader>
                    <CardTitle className="text-lg">Charges Register</CardTitle>
                    <CardDescription>Monitor security interests and charges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">23</div>
                    <div className="text-sm text-muted-foreground">Active charges</div>
                    <Button variant="outline" size="sm" className="mt-4">
                      <FileText className="h-4 w-4 mr-2" />
                      View Register
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Filings & Compliance Calendar</CardTitle>
              <CardDescription>Track filing deadlines and compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 border-red-200 bg-red-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-red-900">Annual Return - Overdue</h3>
                        <p className="text-sm text-red-700">Global Tech Solutions Pte Ltd</p>
                        <p className="text-xs text-red-600">Due: 3 days ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="destructive">
                      File Now
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 border-orange-200 bg-orange-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <div>
                        <h3 className="font-semibold text-orange-900">Confirmation Statement</h3>
                        <p className="text-sm text-orange-700">Acme Corporation Ltd</p>
                        <p className="text-xs text-orange-600">Due: In 5 days</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Prepare Filing
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Annual Accounts</h3>
                        <p className="text-sm text-muted-foreground">Innovation Holdings Inc</p>
                        <p className="text-xs text-muted-foreground">Due: In 2 months</p>
                      </div>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Meeting Calendar</CardTitle>
                  <CardDescription>Visual calendar with notice tracking and status management</CardDescription>
                </div>
                <Button onClick={() => setActiveView('calendar')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-6 border rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">Visual Calendar</h3>
                  <p className="text-sm text-muted-foreground">Month and list views of all meetings</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">Notice Tracking</h3>
                  <p className="text-sm text-muted-foreground">Track notice requirements and deadlines</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">Status Management</h3>
                  <p className="text-sm text-muted-foreground">Tentative vs confirmed meeting status</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI Resolution Drafter</CardTitle>
                    <CardDescription>Generate professional resolutions with AI</CardDescription>
                  </div>
                  <Button onClick={() => setActiveView('resolutions')} variant="outline">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Draft Resolution
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">AI-Powered Templates</h3>
                    <p className="text-sm text-muted-foreground">Director appointments, banking resolutions, share allotments</p>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">Auto Execution Blocks</h3>
                    <p className="text-sm text-muted-foreground">Automatically populate signature blocks for directors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Board Pack Manager</CardTitle>
                    <CardDescription>Create and distribute board packs with e-signature</CardDescription>
                  </div>
                  <Button onClick={() => setActiveView('boardpacks')} variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Packs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">Document Upload</h3>
                    <p className="text-sm text-muted-foreground">Upload agendas, reports, and resolutions</p>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">E-Signature Workflow</h3>
                    <p className="text-sm text-muted-foreground">Send board packs for director signatures</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Meeting Activity</CardTitle>
              <CardDescription>Latest meetings and resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3">Upcoming Meetings</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <h5 className="font-semibold">Board Meeting - Q4 Review</h5>
                      <p className="text-sm text-muted-foreground">Acme Corporation Ltd</p>
                      <p className="text-xs text-muted-foreground">Dec 15, 2024 at 2:00 PM</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h5 className="font-semibold">AGM 2024</h5>
                      <p className="text-sm text-muted-foreground">Global Tech Solutions Pte Ltd</p>
                      <p className="text-xs text-muted-foreground">Dec 20, 2024 at 10:00 AM</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Recent Resolutions</h4>
                  <div className="space-y-3">
                    <div className="border rounded p-3">
                      <h5 className="font-semibold">Resolution #2024-015</h5>
                      <p className="text-sm text-muted-foreground">Approval of new banking facilities</p>
                      <Badge variant="secondary" className="mt-2">Approved</Badge>
                    </div>
                    <div className="border rounded p-3">
                      <h5 className="font-semibold">Resolution #2024-014</h5>
                      <p className="text-sm text-muted-foreground">Director appointment</p>
                      <Badge variant="secondary" className="mt-2">Approved</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Group Structure Visualization</CardTitle>
              <CardDescription>Interactive organizational chart and ownership structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Building2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Organization Chart</h3>
                <p className="text-sm text-muted-foreground mb-4">Interactive group structure visualization</p>
                <Button onClick={() => setShowGroupStructure(true)}>
                  View Full Structure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <EntityDetailModal
        entity={selectedEntity}
        isOpen={isEntityModalOpen}
        onClose={() => {
          setIsEntityModalOpen(false);
          setSelectedEntity(null);
        }}
      />

      <AddEntityModal
        isOpen={isAddEntityModalOpen}
        onClose={() => setIsAddEntityModalOpen(false)}
        onSave={handleAddEntity}
      />

      <MeetingScheduler
        isOpen={isMeetingSchedulerOpen}
        onClose={() => setIsMeetingSchedulerOpen(false)}
        onSave={handleScheduleMeeting}
      />
    </div>
  );
}
