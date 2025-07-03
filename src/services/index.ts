
// Microservices Registry
import { ipManagementConfig } from "./ip-management";
import { matterManagementConfig } from "./matter-management";
import { dataProtectionConfig } from "./data-protection";
import { disputeResolutionConfig } from "./dispute-resolution";
import { dealflowConfig } from "./dealflow";
import { outsourcedMattersConfig } from "./outsourced-matters-spend";
import { userAccessConfig } from "./user-access-management";

export interface ServiceConfig {
  serviceName: string;
  version: string;
  routes: Array<{
    path: string;
    component: string;
  }>;
  permissions: string[];
  database: {
    schema: string;
    tables: string[];
  };
}

export const serviceRegistry: Record<string, ServiceConfig> = {
  "ip-management": ipManagementConfig,
  "matter-management": matterManagementConfig,
  "data-protection": dataProtectionConfig,
  "dispute-resolution": disputeResolutionConfig,
  "dealflow": dealflowConfig,
  "outsourced-matters-spend": outsourcedMattersConfig,
  "user-access-management": userAccessConfig,
};

export const getServiceConfig = (serviceName: string): ServiceConfig | undefined => {
  return serviceRegistry[serviceName];
};

export const getAllServices = (): ServiceConfig[] => {
  return Object.values(serviceRegistry);
};

// Export individual service configs
export {
  ipManagementConfig,
  matterManagementConfig,
  dataProtectionConfig,
  disputeResolutionConfig,
  dealflowConfig,
  outsourcedMattersConfig,
  userAccessConfig,
};
