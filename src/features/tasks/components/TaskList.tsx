import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { TaskCard } from './TaskCard';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ApiError } from '@/lib/api-error';
import { useTranslation } from 'react-i18next';

export function TaskList() {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  
  const limit = 10;
  const { data, isPending, isFetching, isError, error, refetch } = useTasks(page, limit);

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
      </div>
    );
  }

  if (isError) {
    return <ErrorState error={error as ApiError} onRetry={() => refetch()} />;
  }

  if (data.data.length === 0) {
    return <EmptyState title={t('tasks.empty')} description={t('tasks.emptyDescription')} />;
  }

  const totalPages = Math.ceil(data.total / data.limit);

  return (
    <div>
      <div className={isFetching ? 'opacity-60 transition-opacity' : ''}>
        <div className="space-y-3">
          {data.data.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          {t('tasks.previous')}
        </Button>
        <span className="text-sm text-slate-500">{t('tasks.page', { page, totalPages })}</span>
        <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          {t('tasks.next')}
        </Button>
      </div>
    </div>
  );
}