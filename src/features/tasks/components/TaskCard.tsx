import { Link } from "react-router-dom";
import { useCompleteTask, useDeleteTask } from "../hooks/useTasks";
import { Task } from "../schemas/task.schema";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// src/features/tasks/components/TaskCard.tsx — restructured
export function TaskCard({ task }: { task: Task }) {
  const { t } = useTranslation();
  const deleteTask = useDeleteTask();
  const completeTask = useCompleteTask();

  return (
    <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
      <Link to={`/tasks/${task.id}`} className="block hover:underline">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{task.title}</h3>
          <span className="text-xs uppercase text-slate-500">{task.status}</span>
        </div>
        {task.description && (
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{task.description}</p>
        )}
      </Link>

      <div className="mt-3 flex gap-2">
        {/* buttons now siblings of Link, not nested inside it — unchanged from Step 12 otherwise */}
        {task.status === 'pending' && (
          <Button size="sm" variant="outline" disabled={completeTask.isPending}
            onClick={() => completeTask.mutate(task.id, {
              onSuccess: () => toast.success(t('tasks.completed')),
              onError: () => toast.error(t('tasks.failedComplete')),
            })}>
            {completeTask.isPending ? t('tasks.completing') : t('tasks.complete')}
          </Button>
        )}
        <Button size="sm" variant="destructive" disabled={deleteTask.isPending}
          onClick={() => {
            if (confirm(t('tasks.confirmDelete'))) {
              deleteTask.mutate(task.id, {
                onSuccess: () => toast.success(t('tasks.deleted')),
                onError: () => toast.error(t('tasks.failedDelete')),
              });
            }
          }}>
          {deleteTask.isPending ? t('tasks.deleting') : t('tasks.delete')}
        </Button>
      </div>
    </div>
  );
}