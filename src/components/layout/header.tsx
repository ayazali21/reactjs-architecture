import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const { theme, toggleTheme } = useTheme();
 const { t } = useTranslation();

  return (
    <header className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
        <Link to="/" className="font-semibold">{t('app.title')}</Link>
        <div className="flex items-center gap-2">
          <Link to="/tasks/new"><Button size="sm">{t('nav.newTask')}</Button></Link>
          <Button size="sm" variant="ghost" onClick={toggleTheme} aria-label={t('nav.toggleTheme')}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}