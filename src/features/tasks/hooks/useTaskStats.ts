import { useMemo } from 'react';
import { useAllTasksForStats } from './useTasks';

export function useTaskStats() {
  const { data, isPending, isError } = useAllTasksForStats();

  const stats = useMemo(() => {
    if (!data) return null;

    const now = Date.now();
    return {
      total: data.total,
      pending: data.data.filter((t) => t.status === 'pending').length,
      completed: data.data.filter((t) => t.status === 'completed').length,
      overdue: data.data.filter(
        (t) => t.status === 'pending' && t.dueDate !== null && new Date(t.dueDate).getTime() < now,
      ).length,
    };
  }, [data]);

  return { stats, isPending, isError };
}