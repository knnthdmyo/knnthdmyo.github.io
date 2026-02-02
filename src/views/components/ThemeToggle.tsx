'use client';

import { useTheme } from '@/providers/ThemeProvider';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-sky-400"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <FontAwesomeIcon icon={faMoon} className="w-5 h-5" />
      ) : (
        <FontAwesomeIcon icon={faSun} className="w-5 h-5" />
      )}
    </button>
  );
};
