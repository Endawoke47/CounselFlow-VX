import { useEffect, useState } from 'react';
import { ApiServiceFactory } from '@/services/api/index';
import type { Database } from '@/types/database';

export function useIPAssets() {
  const [assets, setAssets] = useState<Database['public']['Tables']['ip_assets']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ApiServiceFactory.getIPAssetService()
      .getIPAssets()
      .then((data) => {
        if (isMounted) {
          setAssets(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load IP assets');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { assets, loading, error };
}
