import { useState, useCallback } from "react";
import { RelationshipService, RelatedItem } from '@/services/relationshipService';

export interface DrillDownData {
  id: string;
  title: string;
  module: string;
  filters?: Record<string, any>;
  data: any[];
  columns: Array<{
    key: string;
    label: string;
    type?: "text" | "number" | "date" | "badge" | "currency";
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  // Add relationship support
  showRelationships?: boolean;
  itemType?: string;
  selectedItemId?: string;
  onRelatedItemClick?: (item: RelatedItem) => void;
}

// Sample data generators for different modules
const generateContractData = (filters?: Record<string, any>) => {
  const statuses = ["draft", "under_review", "approved", "executed", "expired"];
  const types = ["NDA", "Service Agreement", "Employment", "Vendor", "Partnership"];
  const priorities = ["high", "medium", "low"];
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: `contract-${i + 1}`,
    title: `${types[i % types.length]} Contract ${i + 1}`,
    counterparty: `Company ${String.fromCharCode(65 + (i % 26))}`,
    value: Math.floor(Math.random() * 500000) + 10000,
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    created_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    expiry_date: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    owner: `Legal Team ${(i % 3) + 1}`,
  })).filter(item => {
    if (!filters) return true;
    return Object.entries(filters).every(([key, value]) => 
      item[key as keyof typeof item] === value
    );
  });
};

const generateMatterData = (filters?: Record<string, any>) => {
  const statuses = ["active", "pending", "closed", "on_hold"];
  const types = ["Litigation", "Corporate", "IP", "Employment", "Regulatory"];
  const priorities = ["critical", "high", "medium", "low"];
  
  return Array.from({ length: 30 }, (_, i) => ({
    id: `matter-${i + 1}`,
    title: `${types[i % types.length]} Matter ${i + 1}`,
    client: `Client ${String.fromCharCode(65 + (i % 26))}`,
    budget: Math.floor(Math.random() * 200000) + 5000,
    spent: Math.floor(Math.random() * 150000) + 1000,
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    opened_date: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    attorney: `Attorney ${(i % 5) + 1}`,
  })).filter(item => {
    if (!filters) return true;
    return Object.entries(filters).every(([key, value]) => 
      item[key as keyof typeof item] === value
    );
  });
};

const generateTaskData = (filters?: Record<string, any>) => {
  const statuses = ["pending", "in_progress", "completed", "overdue"];
  const priorities = ["urgent", "high", "medium", "low"];
  const types = ["Review", "Draft", "Research", "Filing", "Meeting"];
  
  return Array.from({ length: 40 }, (_, i) => ({
    id: `task-${i + 1}`,
    title: `${types[i % types.length]} Task ${i + 1}`,
    description: `Task description for ${types[i % types.length].toLowerCase()} work`,
    assignee: `Team Member ${(i % 8) + 1}`,
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    created_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    due_date: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_hours: Math.floor(Math.random() * 20) + 1,
    actual_hours: Math.floor(Math.random() * 25) + 1,
  })).filter(item => {
    if (!filters) return true;
    return Object.entries(filters).every(([key, value]) => 
      item[key as keyof typeof item] === value
    );
  });
};

const generateRiskData = (filters?: Record<string, any>) => {
  const severities = ["critical", "high", "medium", "low"];
  const categories = ["Compliance", "Financial", "Operational", "Strategic", "Legal"];
  const statuses = ["open", "mitigating", "closed", "monitoring"];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `risk-${i + 1}`,
    title: `${categories[i % categories.length]} Risk ${i + 1}`,
    description: `Risk assessment for ${categories[i % categories.length].toLowerCase()} issues`,
    severity: severities[i % severities.length],
    category: categories[i % categories.length],
    status: statuses[i % statuses.length],
    probability: Math.floor(Math.random() * 100) + 1,
    impact: Math.floor(Math.random() * 100) + 1,
    identified_date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
    review_date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    owner: `Risk Manager ${(i % 3) + 1}`,
  })).filter(item => {
    if (!filters) return true;
    return Object.entries(filters).every(([key, value]) => 
      item[key as keyof typeof item] === value
    );
  });
};

const generateComplianceData = (filters?: Record<string, any>) => {
  const frameworks = ["GDPR", "CCPA", "SOX", "HIPAA", "PCI-DSS"];
  const statuses = ["compliant", "non_compliant", "in_progress", "needs_review"];
  const priorities = ["critical", "high", "medium", "low"];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: `compliance-${i + 1}`,
    framework: frameworks[i % frameworks.length],
    requirement: `Requirement ${i + 1}`,
    description: `Compliance requirement for ${frameworks[i % frameworks.length]}`,
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    score: Math.floor(Math.random() * 100) + 1,
    last_assessment: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    next_review: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    owner: `Compliance Officer ${(i % 2) + 1}`,
  })).filter(item => {
    if (!filters) return true;
    return Object.entries(filters).every(([key, value]) => 
      item[key as keyof typeof item] === value
    );
  });
};

