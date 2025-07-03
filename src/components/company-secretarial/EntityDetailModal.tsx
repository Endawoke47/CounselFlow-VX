
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Users, FileText, Calendar, Edit, Trash2, Download, Upload, Search, BookOpen } from "lucide-react";
import { EntityDocumentManagement } from "./EntityDocumentManagement";
import { EntityStatutoryRegisters } from "./EntityStatutoryRegisters";

interface EntityDetailModalProps {
  entity: any;
  isOpen: boolean;
  onClose: () => void;
}

export function EntityDetailModal({ entity, isOpen, onClose }: EntityDetailModalProps) {
  if (!entity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Building2 className="h-6 w-6" />
            {entity.name}
          </DialogTitle>
          <DialogDescription>
            Entity Details and Management
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="directors">Directors</TabsTrigger>
            <TabsTrigger value="shares">Shares</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="registers">Registers</TabsTrigger>
            <TabsTrigger value="filings">Filings</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Entity Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Company Number</label>
                    <p className="text-sm text-muted-foreground">{entity.companyNumber || entity.uen}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Jurisdiction</label>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {entity.jurisdiction}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Badge variant={entity.status === "Active" ? "secondary" : "outline"}>
                      {entity.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Incorporation Date</label>
                    <p className="text-sm text-muted-foreground">15 March 2020</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Registered Address</label>
                  <p className="text-sm text-muted-foreground">
                    123 Business Street, Financial District, {entity.jurisdiction.split(',')[0]}, 12345
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="directors" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Directors</CardTitle>
                  <Button size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Add Director
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">John Smith</h4>
                      <p className="text-sm text-muted-foreground">Executive Director</p>
                      <p className="text-xs text-muted-foreground">Appointed: 15 March 2020</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Non-Executive Director</p>
                      <p className="text-xs text-muted-foreground">Appointed: 20 June 2021</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shares" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Share Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Authorized Capital</label>
                      <p className="text-lg font-semibold">$1,000,000</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Issued Capital</label>
                      <p className="text-lg font-semibold">$750,000</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Par Value</label>
                      <p className="text-lg font-semibold">$1.00</p>
                    </div>
                  </div>
                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-2">Shareholding Structure</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Acme Holdings Ltd</span>
                        <span>60% (450,000 shares)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investment Partners LLC</span>
                        <span>30% (225,000 shares)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Management Pool</span>
                        <span>10% (75,000 shares)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <EntityDocumentManagement 
              entityId={entity.id} 
              entityName={entity.name} 
            />
          </TabsContent>

          <TabsContent value="registers">
            <EntityStatutoryRegisters 
              entityId={entity.id} 
              entityName={entity.name} 
            />
          </TabsContent>

          <TabsContent value="filings" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Regulatory Filings</CardTitle>
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    New Filing
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Annual Return 2024</h4>
                      <p className="text-sm text-muted-foreground">Due: 15 March 2025</p>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Confirmation Statement</h4>
                      <p className="text-sm text-muted-foreground">Filed: 10 March 2024</p>
                      <Badge variant="secondary">Filed</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Board Meetings</CardTitle>
                  <Button size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded p-3">
                    <h4 className="font-medium">Q4 2024 Board Meeting</h4>
                    <p className="text-sm text-muted-foreground">15 December 2024, 2:00 PM</p>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                  <div className="border rounded p-3">
                    <h4 className="font-medium">Annual General Meeting</h4>
                    <p className="text-sm text-muted-foreground">20 March 2024, 10:00 AM</p>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
