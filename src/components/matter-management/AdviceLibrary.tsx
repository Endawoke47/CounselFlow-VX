
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BookOpen, 
  Search, 
  Star, 
  Eye, 
  Plus,
  Filter,
  Tag,
  ThumbsUp,
  Clock
} from "lucide-react";

export function AdviceLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const adviceItems = [
    {
      id: "ADV-001",
      title: "Handling GDPR Data Subject Access Requests",
      category: "Data Protection",
      tags: ["GDPR", "Privacy", "Compliance"],
      author: "Sarah Chen",
      createdDate: "2024-01-15",
      lastUpdated: "2024-02-10",
      views: 156,
      likes: 23,
      rating: 4.8,
      complexity: "Intermediate",
      estimatedReadTime: "8 min",
      summary: "Comprehensive guide on processing GDPR data subject access requests including timelines, exemptions, and response templates."
    },
    {
      id: "ADV-002",
      title: "Software Licensing Agreement Key Terms",
      category: "Contract Law",
      tags: ["Software", "Licensing", "IP"],
      author: "David Park",
      createdDate: "2024-01-20",
      lastUpdated: "2024-02-08",
      views: 89,
      likes: 18,
      rating: 4.6,
      complexity: "Advanced",
      estimatedReadTime: "12 min",
      summary: "Detailed analysis of critical terms in software licensing agreements including scope, restrictions, and termination clauses."
    },
    {
      id: "ADV-003",
      title: "Employment Contract Termination Best Practices",
      category: "Employment Law",
      tags: ["Employment", "Termination", "HR"],
      author: "Emily Rodriguez",
      createdDate: "2024-01-25",
      lastUpdated: "2024-02-05",
      views: 134,
      likes: 31,
      rating: 4.9,
      complexity: "Intermediate",
      estimatedReadTime: "10 min",
      summary: "Best practices for handling employment terminations including notice requirements, severance considerations, and documentation."
    },
    {
      id: "ADV-004",
      title: "Corporate Board Resolution Templates",
      category: "Corporate Law",
      tags: ["Corporate", "Governance", "Board"],
      author: "Michael Johnson",
      createdDate: "2024-02-01",
      lastUpdated: "2024-02-12",
      views: 67,
      likes: 12,
      rating: 4.5,
      complexity: "Beginner",
      estimatedReadTime: "6 min",
      summary: "Collection of board resolution templates for common corporate actions including appointments, approvals, and authorizations."
    },
    {
      id: "ADV-005",
      title: "Merger & Acquisition Due Diligence Checklist",
      category: "Corporate Law",
      tags: ["M&A", "Due Diligence", "Transaction"],
      author: "Lisa Wang",
      createdDate: "2024-02-03",
      lastUpdated: "2024-02-11",
      views: 92,
      likes: 19,
      rating: 4.7,
      complexity: "Advanced",
      estimatedReadTime: "15 min",
      summary: "Comprehensive due diligence checklist for M&A transactions covering legal, financial, and operational considerations."
    }
  ];

  const categories = [
    "all",
    "Contract Law",
    "Employment Law", 
    "Data Protection",
    "Corporate Law",
    "Intellectual Property",
    "Compliance",
    "Litigation"
  ];

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "views", label: "Most Viewed" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Contract Law": return "bg-blue-100 text-blue-800";
      case "Employment Law": return "bg-green-100 text-green-800";
      case "Data Protection": return "bg-purple-100 text-purple-800";
      case "Corporate Law": return "bg-orange-100 text-orange-800";
      case "Intellectual Property": return "bg-red-100 text-red-800";
      case "Compliance": return "bg-yellow-100 text-yellow-800";
      case "Litigation": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const filteredAdvice = adviceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedAdvice = [...filteredAdvice].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes;
      case "rating":
        return b.rating - a.rating;
      case "views":
        return b.views - a.views;
      case "recent":
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Legal Advice Library
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Advice
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search advice by title or tags..."
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
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advice Items */}
      <div className="space-y-4">
        {sortedAdvice.map((advice) => (
          <Card key={advice.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium">{advice.title}</h3>
                    <Badge className={getCategoryColor(advice.category)}>
                      {advice.category}
                    </Badge>
                    <Badge className={getComplexityColor(advice.complexity)}>
                      {advice.complexity}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {advice.summary}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>By {advice.author}</span>
                    <span>•</span>
                    <span>Updated {advice.lastUpdated}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {advice.estimatedReadTime}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(advice.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      {advice.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {advice.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {advice.likes}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-1">
                    {advice.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Read
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Total Articles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2,340</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4.7</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">23</div>
            <div className="text-sm text-muted-foreground">Contributors</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
