// Relationship service for managing connections between legal modules

export interface RelationshipData {
  id: string;
  type: string;
  title: string;
  module: string;
  status?: string;
  priority?: string;
  date?: string;
  owner?: string;
  value?: string;
  description?: string;
}

export interface RelatedItem {
  id: string;
  type: 'contract' | 'matter' | 'task' | 'risk' | 'dispute' | 'compliance' | 'template' | 'entity' | 'vendor' | 'document';
  title: string;
  status: string;
  module: string;
  relationshipType: 'primary' | 'related' | 'dependent' | 'referenced';
  createdAt: string;
  updatedAt: string;
}

// Mock data with relationships
export const mockRelationships = {
  // Contract relationships
  contracts: {
    'contract-001': {
      id: 'contract-001',
      title: 'Software License Agreement - Microsoft',
      type: 'software_license',
      entityId: 'entity-001',
      templateId: 'template-001',
      status: 'active',
      value: '$50,000',
      relatedItems: [
        {
          id: 'matter-001',
          type: 'matter' as const,
          title: 'Contract Review - Microsoft License',
          status: 'completed',
          module: 'Matter Management',
          relationshipType: 'primary' as const,
          createdAt: '2024-01-10',
          updatedAt: '2024-01-15'
        },
        {
          id: 'task-001',
          type: 'task' as const,
          title: 'Review renewal terms',
          status: 'in_progress',
          module: 'Task Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-20',
          updatedAt: '2024-01-22'
        },
        {
          id: 'risk-001',
          type: 'risk' as const,
          title: 'Vendor dependency risk',
          status: 'open',
          module: 'Risk Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-12',
          updatedAt: '2024-01-18'
        },
        {
          id: 'compliance-001',
          type: 'compliance' as const,
          title: 'Data processing compliance check',
          status: 'compliant',
          module: 'Data Protection',
          relationshipType: 'dependent' as const,
          createdAt: '2024-01-08',
          updatedAt: '2024-01-16'
        },
        {
          id: 'template-001',
          type: 'template' as const,
          title: 'Software License Template v2.1',
          status: 'active',
          module: 'Knowledge Management',
          relationshipType: 'referenced' as const,
          createdAt: '2023-12-01',
          updatedAt: '2024-01-05'
        }
      ]
    },
    'contract-002': {
      id: 'contract-002',
      title: 'Employment Contract - John Doe',
      type: 'employment',
      entityId: 'entity-001',
      templateId: 'template-002',
      status: 'active',
      value: '$80,000',
      relatedItems: [
        {
          id: 'matter-002',
          type: 'matter' as const,
          title: 'Employment Law Review',
          status: 'in_progress',
          module: 'Matter Management',
          relationshipType: 'primary' as const,
          createdAt: '2024-01-15',
          updatedAt: '2024-01-20'
        },
        {
          id: 'task-002',
          type: 'task' as const,
          title: 'Update employment policies',
          status: 'pending',
          module: 'Task Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-18',
          updatedAt: '2024-01-18'
        },
        {
          id: 'compliance-002',
          type: 'compliance' as const,
          title: 'Employment law compliance',
          status: 'in_progress',
          module: 'Data Protection',
          relationshipType: 'dependent' as const,
          createdAt: '2024-01-10',
          updatedAt: '2024-01-19'
        }
      ]
    }
  },

  // Matter relationships
  matters: {
    'matter-001': {
      id: 'matter-001',
      title: 'Contract Review - Microsoft License',
      type: 'contract_review',
      entityId: 'entity-001',
      status: 'completed',
      priority: 'high',
      relatedItems: [
        {
          id: 'contract-001',
          type: 'contract' as const,
          title: 'Software License Agreement - Microsoft',
          status: 'active',
          module: 'Contract Management',
          relationshipType: 'primary' as const,
          createdAt: '2024-01-05',
          updatedAt: '2024-01-15'
        },
        {
          id: 'task-001',
          type: 'task' as const,
          title: 'Review renewal terms',
          status: 'in_progress',
          module: 'Task Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-20',
          updatedAt: '2024-01-22'
        },
        {
          id: 'vendor-001',
          type: 'vendor' as const,
          title: 'External Legal Counsel - Smith & Associates',
          status: 'active',
          module: 'Outsourced Matters',
          relationshipType: 'related' as const,
          createdAt: '2024-01-10',
          updatedAt: '2024-01-15'
        }
      ]
    },
    'matter-002': {
      id: 'matter-002',
      title: 'IP Infringement Dispute',
      type: 'litigation',
      entityId: 'entity-001',
      status: 'in_progress',
      priority: 'critical',
      relatedItems: [
        {
          id: 'dispute-001',
          type: 'dispute' as const,
          title: 'Patent Infringement Claim',
          status: 'escalated',
          module: 'Dispute Resolution',
          relationshipType: 'primary' as const,
          createdAt: '2024-01-05',
          updatedAt: '2024-01-20'
        },
        {
          id: 'risk-002',
          type: 'risk' as const,
          title: 'IP litigation exposure',
          status: 'open',
          module: 'Risk Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-06',
          updatedAt: '2024-01-18'
        },
        {
          id: 'task-003',
          type: 'task' as const,
          title: 'Prepare defense strategy',
          status: 'in_progress',
          module: 'Task Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-08',
          updatedAt: '2024-01-20'
        }
      ]
    }
  },

  // Task relationships
  tasks: {
    'task-001': {
      id: 'task-001',
      title: 'Review renewal terms',
      type: 'review',
      module: 'contracts',
      status: 'in_progress',
      priority: 'high',
      relatedItems: [
        {
          id: 'contract-001',
          type: 'contract' as const,
          title: 'Software License Agreement - Microsoft',
          status: 'active',
          module: 'Contract Management',
          relationshipType: 'primary' as const,
          createdAt: '2024-01-05',
          updatedAt: '2024-01-15'
        },
        {
          id: 'matter-001',
          type: 'matter' as const,
          title: 'Contract Review - Microsoft License',
          status: 'completed',
          module: 'Matter Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-10',
          updatedAt: '2024-01-15'
        }
      ]
    },
    'task-002': {
      id: 'task-002',
      title: 'GDPR compliance audit',
      type: 'compliance_check',
      module: 'compliance',
      status: 'pending',
      priority: 'medium',
      relatedItems: [
        {
          id: 'compliance-001',
          type: 'compliance' as const,
          title: 'GDPR Data Processing Review',
          status: 'in_progress',
          module: 'Data Protection',
          relationshipType: 'primary' as const,
          createdAt: '2024-01-08',
          updatedAt: '2024-01-16'
        },
        {
          id: 'risk-003',
          type: 'risk' as const,
          title: 'GDPR non-compliance risk',
          status: 'open',
          module: 'Risk Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-09',
          updatedAt: '2024-01-17'
        }
      ]
    }
  },

  // Risk relationships
  risks: {
    'risk-001': {
      id: 'risk-001',
      title: 'Vendor dependency risk',
      category: 'operational',
      riskLevel: 'medium',
      status: 'open',
      relatedItems: [
        {
          id: 'contract-001',
          type: 'contract' as const,
          title: 'Software License Agreement - Microsoft',
          status: 'active',
          module: 'Contract Management',
          relationshipType: 'primary' as const,
          createdAt: '2024-01-05',
          updatedAt: '2024-01-15'
        },
        {
          id: 'task-004',
          type: 'task' as const,
          title: 'Evaluate alternative vendors',
          status: 'not_started',
          module: 'Task Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-18',
          updatedAt: '2024-01-18'
        }
      ]
    },
    'risk-002': {
      id: 'risk-002',
      title: 'IP litigation exposure',
      category: 'legal',
      riskLevel: 'critical',
      status: 'open',
      relatedItems: [
        {
          id: 'dispute-001',
          type: 'dispute' as const,
          title: 'Patent Infringement Claim',
          status: 'escalated',
          module: 'Dispute Resolution',
          relationshipType: 'primary' as const,
          createdAt: '2024-01-05',
          updatedAt: '2024-01-20'
        },
        {
          id: 'matter-002',
          type: 'matter' as const,
          title: 'IP Infringement Dispute',
          status: 'in_progress',
          module: 'Matter Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-06',
          updatedAt: '2024-01-20'
        }
      ]
    }
  },

  // Dispute relationships
  disputes: {
    'dispute-001': {
      id: 'dispute-001',
      title: 'Patent Infringement Claim',
      type: 'ip_infringement',
      entityId: 'entity-001',
      status: 'escalated',
      priority: 'critical',
      relatedItems: [
        {
          id: 'matter-002',
          type: 'matter' as const,
          title: 'IP Infringement Dispute',
          status: 'in_progress',
          module: 'Matter Management',
          relationshipType: 'primary' as const,
          createdAt: '2024-01-06',
          updatedAt: '2024-01-20'
        },
        {
          id: 'risk-002',
          type: 'risk' as const,
          title: 'IP litigation exposure',
          status: 'open',
          module: 'Risk Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-06',
          updatedAt: '2024-01-18'
        },
        {
          id: 'task-003',
          type: 'task' as const,
          title: 'Prepare defense strategy',
          status: 'in_progress',
          module: 'Task Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-08',
          updatedAt: '2024-01-20'
        }
      ]
    }
  },

  // Compliance relationships
  compliance: {
    'compliance-001': {
      id: 'compliance-001',
      title: 'GDPR Data Processing Review',
      framework: 'gdpr',
      status: 'in_progress',
      priority: 'high',
      relatedItems: [
        {
          id: 'contract-001',
          type: 'contract' as const,
          title: 'Software License Agreement - Microsoft',
          status: 'active',
          module: 'Contract Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-05',
          updatedAt: '2024-01-15'
        },
        {
          id: 'task-002',
          type: 'task' as const,
          title: 'GDPR compliance audit',
          status: 'pending',
          module: 'Task Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-12',
          updatedAt: '2024-01-18'
        },
        {
          id: 'risk-003',
          type: 'risk' as const,
          title: 'GDPR non-compliance risk',
          status: 'open',
          module: 'Risk Management',
          relationshipType: 'related' as const,
          createdAt: '2024-01-09',
          updatedAt: '2024-01-17'
        }
      ]
    }
  },

  // Template relationships
  templates: {
    'template-001': {
      id: 'template-001',
      title: 'Software License Template v2.1',
      type: 'software_license',
      status: 'active',
      relatedItems: [
        {
          id: 'contract-001',
          type: 'contract' as const,
          title: 'Software License Agreement - Microsoft',
          status: 'active',
          module: 'Contract Management',
          relationshipType: 'referenced' as const,
          createdAt: '2024-01-05',
          updatedAt: '2024-01-15'
        },
        {
          id: 'contract-003',
          type: 'contract' as const,
          title: 'Software License Agreement - Adobe',
          status: 'draft',
          module: 'Contract Management',
          relationshipType: 'referenced' as const,
          createdAt: '2024-01-18',
          updatedAt: '2024-01-20'
        }
      ]
    }
  }
};

