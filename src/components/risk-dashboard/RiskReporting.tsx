
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, FileText, Calendar as CalendarIcon, BarChart3, TrendingUp, Users, Target } from "lucide-react";
import { format } from "date-fns";

const mockReports = [
  {
    id: "RPT-2024-001",
    title: "Monthly Risk Assessment Report",
    type: "Monthly",
    generatedDate: "2024-01-31",
    generatedBy: "System",
    status: "Available",
    period: "January 2024",
    risksIncluded: 67,
    format: "PDF",
    size: "2.3 MB"
  },
  {
    id: "RPT-2024-002",
    title: "Quarterly Risk Dashboard",
    type: "Quarterly",
    generatedDate: "2024-01-01",
    generatedBy: "Jane Smith",
    status: "Available",
    period: "Q4 2023",
    risksIncluded: 73,
    format: "PDF",
    size: "4.1 MB"
  },
  {
    id: "RPT-2024-003",
    title: "Regulatory Compliance Risk Report",
    type: "Ad-hoc",
    generatedDate: "2024-01-15",
    generatedBy: "Mike Johnson",
    status: "Available",
    period: "January 2024",
    risksIncluded: 23,
    format: "Excel",
    size: "1.8 MB"
  },
  {
    id: "RPT-2024-004",
    title: "Executive Risk Summary",
    type: "Executive",
    generatedDate: "2024-01-25",
    generatedBy: "Sarah Davis",
    status: "Available",
    period: "January 2024",
    risksIncluded: 15,
    format: "PowerPoint",
    size: "3.2 MB"
  }
];

const reportTemplates = [
  {
    id: "template-1",
    name: "Executive Risk Summary",
    description: "High-level overview for executive leadership",
    sections: ["Executive Summary", "Top 10 Risks", "Mitigation Progress", "Key Metrics"],
    frequency: "Monthly"
  },
  {
    id: "template-2", 
    name: "Detailed Risk Assessment",
    description: "Comprehensive analysis of all risks",
    sections: ["Risk Registry", "Heat Map", "Trend Analysis", "Mitigation Details", "Recommendations"],
    frequency: "Quarterly"
  },
  {
    id: "template-3",
    name: "Regulatory Compliance Report",
    description: "Focus on regulatory and compliance risks",
    sections: ["Compliance Status", "Regulatory Changes", "Gap Analysis", "Action Plans"],
    frequency: "Monthly"
  },
  {
    id: "template-4",
    name: "Operational Risk Report",
    description: "Operational risk assessment and controls",
    sections: ["Operational Risks", "Control Effectiveness", "Incident Reports", "Improvement Plans"],
    frequency: "Bi-weekly"
  }
];

export function RiskReporting() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "Generating":
        return <Badge className="bg-blue-100 text-blue-800">Generating</Badge>;
      case "Failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getFormatBadge = (format: string) => {
    switch (format) {
      case "PDF":
        return <Badge variant="outline" className="text-red-600">PDF</Badge>;
      case "Excel":
        return <Badge variant="outline" className="text-green-600">Excel</Badge>;
      case "PowerPoint":
        return <Badge variant="outline" className="text-blue-600">PowerPoint</Badge>;
      default:
        return <Badge variant="outline">{format}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Risk Reporting</h2>
          <p className="text-muted-foreground">Generate comprehensive risk reports and analytics</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Generated this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Active Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Report templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Scheduled Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Automated generation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Report recipients</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
            <CardDescription>Create a custom risk report using available templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reporting Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="current-quarter">Current Quarter</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="custom">Custom Date Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedPeriod === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                  <SelectItem value="html">HTML Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">
              <Target className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Available templates for risk reporting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTemplates.map((template) => (
                <div key={template.id} className="p-4 border rounded-lg hover:bg-accent cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{template.frequency}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {template.sections.length} sections
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(template.id)}>
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated risk reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{report.title}</h4>
                    {getStatusBadge(report.status)}
                    {getFormatBadge(report.format)}
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>ID: {report.id}</span>
                    <span>Period: {report.period}</span>
                    <span>Generated: {report.generatedDate}</span>
                    <span>By: {report.generatedBy}</span>
                    <span>Risks: {report.risksIncluded}</span>
                    <span>Size: {report.size}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automated report generation schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Monthly Executive Summary</div>
                <div className="text-sm text-muted-foreground">
                  Generated on the 1st of each month • Next: February 1, 2024
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Quarterly Risk Assessment</div>
                <div className="text-sm text-muted-foreground">
                  Generated quarterly • Next: April 1, 2024
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Weekly Compliance Report</div>
                <div className="text-sm text-muted-foreground">
                  Generated every Friday • Next: January 26, 2024
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
