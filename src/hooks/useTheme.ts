import { useCallback, useState } from 'react';
import { applyTheme, getInitialTheme, type Theme } from '@/config/theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}