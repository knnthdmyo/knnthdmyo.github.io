'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  // Triple-tap to toggle theme (mobile)
  useEffect(() => {
    const taps: number[] = [];
    const TAP_WINDOW = 500;

    const handleTap = () => {
      const now = Date.now();
      taps.push(now);

      // Keep only taps within the window
      while (taps.length > 0 && now - taps[0] > TAP_WINDOW) {
        taps.shift();
      }

      if (taps.length >= 3) {
        taps.length = 0;
        setTheme((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', next);
          applyTheme(next);
          return next;
        });
      }
    };

    window.addEventListener('touchend', handleTap);
    return () => window.removeEventListener('touchend', handleTap);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  // Return a safe fallback during SSR/build
  if (context === undefined) {
    // If we're in a browser environment, throw error
    if (typeof window !== 'undefined') {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    // If we're in SSR, return a safe default
    return {
      theme: 'dark' as const,
      toggleTheme: () => {},
    };
  }
  return context;
}
