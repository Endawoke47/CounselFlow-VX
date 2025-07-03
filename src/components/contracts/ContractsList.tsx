import React from "react";
import { useContracts } from "@/hooks/useContracts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Eye, Edit, Link } from "lucide-react";

export function ContractsList() {
  const { contracts, loading, error } = useContracts();

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="glass tab-fade-in">
        <CardContent className="p-6 text-center text-red-600">
          Error loading contracts: {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contracts</h1>
          <p className="text-muted-foreground">Manage your contract portfolio</p>
        </div>
        <Button className="tab-transition">
          <Plus className="h-4 w-4 mr-2" />
          New Contract
        </Button>
      </div>

      <Card className="glass tab-fade-in">
        <CardHeader>
          <CardTitle>Active Contracts ({contracts.length})</CardTitle>
          <CardDescription>
            Manage and track all contracts across your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contracts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No contracts found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div key={contract.id} className="border rounded-lg p-4 glass tab-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{contract.title}</h3>
                      <p className="text-sm text-muted-foreground">{contract.type}</p>
                      <Badge variant="outline">{contract.status}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {contract.contract_value ? 
                          `${contract.contract_value.toLocaleString()}` : 
                          'No value set'
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {contract.expiration_date ? 
                          `Expires: ${new Date(contract.expiration_date).toLocaleDateString()}` :
                          'No expiration'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
