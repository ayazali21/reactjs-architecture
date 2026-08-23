import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import type { Task } from '../schemas/task.schema';
import { useDeleteTask, useCompleteTask } from '../hooks/useTasks';
import { Button } from '@/components/ui/button';

export function TaskCard({ task }: { task: Task }) {
  const deleteTask = useDeleteTask();
  const completeTask = useCompleteTask();

  return (
    <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
      <Link to={`/tasks/${task.id}`} className="block">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{task.title}</h3>
          <span className="text-xs uppercase text-slate-500">{task.status}</span>
        </div>
        {task.description && (
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{task.description}</p>
        )}
      </Link>

      <div className="mt-3 flex gap-2">
        {task.status === 'pending' && (
          <Button
            size="sm"
            variant="outline"
            disabled={completeTask.isPending}
            onClick={() => completeTask.mutate(task.id, {
              onSuccess: () => toast.success('Task completed'),
              onError: () => toast.error('Failed to complete task'),
            })}
          >
            {completeTask.isPending ? 'Completing...' : 'Complete'}
          </Button>
        )}
        <Button
          size="sm"
          variant="destructive"
          disabled={deleteTask.isPending}
          onClick={() => {
            if (confirm('Delete this task?')) {
              deleteTask.mutate(task.id, {
                onSuccess: () => toast.success('Task deleted'),
                onError: () => toast.error('Failed to delete task'),
              });
            }
          }}
        >
          {deleteTask.isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  );
}