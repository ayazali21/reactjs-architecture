// app/router.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AppShell } from '@/components/layout/app-shell';
import { Skeleton } from '@/components/ui/skeleton';
import { NotFoundPage } from '@/components/common/not-found-page';

const TasksPage = lazy(() => import('@/features/tasks/pages/TasksPage').then(m => ({ default: m.TasksPage })));
const CreateTaskPage = lazy(() => import('@/features/tasks/pages/CreateTaskPage').then(m => ({ default: m.CreateTaskPage })));
const TaskDetailsPage = lazy(() => import('@/features/tasks/pages/TaskDetailsPage').then(m => ({ default: m.TaskDetailsPage })));
const EditTaskPage = lazy(() => import('@/features/tasks/pages/EditTaskPage').then(m => ({ default: m.EditTaskPage })));

function PageFallback() {
  return <div className="mx-auto max-w-2xl p-6"><Skeleton className="h-40" /></div>;
}

export const router = createBrowserRouter([
  {
    element: <AppShell><Outlet /></AppShell>,
    children: [
      { path: '/', element: <Suspense fallback={<PageFallback />}><TasksPage /></Suspense> },
      { path: '/tasks/new', element: <Suspense fallback={<PageFallback />}><CreateTaskPage /></Suspense> },
      { path: '/tasks/:id', element: <Suspense fallback={<PageFallback />}><TaskDetailsPage /></Suspense> },
      { path: '/tasks/:id/edit', element: <Suspense fallback={<PageFallback />}><EditTaskPage /></Suspense> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);