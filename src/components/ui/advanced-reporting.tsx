import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  FileText,
  Download,
  Calendar as CalendarIcon,
  Filter,
  Settings,
  Play,
  Pause,
  Clock,
  BarChart3,
  PieChart,
  TrendingUp,
  Mail,
  Share,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: string[];
  filters: ReportFilter[];
  schedule?: ReportSchedule;
  format: "pdf" | "excel" | "csv";
  createdAt: string;
  lastRun?: string;
}

interface ReportFilter {
  field: string;
  operator: "equals" | "contains" | "greater_than" | "less_than" | "between" | "in";
  value: any;
  label: string;
}

interface ReportSchedule {
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  recipients: string[];
  active: boolean;
}

interface AdvancedReportingProps {
  templates: ReportTemplate[];
  availableFields: Record<string, string[]>;
  onSaveTemplate: (template: ReportTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  onRunReport: (templateId: string) => void;
  onScheduleReport: (templateId: string, schedule: ReportSchedule) => void;
}

export function AdvancedReporting({
  templates,
  availableFields,
  onSaveTemplate,
  onDeleteTemplate,
  onRunReport,
  onScheduleReport,
}: AdvancedReportingProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("templates");

  const categories = [
    "Contracts",
    "Matters",
    "Compliance",
    "Risk Management",
    "IP Management",
    "Financial",
    "Operational",
  ];

  const createNewTemplate = (): ReportTemplate => ({
    id: `template-${Date.now()}`,
    name: "New Report Template",
    description: "",
    category: "Contracts",
    fields: [],
    filters: [],
    format: "pdf",
    createdAt: new Date().toISOString(),
  });

  const handleSaveTemplate = (template: ReportTemplate) => {
    onSaveTemplate(template);
    setShowTemplateDialog(false);
    setSelectedTemplate(null);
    setIsEditing(false);
  };

  const getStatusBadge = (template: ReportTemplate) => {
    if (template.schedule?.active) {
      return <Badge variant="default" className="text-xs">Scheduled</Badge>;
    }
    if (template.lastRun) {
      return <Badge variant="secondary" className="text-xs">Manual</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Draft</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Advanced Reporting</h2>
          <p className="text-muted-foreground">
            Create, schedule, and manage comprehensive legal reports
          </p>
        </div>
        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedTemplate(createNewTemplate())}>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <ReportTemplateDialog
            template={selectedTemplate}
            availableFields={availableFields}
            categories={categories}
            onSave={handleSaveTemplate}
            onCancel={() => {
              setShowTemplateDialog(false);
              setSelectedTemplate(null);
            }}
          />
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        {getStatusBadge(template)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setShowTemplateDialog(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {template.description || "No description"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>{template.fields.length} fields</span>
                      <span>{template.filters.length} filters</span>
                    </div>
                    {template.lastRun && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">
                          Last run: {format(new Date(template.lastRun), "MMM d, yyyy")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => onRunReport(template.id)}
                      className="flex-1"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <div className="space-y-4">
            {templates
              .filter((t) => t.schedule?.active)
              .map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>
                          Runs {template.schedule?.frequency} at {template.schedule?.time}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Active</Badge>
                        <Button variant="outline" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>Recipients: {template.schedule?.recipients.length || 0}</span>
                        <span>Format: {template.format.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>Next run: Tomorrow 9:00 AM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>
                View and download previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: "Monthly Contract Report",
                    date: "2024-06-15",
                    status: "completed",
                    size: "2.4 MB",
                  },
                  {
                    name: "Risk Assessment Summary",
                    date: "2024-06-14",
                    status: "completed",
                    size: "1.8 MB",
                  },
                  {
                    name: "Compliance Dashboard",
                    date: "2024-06-13",
                    status: "failed",
                    size: "-",
                  },
                ].map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(report.date), "MMM d, yyyy")} • {report.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={report.status === "completed" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {report.status}
                      </Badge>
                      {report.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <div className="flex items-center gap-1 text-sm text-success-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Scheduled Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Active schedules</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <div className="flex items-center gap-1 text-sm text-success-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+2% from last quarter</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReportTemplateDialog({
  template,
  availableFields,
  categories,
  onSave,
  onCancel,
}: {
  template: ReportTemplate | null;
  availableFields: Record<string, string[]>;
  categories: string[];
  onSave: (template: ReportTemplate) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<ReportTemplate>(
    template || {
      id: `template-${Date.now()}`,
      name: "",
      description: "",
      category: "Contracts",
      fields: [],
      filters: [],
      format: "pdf",
      createdAt: new Date().toISOString(),
    }
  );

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  const handleFieldToggle = (field: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        fields: [...formData.fields, field],
      });
    } else {
      setFormData({
        ...formData,
        fields: formData.fields.filter((f) => f !== field),
      });
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{template ? "Edit Template" : "Create Report Template"}</DialogTitle>
        <DialogDescription>
          Configure your report template with fields, filters, and scheduling
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="fields">Fields & Filters</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div>
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter template name"
            />
          </div>

          <div>
            <Label htmlFor="template-description">Description</Label>
            <Textarea
              id="template-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description"
            />
          </div>

          <div>
            <Label htmlFor="template-category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="template-format">Output Format</Label>
            <Select
              value={formData.format}
              onValueChange={(value: any) => setFormData({ ...formData, format: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="fields" className="space-y-4">
          <div>
            <Label>Available Fields</Label>
            <div className="mt-2 space-y-3 max-h-60 overflow-y-auto">
              {Object.entries(availableFields).map(([category, fields]) => (
                <div key={category}>
                  <h4 className="font-medium text-sm mb-2">{category}</h4>
                  <div className="space-y-2 pl-4">
                    {fields.map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox
                          id={field}
                          checked={formData.fields.includes(field)}
                          onCheckedChange={(checked) =>
                            handleFieldToggle(field, checked as boolean)
                          }
                        />
                        <Label htmlFor={field} className="text-sm">
                          {field}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Configure automatic report generation and distribution
          </div>
          {/* Schedule configuration would go here */}
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!formData.name.trim()}>
          {template ? "Update" : "Create"} Template
        </Button>
      </div>
    </DialogContent>
  );
} 