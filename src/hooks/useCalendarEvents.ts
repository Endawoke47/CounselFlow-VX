import { useEffect, useState } from 'react';
import { ApiServiceFactory } from '@/services/api/index';
import type { Database } from '@/types/database';

export function useCalendarEvents(startDate: string, endDate: string) {
  const [events, setEvents] = useState<Database['public']['Tables']['calendar_events']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ApiServiceFactory.getCalendarEventService()
      .getCalendarEvents(startDate, endDate)
      .then((data) => {
        if (isMounted) {
          setEvents(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load calendar events');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [startDate, endDate]);

  return { events, loading, error };
}
