'use client';

import { useTheme } from '@/providers/ThemeProvider';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-[10px] uppercase tracking-widest font-medium text-surface-500 dark:text-surface-500 hover:text-surface-900 dark:hover:text-surface-200 transition-colors duration-300"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
