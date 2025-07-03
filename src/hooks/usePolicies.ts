import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export function usePolicies() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('policies').select('*');
      if (error) {
        setError('Failed to load policies.');
        setPolicies([]);
      } else {
        setPolicies(data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch policies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return { policies, loading, error, refresh: fetchPolicies };
}
