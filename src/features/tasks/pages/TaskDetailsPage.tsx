import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTask } from '../api/task.api';
import { taskKeys } from '../hooks/useTasks';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/common/error-state';
import { Button } from '@/components/ui/button';
import { ApiError } from '@/lib/api-error';

export function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: taskKeys.detail(id!),
    queryFn: () => getTask(id!),
    enabled: !!id,
  });

  if (isPending) return <Skeleton className="mx-auto mt-6 h-40 max-w-2xl" />;
  if (isError) return <ErrorState error={error as ApiError} onRetry={() => refetch()} />;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Link to="/" className="text-sm text-slate-500 hover:underline">← Back to tasks</Link>
      <h1 className="mt-2 text-xl font-semibold">{data.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{data.description}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <dt className="text-slate-500">Status</dt><dd>{data.status}</dd>
        <dt className="text-slate-500">Priority</dt><dd>{data.priority}</dd>
        <dt className="text-slate-500">Due</dt><dd>{data.dueDate ?? '—'}</dd>
        <dt className="text-slate-500">Created</dt><dd>{data.createdAt}</dd>
      </dl>
      <div className="mt-6 flex gap-2">
        <Button asChild variant="outline"><Link to={`/tasks/${id}/edit`}>Edit</Link></Button>
      </div>
    </div>
  );
}