import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getTask } from '../api/task.api';
import { taskKeys, useUpdateTask } from '../hooks/useTasks';
import { TaskForm } from '../components/TaskForm';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/common/error-state';
import { ApiError } from '@/lib/api-error';

export function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: taskKeys.detail(id!),
    queryFn: () => getTask(id!),
    enabled: !!id,
  });

  const updateTask = useUpdateTask(id!);

  if (isPending) return <Skeleton className="mx-auto mt-6 h-64 max-w-2xl" />;
  if (isError) return <ErrorState error={error as ApiError} onRetry={() => refetch()} />;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Edit Task</h1>
      <TaskForm
        defaultValues={{ title: data.title, description: data.description, dueDate: data.dueDate }}
        isSubmitting={updateTask.isPending}
        onSubmit={(input) => {
          updateTask.mutate(input, {
            onSuccess: () => {
              toast.success('Task updated');
              navigate(`/tasks/${id}`);
            },
            onError: () => toast.error('Failed to update task'),
          });
        }}
      />
    </div>
  );
}