// Column definitions for different data types
const getColumnDefinitions = (dataType: string) => {
  switch (dataType) {
    case "contracts":
      return [
        { key: "title", label: "Contract Title", type: "text" as const },
        { key: "counterparty", label: "Counterparty", type: "text" as const },
        { key: "value", label: "Value", type: "currency" as const },
        { key: "status", label: "Status", type: "badge" as const },
        { key: "priority", label: "Priority", type: "badge" as const },
        { key: "created_date", label: "Created", type: "date" as const },
        { key: "expiry_date", label: "Expires", type: "date" as const },
        { key: "owner", label: "Owner", type: "text" as const },
      ];
    
    case "matters":
      return [
        { key: "title", label: "Matter Title", type: "text" as const },
        { key: "client", label: "Client", type: "text" as const },
        { key: "budget", label: "Budget", type: "currency" as const },
        { key: "spent", label: "Spent", type: "currency" as const },
        { key: "status", label: "Status", type: "badge" as const },
        { key: "priority", label: "Priority", type: "badge" as const },
        { key: "opened_date", label: "Opened", type: "date" as const },
        { key: "deadline", label: "Deadline", type: "date" as const },
        { key: "attorney", label: "Attorney", type: "text" as const },
      ];
    
    case "tasks":
      return [
        { key: "title", label: "Task Title", type: "text" as const },
        { key: "assignee", label: "Assignee", type: "text" as const },
        { key: "status", label: "Status", type: "badge" as const },
        { key: "priority", label: "Priority", type: "badge" as const },
        { key: "created_date", label: "Created", type: "date" as const },
        { key: "due_date", label: "Due Date", type: "date" as const },
        { key: "estimated_hours", label: "Est. Hours", type: "number" as const },
        { key: "actual_hours", label: "Actual Hours", type: "number" as const },
      ];
    
    case "risks":
      return [
        { key: "title", label: "Risk Title", type: "text" as const },
        { key: "category", label: "Category", type: "badge" as const },
        { key: "severity", label: "Severity", type: "badge" as const },
        { key: "status", label: "Status", type: "badge" as const },
        { key: "probability", label: "Probability %", type: "number" as const },
        { key: "impact", label: "Impact %", type: "number" as const },
        { key: "identified_date", label: "Identified", type: "date" as const },
        { key: "review_date", label: "Review Date", type: "date" as const },
        { key: "owner", label: "Owner", type: "text" as const },
      ];
    
    case "compliance":
      return [
        { key: "framework", label: "Framework", type: "badge" as const },
        { key: "requirement", label: "Requirement", type: "text" as const },
        { key: "status", label: "Status", type: "badge" as const },
        { key: "priority", label: "Priority", type: "badge" as const },
        { key: "score", label: "Score %", type: "number" as const },
        { key: "last_assessment", label: "Last Assessment", type: "date" as const },
        { key: "next_review", label: "Next Review", type: "date" as const },
        { key: "owner", label: "Owner", type: "text" as const },
      ];
    
    default:
      return [
        { key: "id", label: "ID", type: "text" as const },
        { key: "title", label: "Title", type: "text" as const },
        { key: "status", label: "Status", type: "badge" as const },
      ];
  }
};

export function useDrillDown() {
  const [drillDownData, setDrillDownData] = useState<DrillDownData | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const openDrillDown = useCallback((
    dataType: string,
    title: string,
    module: string,
    filters?: Record<string, any>
  ) => {
    let data: any[] = [];
    
    // Generate data based on type
    switch (dataType) {
      case "contracts":
        data = generateContractData(filters);
        break;
      case "matters":
        data = generateMatterData(filters);
        break;
      case "tasks":
        data = generateTaskData(filters);
        break;
      case "risks":
        data = generateRiskData(filters);
        break;
      case "compliance":
        data = generateComplianceData(filters);
        break;
      default:
        data = [];
    }

    const drillDownInfo: DrillDownData = {
      id: `${dataType}-${Date.now()}`,
      title,
      module,
      filters,
      data,
      columns: getColumnDefinitions(dataType),
    };

    setDrillDownData(drillDownInfo);
    setIsSlideOverOpen(true);
  }, []);

  const closeDrillDown = useCallback(() => {
    setIsSlideOverOpen(false);
    // Keep data for a moment to allow smooth closing animation
    setTimeout(() => setDrillDownData(null), 300);
  }, []);

  return {
    drillDownData,
    isSlideOverOpen,
    openDrillDown,
    closeDrillDown,
  };
} 