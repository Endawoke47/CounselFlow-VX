'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { useToast } from '../../hooks/use-toast';

interface LegalSearchResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  summary: string;
  url: string;
  relevance_score: number;
  source: string;
}

interface SearchResponse {
  query: string;
  total_results: number;
  results: LegalSearchResult[];
  sources: string[];
  search_time: number;
  errors?: string[];
}

export default function ExternalLegalDatabases() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>(['courtlistener', 'westlaw', 'lexisnexis']);
  const [popularSearches, setPopularSearches] = useState<Array<{query: string; count: number}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchPopularSearches();
  }, []);

  const fetchPopularSearches = async () => {
    try {
      const response = await fetch('/api/v1/legal-databases/popular-searches');
      if (response.ok) {
        const data = await response.json();
        setPopularSearches(data);
      }
    } catch (error) {
      console.error('Failed to fetch popular searches:', error);
    }
  };

  const performSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a search query',
        variant: 'destructive',
      });
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch('/api/v1/legal-databases/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          query: searchQuery,
          databases: selectedSources,
          max_results: 25
        }),
      });

      if (response.ok) {
        const data: SearchResponse = await response.json();
        setSearchResults(data);
        
        if (data.errors) {
          toast({
            title: 'Search completed with warnings',
            description: `Some databases encountered errors: ${data.errors.join(', ')}`,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Search completed',
            description: `Found ${data.total_results} results in ${data.search_time.toFixed(2)}s`,
          });
        }
      } else {
        throw new Error('Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Search failed',
        description: 'Unable to perform search. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'westlaw': return 'bg-blue-100 text-blue-800';
      case 'lexisnexis': return 'bg-red-100 text-red-800';
      case 'courtlistener': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Database Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Enter your legal research query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={performSearch} 
              disabled={isSearching}
              className="min-w-[100px]"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {/* Source Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Search Sources:</label>
            <div className="flex flex-wrap gap-2">
              {['courtlistener', 'westlaw', 'lexisnexis'].map((source) => (
                <label key={source} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedSources.includes(source)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSources([...selectedSources, source]);
                      } else {
                        setSelectedSources(selectedSources.filter(s => s !== source));
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm capitalize">{source}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Searches */}
      {popularSearches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Popular Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search.query)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                >
                  {search.query} ({search.count})
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle>
              Search Results ({searchResults.total_results} found in {searchResults.search_time.toFixed(2)}s)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.results.length > 0 ? (
              <div className="space-y-4">
                {searchResults.results.map((result, index) => (
                  <div key={`${result.source}-${result.id}-${index}`} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-blue-600 hover:text-blue-800">
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          {result.title}
                        </a>
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSourceBadgeColor(result.source)}`}>
                        {result.source}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      {result.citation && <span className="mr-4">Citation: {result.citation}</span>}
                      {result.court && <span className="mr-4">Court: {result.court}</span>}
                      {result.date && <span>Date: {new Date(result.date).toLocaleDateString()}</span>}
                    </div>
                    
                    {result.summary && (
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        {result.summary}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Relevance: {(result.relevance_score * 100).toFixed(1)}%</span>
                      <a 
                        href={result.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Full Document →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">📚</div>
                <p>No results found for your query.</p>
                <p className="text-sm">Try different keywords or check your spelling.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Search Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Basic Search:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Use quotes for exact phrases: &ldquo;contract dispute&rdquo;</li>
                <li>• Use AND/OR for multiple terms</li>
                <li>• Use wildcards: employ* for employment, employee, etc.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Advanced Search:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• court:supreme for specific courts</li>
                <li>• date:[2020 TO 2023] for date ranges</li>
                <li>• jurisdiction:federal for jurisdiction filtering</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
