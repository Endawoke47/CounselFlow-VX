
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Filter, 
  X, 
  ChevronDown, 
  Calendar as CalendarIcon,
  Search,
  RotateCcw
} from "lucide-react";
import { format } from "date-fns";

interface MatterFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export function MatterFilters({ onFiltersChange }: MatterFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: [],
    priority: [],
    businessUnit: [],
    owner: [],
    matterType: [],
    dateRange: {
      from: null,
      to: null
    },
    slaStatus: []
  });

  const statusOptions = ["In Progress", "Pending Review", "Complete", "On Hold"];
  const priorityOptions = ["Low", "Medium", "High", "Critical"];
  const businessUnitOptions = ["HR", "IT", "Procurement", "Finance", "Operations"];
  const ownerOptions = ["Sarah Chen", "David Park", "Emily Rodriguez", "Michael Wong"];
  const matterTypeOptions = ["Contract Review", "Legal Advice", "Compliance", "Litigation", "Regulatory"];
  const slaStatusOptions = ["On Track", "At Risk", "Breached"];

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const currentArray = filters[key as keyof typeof filters] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: "",
      status: [],
      priority: [],
      businessUnit: [],
      owner: [],
      matterType: [],
      dateRange: { from: null, to: null },
      slaStatus: []
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    count += filters.status.length;
    count += filters.priority.length;
    count += filters.businessUnit.length;
    count += filters.owner.length;
    count += filters.matterType.length;
    count += filters.slaStatus.length;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Advanced Filters
                {activeCount > 0 && (
                  <Badge variant="secondary">{activeCount}</Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                {activeCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    clearAllFilters();
                  }}>
                    <RotateCcw className="h-4 w-4" />
                    Clear All
                  </Button>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search matters..."
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Status Filter */}
              <div className="space-y-3">
                <Label>Status</Label>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={filters.status.includes(status)}
                        onCheckedChange={() => toggleArrayFilter("status", status)}
                      />
                      <Label htmlFor={`status-${status}`} className="text-sm font-normal">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div className="space-y-3">
                <Label>Priority</Label>
                <div className="space-y-2">
                  {priorityOptions.map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        id={`priority-${priority}`}
                        checked={filters.priority.includes(priority)}
                        onCheckedChange={() => toggleArrayFilter("priority", priority)}
                      />
                      <Label htmlFor={`priority-${priority}`} className="text-sm font-normal">
                        {priority}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Unit Filter */}
              <div className="space-y-3">
                <Label>Business Unit</Label>
                <div className="space-y-2">
                  {businessUnitOptions.map((unit) => (
                    <div key={unit} className="flex items-center space-x-2">
                      <Checkbox
                        id={`unit-${unit}`}
                        checked={filters.businessUnit.includes(unit)}
                        onCheckedChange={() => toggleArrayFilter("businessUnit", unit)}
                      />
                      <Label htmlFor={`unit-${unit}`} className="text-sm font-normal">
                        {unit}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Filter */}
              <div className="space-y-3">
                <Label>Owner</Label>
                <div className="space-y-2">
                  {ownerOptions.map((owner) => (
                    <div key={owner} className="flex items-center space-x-2">
                      <Checkbox
                        id={`owner-${owner}`}
                        checked={filters.owner.includes(owner)}
                        onCheckedChange={() => toggleArrayFilter("owner", owner)}
                      />
                      <Label htmlFor={`owner-${owner}`} className="text-sm font-normal">
                        {owner}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matter Type Filter */}
              <div className="space-y-3">
                <Label>Matter Type</Label>
                <div className="space-y-2">
                  {matterTypeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.matterType.includes(type)}
                        onCheckedChange={() => toggleArrayFilter("matterType", type)}
                      />
                      <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* SLA Status Filter */}
              <div className="space-y-3">
                <Label>SLA Status</Label>
                <div className="space-y-2">
                  {slaStatusOptions.map((sla) => (
                    <div key={sla} className="flex items-center space-x-2">
                      <Checkbox
                        id={`sla-${sla}`}
                        checked={filters.slaStatus.includes(sla)}
                        onCheckedChange={() => toggleArrayFilter("slaStatus", sla)}
                      />
                      <Label htmlFor={`sla-${sla}`} className="text-sm font-normal">
                        {sla}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <Label>Date Range</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.from ? format(filters.dateRange.from, "PPP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange.from}
                      onSelect={(date) => updateFilter("dateRange", { ...filters.dateRange, from: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.to ? format(filters.dateRange.to, "PPP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange.to}
                      onSelect={(date) => updateFilter("dateRange", { ...filters.dateRange, to: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Active Filters Summary */}
            {activeCount > 0 && (
              <div className="space-y-2">
                <Label>Active Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <Badge variant="secondary">
                      Search: {filters.search}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilter("search", "")} />
                    </Badge>
                  )}
                  {filters.status.map((status) => (
                    <Badge key={status} variant="secondary">
                      Status: {status}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleArrayFilter("status", status)} />
                    </Badge>
                  ))}
                  {filters.priority.map((priority) => (
                    <Badge key={priority} variant="secondary">
                      Priority: {priority}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleArrayFilter("priority", priority)} />
                    </Badge>
                  ))}
                  {/* Add more filter badges as needed */}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
