import { DashboardStats } from '../components/DashboardStats';
import { TaskList } from '../components/TaskList';

export function TasksPage() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Tasks</h1>
      <DashboardStats />
      <div className="mt-6">
        <TaskList />
      </div>
    </div>
  );
}