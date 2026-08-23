import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema, type CreateTaskInput } from '../schemas/task.schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function TaskForm({
  onSubmit,
  isSubmitting,
  defaultValues
}: {
  onSubmit: (data: CreateTaskInput) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<CreateTaskInput>;
}) {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: '', description: '', dueDate: null, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">Title</label>
        <Input id="title" {...register('title')} />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">Description</label>
        <Textarea id="description" {...register('description')} />
      </div>

      <div>
        <label htmlFor="priority" className="mb-1 block text-sm font-medium">Priority</label>
        {/* <select id="priority" {...register('priority')} className="h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 text-sm dark:border-slate-700">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select> */}
      </div>

      <Button type="submit" disabled={!isDirty || isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </Button>
    </form>
  );
}