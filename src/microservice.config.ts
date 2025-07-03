
// Microservice Configuration
export interface MicroserviceConfig {
  name: string;
  port?: number;
  basePath: string;
  database: {
    schema: string;
    connectionString?: string;
  };
  auth: {
    enabled: boolean;
    provider: "supabase" | "auth0" | "custom";
    redirectUrl?: string;
  };
  cors: {
    origins: string[];
  };
  features: string[];
}

export const microserviceConfigs: Record<string, MicroserviceConfig> = {
  "ip-management": {
    name: "IP Management Service",
    port: 3001,
    basePath: "/api/v1/ip",
    database: {
      schema: "ip_management",
      connectionString: process.env.IP_DB_CONNECTION || ""
    },
    auth: {
      enabled: true,
      provider: "supabase",
      redirectUrl: "/ip-management"
    },
    cors: {
      origins: ["https://app.example.com", "http://localhost:3000"]
    },
    features: ["patents", "trademarks", "licensing", "renewals", "risk-monitoring"]
  },
  
  "matter-management": {
    name: "Matter Management Service",
    port: 3002,
    basePath: "/api/v1/matters",
    database: {
      schema: "matter_management",
      connectionString: process.env.MATTER_DB_CONNECTION || ""
    },
    auth: {
      enabled: true,
      provider: "supabase",
      redirectUrl: "/matters"
    },
    cors: {
      origins: ["https://app.example.com", "http://localhost:3000"]
    },
    features: ["case-tracking", "assignments", "time-tracking", "advice-library"]
  },

  "data-protection": {
    name: "Data Protection Service",
    port: 3003,
    basePath: "/api/v1/data-protection",
    database: {
      schema: "data_protection",
      connectionString: process.env.DP_DB_CONNECTION || ""
    },
    auth: {
      enabled: true,
      provider: "supabase",
      redirectUrl: "/data-protection"
    },
    cors: {
      origins: ["https://app.example.com", "http://localhost:3000"]
    },
    features: ["gdpr-compliance", "ropa", "breach-management", "dsr-workflow"]
  },

  "dispute-resolution": {
    name: "Dispute Resolution Service",
    port: 3004,
    basePath: "/api/v1/disputes",
    database: {
      schema: "dispute_resolution",
      connectionString: process.env.DISPUTE_DB_CONNECTION || ""
    },
    auth: {
      enabled: true,
      provider: "supabase",
      redirectUrl: "/dispute-resolution"
    },
    cors: {
      origins: ["https://app.example.com", "http://localhost:3000"]
    },
    features: ["case-management", "settlement-tracking", "legal-teams"]
  },

  "dealflow": {
    name: "Private Equity Dealflow Service",
    port: 3005,
    basePath: "/api/v1/dealflow",
    database: {
      schema: "dealflow",
      connectionString: process.env.DEALFLOW_DB_CONNECTION || ""
    },
    auth: {
      enabled: true,
      provider: "supabase",
      redirectUrl: "/dealflow"
    },
    cors: {
      origins: ["https://app.example.com", "http://localhost:3000"]
    },
    features: ["pipeline-tracking", "due-diligence", "document-management", "risk-analysis"]
  },

  "outsourced-spend": {
    name: "Outsourced Matters & Spend Service",
    port: 3006,
    basePath: "/api/v1/spend",
    database: {
      schema: "outsourced_spend",
      connectionString: process.env.SPEND_DB_CONNECTION || ""
    },
    auth: {
      enabled: true,
      provider: "supabase",
      redirectUrl: "/outsourced-matters-spend"
    },
    cors: {
      origins: ["https://app.example.com", "http://localhost:3000"]
    },
    features: ["vendor-management", "spend-tracking", "performance-evaluation", "budget-management"]
  },

  "user-access": {
    name: "User & Access Management Service",
    port: 3007,
    basePath: "/api/v1/users",
    database: {
      schema: "user_access",
      connectionString: process.env.USER_DB_CONNECTION || ""
    },
    auth: {
      enabled: true,
      provider: "supabase",
      redirectUrl: "/user-access-management"
    },
    cors: {
      origins: ["https://app.example.com", "http://localhost:3000"]
    },
    features: ["user-directory", "role-management", "access-control", "audit-logging"]
  }
};

export const getMicroserviceConfig = (serviceName: string): MicroserviceConfig | undefined => {
  return microserviceConfigs[serviceName];
};
