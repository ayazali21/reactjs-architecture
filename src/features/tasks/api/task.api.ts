import { api } from '@/lib/axios';
import { taskSchema,  type Task, type CreateTaskInput, paginatedTasksSchema, PaginatedTasks } from '../schemas/task.schema';
import { ZodError } from 'zod';
import { ApiError } from '@/lib/api-error';

function toDto(input: Partial<CreateTaskInput>) {
  return {
    title: input.title,
    description: input.description,
    due_date: input.dueDate,
  };
}

function parseOrThrow<T>(schema: { parse: (data: unknown) => T }, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ApiError('Received unexpected data from the server.', 'validation');
    }
    throw err;
  }
}

export async function getTasks(params: { page: number; limit: number }): Promise<PaginatedTasks> {
  const { data } = await api.get('/tasks', { params });
  return parseOrThrow(paginatedTasksSchema, data);
}

export async function getTask(id: string): Promise<Task> {
  const { data } = await api.get(`/tasks/${id}`);
  return parseOrThrow(taskSchema, data);
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const { data } = await api.post('/tasks', toDto(input));
  return parseOrThrow(taskSchema, data);
}

export async function updateTask(id: string, input: Partial<CreateTaskInput>): Promise<Task> {
  const { data } = await api.put(`/tasks/${id}`, toDto(input));
  return parseOrThrow(taskSchema, data);
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

export async function completeTask(id: string): Promise<Task> {
  const { data } = await api.post(`/tasks/${id}/complete`);
  return parseOrThrow(taskSchema, data);
}