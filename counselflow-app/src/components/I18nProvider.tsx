'use client';

import { useEffect } from 'react';
import '@/lib/i18n'; // Initialize i18n

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Any additional i18n setup can go here
  }, []);

  return <>{children}</>;
}
