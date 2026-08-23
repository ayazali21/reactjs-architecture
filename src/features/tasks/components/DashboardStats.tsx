import { useTaskStats } from '../hooks/useTaskStats';
import { Skeleton } from '@/components/ui/skeleton';

const STAT_CONFIG = [
  { key: 'total', label: 'Total' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
  { key: 'overdue', label: 'Overdue' },
] as const;

export function DashboardStats() {
  const { stats, isPending, isError } = useTaskStats();

  if (isPending) {
    return (
      <div className="grid grid-cols-4 gap-3">
        {STAT_CONFIG.map((s) => <Skeleton key={s.key} className="h-20" />)}
      </div>
    );
  }

  if (isError || !stats) return null; // TaskList below already surfaces the error, don't duplicate it

  return (
    <div className="grid grid-cols-4 gap-3">
      {STAT_CONFIG.map(({ key, label }) => (
        <div key={key} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
          <p className="text-2xl font-semibold">{stats[key]}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  );
}