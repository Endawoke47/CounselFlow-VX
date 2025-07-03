import { useEffect, useState } from "react";
import { ApiServiceFactory } from "@/services/api";
import { Database } from "@/types/database";

export type Deal = Database["public"]["Tables"]["deals"]["Row"];

export function useDealflow() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeals() {
      setLoading(true);
      setError(null);
      try {
        const data = await ApiServiceFactory.getDealflowService().getDeals();
        setDeals(data || []);
      } catch (e) {
        setError("Failed to load deals");
        setDeals([]);
      }
      setLoading(false);
    }
    fetchDeals();
  }, []);

  return { deals, loading, error };
}
