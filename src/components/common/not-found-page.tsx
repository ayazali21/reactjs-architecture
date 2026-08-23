import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
      <p className="text-lg font-medium">Page not found</p>
      <Link to="/" className="text-sm text-slate-500 underline">Back to tasks</Link>
    </div>
  );
}