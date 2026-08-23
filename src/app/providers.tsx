import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useEffect, type ReactNode } from 'react';
import { queryClient } from '@/lib/query-client';
import { applyTheme, getInitialTheme } from '@/config/theme';
import '@/config/i18n';

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => applyTheme(getInitialTheme()), []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}