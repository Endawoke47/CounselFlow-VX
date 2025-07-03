import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Users, 
  Share, 
  FileText, 
  Plus, 
  Edit, 
  Download,
  Eye,
  Calendar,
  Building2
} from "lucide-react";

interface EntityStatutoryRegistersProps {
  entityId: string;
  entityName: string;
}

interface RegisterEntry {
  id: string;
  type: 'director' | 'member' | 'charge' | 'allotment';
  date: Date;
  description: string;
  status: 'active' | 'ceased' | 'discharged';
  details: any;
}

export function EntityStatutoryRegisters({ entityId, entityName }: EntityStatutoryRegistersProps) {
  const [selectedRegister, setSelectedRegister] = useState<'directors' | 'members' | 'charges' | 'allotments'>('directors');

  const registerData = {
    directors: [
      {
        id: 'dir-1',
        type: 'director' as const,
        date: new Date('2020-03-15'),
        description: 'John Smith - Executive Director',
        status: 'active' as const,
        details: {
          name: 'John Smith',
          position: 'Executive Director',
          appointmentDate: new Date('2020-03-15'),
          address: '123 Business Street, London, UK',
          nationality: 'British',
          occupation: 'Company Director'
        }
      },
      {
        id: 'dir-2',
        type: 'director' as const,
        date: new Date('2021-06-20'),
        description: 'Sarah Johnson - Non-Executive Director',
        status: 'active' as const,
        details: {
          name: 'Sarah Johnson',
          position: 'Non-Executive Director',
          appointmentDate: new Date('2021-06-20'),
          address: '456 Corporate Ave, Manchester, UK',
          nationality: 'British',
          occupation: 'Business Consultant'
        }
      }
    ],
    members: [
      {
        id: 'mem-1',
        type: 'member' as const,
        date: new Date('2020-03-15'),
        description: 'Acme Holdings Ltd - 450,000 shares (60%)',
        status: 'active' as const,
        details: {
          name: 'Acme Holdings Ltd',
          shares: 450000,
          percentage: 60,
          shareClass: 'Ordinary',
          certificateNumber: 'CERT-001'
        }
      },
      {
        id: 'mem-2',
        type: 'member' as const,
        date: new Date('2020-03-15'),
        description: 'Investment Partners LLC - 225,000 shares (30%)',
        status: 'active' as const,
        details: {
          name: 'Investment Partners LLC',
          shares: 225000,
          percentage: 30,
          shareClass: 'Ordinary',
          certificateNumber: 'CERT-002'
        }
      }
    ],
    charges: [
      {
        id: 'charge-1',
        type: 'charge' as const,
        date: new Date('2021-01-15'),
        description: 'Fixed Charge - Business Bank Loan',
        status: 'active' as const,
        details: {
          chargeType: 'Fixed Charge',
          chargee: 'Business Bank PLC',
          amount: '£500,000',
          description: 'Fixed charge over company assets',
          registrationDate: new Date('2021-01-15')
        }
      }
    ],
    allotments: [
      {
        id: 'allot-1',
        type: 'allotment' as const,
        date: new Date('2020-03-15'),
        description: 'Initial Share Allotment - 750,000 shares',
        status: 'active' as const,
        details: {
          shares: 750000,
          shareClass: 'Ordinary',
          parValue: '£1.00',
          allotmentDate: new Date('2020-03-15'),
          consideration: 'Cash'
        }
      }
    ]
  };

  const getRegisterIcon = (registerType: string) => {
    switch (registerType) {
      case 'directors': return <Users className="h-4 w-4" />;
      case 'members': return <Share className="h-4 w-4" />;
      case 'charges': return <FileText className="h-4 w-4" />;
      case 'allotments': return <Building2 className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary">Active</Badge>;
      case 'ceased':
        return <Badge variant="outline">Ceased</Badge>;
      case 'discharged':
        return <Badge variant="outline">Discharged</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderRegisterContent = (registerType: string, entries: RegisterEntry[]) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">
            {registerType.charAt(0).toUpperCase() + registerType.slice(1)} Register
          </h4>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No entries in this register</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getRegisterIcon(registerType)}
                        <h5 className="font-medium">{entry.description}</h5>
                        {getStatusBadge(entry.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {entry.date.toLocaleDateString()}
                      </p>
                      
                      {registerType === 'directors' && (
                        <div className="text-sm space-y-1">
                          <p><strong>Position:</strong> {entry.details.position}</p>
                          <p><strong>Nationality:</strong> {entry.details.nationality}</p>
                          <p><strong>Occupation:</strong> {entry.details.occupation}</p>
                        </div>
                      )}
                      
                      {registerType === 'members' && (
                        <div className="text-sm space-y-1">
                          <p><strong>Shares:</strong> {entry.details.shares.toLocaleString()}</p>
                          <p><strong>Percentage:</strong> {entry.details.percentage}%</p>
                          <p><strong>Share Class:</strong> {entry.details.shareClass}</p>
                          <p><strong>Certificate:</strong> {entry.details.certificateNumber}</p>
                        </div>
                      )}
                      
                      {registerType === 'charges' && (
                        <div className="text-sm space-y-1">
                          <p><strong>Type:</strong> {entry.details.chargeType}</p>
                          <p><strong>Chargee:</strong> {entry.details.chargee}</p>
                          <p><strong>Amount:</strong> {entry.details.amount}</p>
                        </div>
                      )}
                      
                      {registerType === 'allotments' && (
                        <div className="text-sm space-y-1">
                          <p><strong>Shares:</strong> {entry.details.shares.toLocaleString()}</p>
                          <p><strong>Par Value:</strong> {entry.details.parValue}</p>
                          <p><strong>Consideration:</strong> {entry.details.consideration}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Statutory Registers</h3>
          <p className="text-sm text-muted-foreground">
            Manage statutory registers for {entityName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      <Tabs value={selectedRegister} onValueChange={(value) => setSelectedRegister(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="directors" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Directors
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Members
          </TabsTrigger>
          <TabsTrigger value="charges" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Charges
          </TabsTrigger>
          <TabsTrigger value="allotments" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Allotments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directors">
          {renderRegisterContent('directors', registerData.directors)}
        </TabsContent>

        <TabsContent value="members">
          {renderRegisterContent('members', registerData.members)}
        </TabsContent>

        <TabsContent value="charges">
          {renderRegisterContent('charges', registerData.charges)}
        </TabsContent>

        <TabsContent value="allotments">
          {renderRegisterContent('allotments', registerData.allotments)}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Register Summary</CardTitle>
          <CardDescription>Overview of all statutory registers for {entityName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{registerData.directors.length}</div>
              <div className="text-sm text-muted-foreground">Directors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{registerData.members.length}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{registerData.charges.length}</div>
              <div className="text-sm text-muted-foreground">Charges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{registerData.allotments.length}</div>
              <div className="text-sm text-muted-foreground">Allotments</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
