
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractsOverview } from "./ContractsOverview";
import { ContractsList } from "./ContractsList";
import { AlertManagement } from "./AlertManagement";
import { TaskManagement } from "./TaskManagement";
import { NotificationsCenter } from "./NotificationsCenter";
import { AddContractModal } from "./AddContractModal";
import { ContractDetailModal } from "./ContractDetailModal";
import { ContractForm } from "./ContractForm";

export function ContractsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showContractForm, setShowContractForm] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [contracts, setContracts] = useState([
    {
      id: 1,
      title: "Software License Agreement",
      entity: "Acme Corp Ltd",
      status: "Active",
      renewalDate: "2024-12-15",
      owner: "Sarah Johnson",
      value: "$50,000",
      type: "Software",
      counterparty: "Microsoft Corporation",
      description: "Enterprise software licensing agreement for Office 365 suite"
    },
    {
      id: 2,
      title: "Master Service Agreement",
      entity: "Global Holdings Inc",
      status: "Expiring",
      renewalDate: "2024-07-20",
      owner: "Mike Chen",
      value: "$125,000",
      type: "Service",
      counterparty: "Consulting Partners LLC",
      description: "Professional services agreement for business consulting"
    },
    {
      id: 3,
      title: "Property Lease",
      entity: "Regional Office LLC",
      status: "Active",
      renewalDate: "2025-03-01",
      owner: "Lisa Wong",
      value: "$200,000",
      type: "Real Estate",
      counterparty: "Prime Properties Inc",
      description: "Commercial office space lease agreement"
    },
    {
      id: 4,
      title: "Vendor Agreement",
      entity: "Tech Subsidiary Co",
      status: "Under Review",
      renewalDate: "2024-09-10",
      owner: "David Kim",
      value: "$75,000",
      type: "Vendor",
      counterparty: "Supply Chain Solutions",
      description: "Vendor agreement for IT equipment and supplies"
    },
    {
      id: 5,
      title: "Employment Contract",
      entity: "Acme Corp Ltd",
      status: "Active",
      renewalDate: "2024-12-31",
      owner: "HR Team",
      value: "$80,000",
      type: "Employment",
      counterparty: "John Doe",
      description: "Senior developer employment contract"
    }
  ]);

  const handleAddContract = (newContract: any) => {
    setContracts([...contracts, newContract]);
    console.log("New contract added:", newContract);
  };

  const handleViewContract = (contract: any) => {
    setSelectedContract(contract);
    setShowDetailModal(true);
  };

  const handleEditContract = (contract: any) => {
    setSelectedContract(contract);
    setShowContractForm(true);
  };

  const handleSaveContract = (updatedContract: any) => {
    if (selectedContract) {
      // Update existing contract
      setContracts(contracts.map(c => c.id === updatedContract.id ? updatedContract : c));
    } else {
      // Add new contract
      setContracts([...contracts, updatedContract]);
    }
    setShowContractForm(false);
    setSelectedContract(null);
    console.log("Contract saved:", updatedContract);
  };

  if (showContractForm) {
    return (
      <div className="space-y-6">
        <ContractForm
          initialData={selectedContract}
          onSave={handleSaveContract}
          onCancel={() => {
            setShowContractForm(false);
            setSelectedContract(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contract Lifecycle Management</h1>
          <p className="text-muted-foreground">
            Manage contracts, renewals, and compliance across your organization
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddModal(true)}>
            Add New Contract
          </Button>
          <Button variant="outline" onClick={() => setShowContractForm(true)}>
            Create Contract Form
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Dashboard</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ContractsOverview />
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <ContractsList 
            contracts={contracts}
            onViewContract={handleViewContract}
            onEditContract={handleEditContract}
          />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <AlertManagement />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <TaskManagement />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationsCenter />
        </TabsContent>
      </Tabs>

      <AddContractModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddContract}
      />

      <ContractDetailModal
        contract={selectedContract}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedContract(null);
        }}
      />
    </div>
  );
}
