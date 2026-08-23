import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';