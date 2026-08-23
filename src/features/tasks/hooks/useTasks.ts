import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask, completeTask } from '../api/task.api';
import type { CreateTaskInput } from '../schemas/task.schema';

export const taskKeys = {
  all: ['tasks'] as const,
  list: (page: number, limit: number) => ['tasks', { page, limit }] as const,
  detail: (id: string) => ['tasks', id] as const,
  stats: ['tasks', 'stats'] as const,

};

export function useTasks(page: number, limit = 10) {
  return useQuery({
    queryKey: taskKeys.list(page, limit),
    queryFn: () => getTasks({ page, limit }),
    placeholderData: keepPreviousData,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}

export function useUpdateTask(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CreateTaskInput>) => updateTask(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}

// separate query, large limit, only for stats — not for list display
export function useAllTasksForStats() {
  return useQuery({
    queryKey: taskKeys.stats,
    queryFn: () => getTasks({ page: 1, limit: 1000 }),
    staleTime: 60_000, // stats can lag slightly, no need to refetch as aggressively
  });
}