import type { ApiError } from '@/lib/api-error';

export function ErrorState({ error, onRetry }: { error: ApiError; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-sm text-red-600 dark:text-red-400">{error.message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-sm underline underline-offset-2">
          Try again
        </button>
      )}
    </div>
  );
}