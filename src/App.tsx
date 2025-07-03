import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import Index from "./pages/Index";
import Contracts from "./pages/Contracts";
import ContractsNew from "./pages/ContractsNew";
import EntityManagement from "./pages/EntityManagement";
import TaskManagement from "./pages/TaskManagement";
import KnowledgeManagement from "./pages/KnowledgeManagement";
import MatterManagement from "./pages/MatterManagement";
import RiskManagement from "./pages/RiskManagement";
import RiskDashboard from "./pages/RiskDashboard";
import DisputeResolution from "./pages/DisputeResolution";
import OutsourcedMattersSpend from "./pages/OutsourcedMattersSpend";
import ComplianceManagement from "./pages/ComplianceManagement";
import PolicyManagement from "./pages/PolicyManagement";
import UserAccessManagement from "./pages/UserAccessManagement";
import IPManagement from "./pages/IPManagement";
import DataProtection from "./pages/DataProtection";
import LicensingRegulatory from "./pages/LicensingRegulatory";
import Dealflow from "./pages/Dealflow";
import CompanySecretarial from "./pages/CompanySecretarial";
import NotFound from "./pages/NotFound";

// Enhanced module imports
import ContractsEnhanced from "./pages/ContractsEnhanced";
import EntityManagementEnhanced from "./pages/EntityManagementEnhanced";
import TaskManagementEnhanced from "./pages/TaskManagementEnhanced";
import KnowledgeManagementEnhanced from "./pages/KnowledgeManagementEnhanced";
import MatterManagementEnhanced from "./pages/MatterManagementEnhanced";
// import RiskManagementEnhanced from "./pages/RiskManagementEnhanced"; // Temporarily disabled due to syntax errors
import DisputeResolutionEnhanced from "./pages/DisputeResolutionEnhanced";
import OutsourcedMattersSpendEnhanced from "./pages/OutsourcedMattersSpendEnhanced";
import RegulatoryComplianceEnhanced from "./pages/RegulatoryComplianceEnhanced";
import PolicyManagementEnhanced from "./pages/PolicyManagementEnhanced";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SidebarProvider>
      <LanguageProvider>
        <ThemeProvider>
          <div className="min-h-screen w-full bg-slate-50 overflow-x-hidden">
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/contracts-new" element={<ContractsNew />} />
              <Route path="/entity-management" element={<EntityManagement />} />
              <Route path="/task-management" element={<TaskManagement />} />
              <Route path="/knowledge-management" element={<KnowledgeManagement />} />
              <Route path="/matters" element={<MatterManagement />} />
              <Route path="/risk-management" element={<RiskManagement />} />
              <Route path="/risk-dashboard" element={<RiskDashboard />} />
              <Route path="/dispute-resolution" element={<DisputeResolution />} />
              <Route path="/outsourced-matters-spend" element={<OutsourcedMattersSpend />} />
              <Route path="/compliance" element={<ComplianceManagement />} />
              <Route path="/policy-management" element={<PolicyManagement />} />
              <Route path="/user-access-management" element={<UserAccessManagement />} />
              <Route path="/ip-management" element={<IPManagement />} />
              <Route path="/data-protection" element={<DataProtection />} />
              <Route path="/licensing-regulatory" element={<LicensingRegulatory />} />
              <Route path="/dealflow" element={<Dealflow />} />
              <Route path="/company-secretarial" element={<CompanySecretarial />} />
              
              {/* Enhanced routes */}
              <Route path="/contracts-enhanced" element={<ContractsEnhanced />} />
              <Route path="/entity-management-enhanced" element={<EntityManagementEnhanced />} />
              <Route path="/task-management-enhanced" element={<TaskManagementEnhanced />} />
              <Route path="/knowledge-management-enhanced" element={<KnowledgeManagementEnhanced />} />
              <Route path="/matter-management-enhanced" element={<MatterManagementEnhanced />} />
              {/* <Route path="/risk-management-enhanced" element={<RiskManagementEnhanced />} /> */}
              <Route path="/dispute-resolution-enhanced" element={<DisputeResolutionEnhanced />} />
              <Route path="/outsourced-matters-spend-enhanced" element={<OutsourcedMattersSpendEnhanced />} />
              <Route path="/regulatory-compliance-enhanced" element={<RegulatoryComplianceEnhanced />} />
              <Route path="/policy-management-enhanced" element={<PolicyManagementEnhanced />} />
              
              {/* Legacy redirects */}
              <Route path="/disputes" element={<Navigate to="/dispute-resolution" replace />} />
              <Route path="/policies" element={<Navigate to="/policy-management" replace />} />
              <Route path="/knowledge" element={<Navigate to="/knowledge-management" replace />} />
              <Route path="/legal-spend" element={<Navigate to="/outsourced-matters-spend" replace />} />
              <Route path="/spend" element={<Navigate to="/outsourced-matters-spend" replace />} />
              <Route path="/risk" element={<Navigate to="/risk-management" replace />} />
              <Route path="/tasks" element={<Navigate to="/task-management" replace />} />
              <Route path="/compliance-management" element={<Navigate to="/compliance" replace />} />
              <Route path="/users" element={<Navigate to="/user-access-management" replace />} />
              <Route path="/ip" element={<Navigate to="/ip-management" replace />} />
              <Route path="/data" element={<Navigate to="/data-protection" replace />} />
              <Route path="/licensing" element={<Navigate to="/licensing-regulatory" replace />} />
              <Route path="/deals" element={<Navigate to="/dealflow" replace />} />
              <Route path="/company" element={<Navigate to="/company-secretarial" replace />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </div>
    </ThemeProvider>
    </LanguageProvider>
    </SidebarProvider>
  </QueryClientProvider>
);

export default App;
