import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AppShell } from '@/components/layout/app-shell';
import { TasksPage } from '@/features/tasks/pages/TasksPage';
import { CreateTaskPage } from '@/features/tasks/pages/CreateTaskPage';
import { TaskDetailsPage } from '@/features/tasks/pages/TaskDetailsPage';
import { EditTaskPage } from '@/features/tasks/pages/EditTaskPage';
import { NotFoundPage } from '@/components/common/not-found-page';

export const router = createBrowserRouter([
  {
    element: (
      <AppShell>
        <Outlet />
      </AppShell>
    ),
    children: [
      { path: '/', element: <TasksPage /> },
      { path: '/tasks/new', element: <CreateTaskPage /> },
      { path: '/tasks/:id', element: <TaskDetailsPage /> },
      { path: '/tasks/:id/edit', element: <EditTaskPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);