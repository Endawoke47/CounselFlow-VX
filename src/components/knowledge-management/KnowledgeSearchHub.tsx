import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Brain, FileText, Filter, BookOpen, Lightbulb, TrendingUp } from "lucide-react";
import { ApiServiceFactory } from '@/services/api/index';

export function KnowledgeSearchHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [searchType, setSearchType] = useState("semantic");
  const [entityFilter, setEntityFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function fetchInitial() {
      setLoading(true);
      setError(null);
      try {
        // Fetch trending topics, suggestions, and insights from API service
        const [trendingRes, suggestionsRes, insightsRes] = await Promise.all([
          ApiServiceFactory.getKnowledgeService().getTrendingTopics(),
          ApiServiceFactory.getKnowledgeService().getSearchSuggestions(),
          ApiServiceFactory.getKnowledgeService().getKnowledgeInsights(),
        ]);
        setTrending(trendingRes || []);
        setSuggestions((suggestionsRes || []).map((s: { text: string }) => s.text));
        setInsights(insightsRes || []);
      } catch (e) {
        setError("Failed to load knowledge search data.");
      }
      setLoading(false);
    }
    fetchInitial();
  }, []);

  async function handleSearch() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("knowledge_entries")
        .select("*")
        .ilike("title", `%${searchQuery}%`);
      if (error) throw error;
      setResults(data || []);
    } catch (e) {
      setError("Failed to search knowledge base.");
      setResults([]);
    }
    setLoading(false);
    setHasSearched(true);
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning": return "🚨";
      case "info": return "ℹ️";
      case "suggestion": return "💡";
      default: return "📋";
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning": return "border-orange-200 bg-orange-50";
      case "info": return "border-blue-200 bg-blue-50";
      case "suggestion": return "border-green-200 bg-green-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI-Powered Knowledge Search
          </CardTitle>
          <CardDescription>
            Search across all knowledge entries using natural language queries and AI-powered semantic search
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Ask anything about your knowledge base... e.g., 'What are the GDPR requirements for data processing?'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
              {loading ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Search Options */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Search Type:</label>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semantic">Semantic Search</SelectItem>
                  <SelectItem value="keyword">Keyword Search</SelectItem>
                  <SelectItem value="hybrid">Hybrid Search</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Entity:</label>
              <Select value={entityFilter} onValueChange={setEntityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="uk">TechCorp UK Ltd</SelectItem>
                  <SelectItem value="de">TechCorp GmbH</SelectItem>
                  <SelectItem value="us">TechCorp Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Suggestions */}
          {!hasSearched && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Try these suggestions:</label>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSearchQuery(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trending Topics */}
      {!hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Trending Topics
            </CardTitle>
            <CardDescription>Popular search topics in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trending.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{topic.topic}</h4>
                    <p className="text-sm text-muted-foreground">{topic.searches} searches</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {topic.trend}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results & Analytics */}
      {hasSearched && (
        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="results">Search Results</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="analytics">Knowledge Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Found {results.length} results for "{searchQuery}"
              </h3>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">Sort by relevance</span>
              </div>
            </div>

            {results.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-lg">{result.title}</h4>
                        <Badge variant="outline">{result.type}</Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {result.relevanceScore}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {result.jurisdiction} • Last updated: {result.lastUpdated}
                      </p>
                      <p className="text-sm mb-3">{result.excerpt}</p>
                      <div className="flex items-center space-x-2">
                        {result.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                AI-Generated Insights
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on your search and knowledge usage patterns, here are some insights:
              </p>

              {insights.map((insight, index) => (
                <Card key={index} className={`border-l-4 ${getInsightColor(insight.type)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{getInsightIcon(insight.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{insight.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {insight.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Usage Analytics</CardTitle>
                <CardDescription>
                  Insights into how your knowledge base is being used
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Most Accessed Content</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-sm">GDPR Compliance Guide</span>
                        <Badge>245 views</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-sm">Employment Contract FAQ</span>
                        <Badge>189 views</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-sm">IP Assignment Guidelines</span>
                        <Badge>156 views</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Content Gaps</h4>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg bg-orange-50 border-orange-200">
                        <h5 className="font-medium text-orange-900">Missing Topics</h5>
                        <ul className="text-sm text-orange-800 mt-1 space-y-1">
                          <li>• AI governance frameworks</li>
                          <li>• Cryptocurrency regulations</li>
                          <li>• ESG compliance guidelines</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Loading and Error States */}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center py-4">
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}
    </div>
  );
}
