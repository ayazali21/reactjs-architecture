import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="h-9 rounded-md border border-slate-300 bg-transparent px-2 text-sm dark:border-slate-700"
      aria-label="Language"
    >
      <option value="en">EN</option>
      <option value="ar">AR</option>
    </select>
  );
}