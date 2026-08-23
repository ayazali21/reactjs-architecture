import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { TaskForm } from '../components/TaskForm';
import { useCreateTask } from '../hooks/useTasks';

export function CreateTaskPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateTask();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Create Task</h1>
      <TaskForm
        isSubmitting={isPending}
        onSubmit={(data) => {
          mutate(data, {
            onSuccess: () => {
              toast.success('Task created');
              navigate('/');
            },
            onError: (err) => {
              toast.error(err instanceof Error ? err.message : 'Failed to create task');
            },
          });
        }}
      />
    </div>
  );
}