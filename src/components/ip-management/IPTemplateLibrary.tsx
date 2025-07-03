import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Plus,
  Filter,
  Star,
  Clock,
  Users
} from "lucide-react";

export function IPTemplateLibrary() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    async function fetchTemplates() {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace 'ip_templates' with the actual table name if different
        const { data, error: fetchError } = await supabase
          .from("ip_templates")
          .select("*");
        if (fetchError) throw fetchError;
        setTemplates(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load templates");
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Patents", label: "Patents" },
    { value: "Trademarks", label: "Trademarks" },
    { value: "Copyright", label: "Copyright" },
    { value: "Trade Secrets", label: "Trade Secrets" },
    { value: "General", label: "General" }
  ];

  const types = [
    { value: "all", label: "All Types" },
    { value: "Application", label: "Applications" },
    { value: "License", label: "Licenses" },
    { value: "Assignment", label: "Assignments" },
    { value: "Protection", label: "Protection" },
    { value: "Report", label: "Reports" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Patents": return "bg-blue-100 text-blue-800";
      case "Trademarks": return "bg-green-100 text-green-800";
      case "Copyright": return "bg-purple-100 text-purple-800";
      case "Trade Secrets": return "bg-orange-100 text-orange-800";
      case "General": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Application": return "bg-indigo-100 text-indigo-800";
      case "License": return "bg-emerald-100 text-emerald-800";
      case "Assignment": return "bg-amber-100 text-amber-800";
      case "Protection": return "bg-red-100 text-red-800";
      case "Report": return "bg-cyan-100 text-cyan-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesType = typeFilter === "all" || template.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  if (loading) return <div className="p-8 text-center">Loading templates...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              IP Template Library
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{template.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                    <Badge className={getTypeColor(template.type)}>
                      {template.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(template.rating)}
                  <span className="text-sm text-muted-foreground ml-1">
                    {template.rating}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Author:</span>
                  <span>{template.author}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span>{template.format}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{template.fileSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Jurisdiction:</span>
                  <span>{template.jurisdiction}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {template.lastUpdated}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {template.downloads}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Most Popular Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {templates
              .sort((a, b) => b.downloads - a.downloads)
              .slice(0, 3)
              .map((template, index) => (
                <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{template.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {template.downloads} downloads • {template.rating} ★
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
