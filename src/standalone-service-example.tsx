
// Example: Standalone IP Management Service
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/shared/components';
import { 
  IPManagementDashboard,
  IPDashboardOverview,
  IPAssetRegister,
  LifecycleTracking,
  IPRiskMonitoring,
  CommercializationManagement,
  IPTemplateLibrary
} from '@/services/ip-management';

// Standalone IP Management App
const queryClient = new QueryClient();

export function StandaloneIPManagement() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<IPManagementDashboard />} />
              <Route path="/overview" element={<IPDashboardOverview />} />
              <Route path="/register" element={<IPAssetRegister />} />
              <Route path="/lifecycle" element={<LifecycleTracking />} />
              <Route path="/risk" element={<IPRiskMonitoring />} />
              <Route path="/commercialization" element={<CommercializationManagement />} />
              <Route path="/templates" element={<IPTemplateLibrary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Entry point for standalone deployment
export default StandaloneIPManagement;