// Service functions
export class RelationshipService {
  static getRelatedItems(itemId: string, itemType: string): RelatedItem[] {
    const moduleData = mockRelationships[itemType as keyof typeof mockRelationships];
    if (!moduleData) return [];
    
    const item = moduleData[itemId as keyof typeof moduleData];
    return item?.relatedItems || [];
  }

  static addRelationship(
    sourceId: string, 
    sourceType: string, 
    targetId: string, 
    targetType: string, 
    relationshipType: 'primary' | 'related' | 'dependent' | 'referenced'
  ): boolean {
    // In a real implementation, this would update the database
    console.log(`Adding relationship: ${sourceType}:${sourceId} -> ${targetType}:${targetId} (${relationshipType})`);
    return true;
  }

  static removeRelationship(sourceId: string, sourceType: string, targetId: string): boolean {
    // In a real implementation, this would update the database
    console.log(`Removing relationship: ${sourceType}:${sourceId} -> ${targetId}`);
    return true;
  }

  static getRelationshipsByType(itemId: string, itemType: string, relationType: string): RelatedItem[] {
    const allRelated = this.getRelatedItems(itemId, itemType);
    return allRelated.filter(item => item.type === relationType);
  }

  static getRelationshipsByModule(itemId: string, itemType: string, module: string): RelatedItem[] {
    const allRelated = this.getRelatedItems(itemId, itemType);
    return allRelated.filter(item => item.module === module);
  }

  static searchRelatedItems(itemId: string, itemType: string, searchTerm: string): RelatedItem[] {
    const allRelated = this.getRelatedItems(itemId, itemType);
    return allRelated.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.module.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  static getRelationshipSummary(itemId: string, itemType: string) {
    const relatedItems = this.getRelatedItems(itemId, itemType);
    
    const summary = {
      total: relatedItems.length,
      byType: {} as Record<string, number>,
      byModule: {} as Record<string, number>,
      byStatus: {} as Record<string, number>,
      byRelationshipType: {} as Record<string, number>
    };

    relatedItems.forEach(item => {
      // Count by type
      summary.byType[item.type] = (summary.byType[item.type] || 0) + 1;
      
      // Count by module
      summary.byModule[item.module] = (summary.byModule[item.module] || 0) + 1;
      
      // Count by status
      summary.byStatus[item.status] = (summary.byStatus[item.status] || 0) + 1;
      
      // Count by relationship type
      summary.byRelationshipType[item.relationshipType] = (summary.byRelationshipType[item.relationshipType] || 0) + 1;
    });

    return summary;
  }
}