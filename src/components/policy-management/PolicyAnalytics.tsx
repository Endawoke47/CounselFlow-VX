
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, FileText, Clock, Users } from "lucide-react";

const policyTypeData = [
  { name: "Data Privacy", value: 45, policies: 45 },
  { name: "HR Policies", value: 32, policies: 32 },
  { name: "Financial", value: 28, policies: 28 },
  { name: "Security", value: 25, policies: 25 },
  { name: "Ethics", value: 18, policies: 18 }
];

const entityData = [
  { entity: "TechCorp UK", active: 85, draft: 12, retired: 8 },
  { entity: "TechCorp DE", active: 72, draft: 15, retired: 6 },
  { entity: "TechCorp US", active: 90, draft: 8, retired: 12 }
];

const timelineData = [
  { month: "Jan", created: 12, updated: 25, approved: 18 },
  { month: "Feb", created: 15, updated: 32, approved: 22 },
  { month: "Mar", created: 8, updated: 28, approved: 15 },
  { month: "Apr", created: 20, updated: 35, approved: 28 },
  { month: "May", created: 18, updated: 30, approved: 25 },
  { month: "Jun", created: 22, updated: 38, approved: 30 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function PolicyAnalytics() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Policy Creation Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <p className="text-xs text-muted-foreground">vs. last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Approval Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Active Author</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sarah J.</div>
            <p className="text-xs text-muted-foreground">23 policies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">+2% this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Policy Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Distribution by Type</CardTitle>
            <CardDescription>Breakdown of policies across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={policyTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {policyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Entity Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Policies by Entity</CardTitle>
            <CardDescription>Active, draft, and retired policies per entity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={entityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="entity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="#00C49F" name="Active" />
                <Bar dataKey="draft" fill="#FFBB28" name="Draft" />
                <Bar dataKey="retired" fill="#FF8042" name="Retired" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Activity Timeline</CardTitle>
          <CardDescription>Policy creation, updates, and approvals over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="created" stroke="#0088FE" strokeWidth={2} name="Created" />
              <Line type="monotone" dataKey="updated" stroke="#00C49F" strokeWidth={2} name="Updated" />
              <Line type="monotone" dataKey="approved" stroke="#FFBB28" strokeWidth={2} name="Approved" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Policy Authors</CardTitle>
            <CardDescription>Most active policy creators this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sarah Johnson</span>
                <span className="text-sm text-muted-foreground">23 policies</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Michael Schmidt</span>
                <span className="text-sm text-muted-foreground">18 policies</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Jennifer Chen</span>
                <span className="text-sm text-muted-foreground">15 policies</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">David Wilson</span>
                <span className="text-sm text-muted-foreground">12 policies</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approval Metrics</CardTitle>
            <CardDescription>Approval process efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Approval Time</span>
                <span className="text-sm text-muted-foreground">4.2 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">First-Pass Approval Rate</span>
                <span className="text-sm text-muted-foreground">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Policies Pending {">"}7 days</span>
                <span className="text-sm text-muted-foreground">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rejection Rate</span>
                <span className="text-sm text-muted-foreground">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
