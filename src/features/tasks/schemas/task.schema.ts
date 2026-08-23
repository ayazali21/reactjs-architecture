import { z } from 'zod';

const taskDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['pending', 'completed']),
  due_date: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const taskSchema = taskDtoSchema.transform((dto) => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  status: dto.status,
  dueDate: dto.due_date,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
}));

export const paginatedTasksSchema = z.object({
  data: z.array(taskSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});



export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).optional(),
  dueDate: z.string().nullable().optional(),
});

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type PaginatedTasks = z.infer<typeof paginatedTasksSchema>;
export const taskListSchema = z.array(taskSchema);