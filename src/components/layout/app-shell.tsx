import type { ReactNode } from 'react';
import { Header } from './header';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main>{children}</main>
    </div>
  );
}