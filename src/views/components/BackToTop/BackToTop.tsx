'use client';

import { useEffect, useState, memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const BackToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9000] w-10 h-10 rounded-full 
        bg-white dark:bg-surface-800 
        border border-surface-200 dark:border-surface-700
        text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200
        shadow-sm
        hover:bg-surface-50 dark:hover:bg-surface-700
        flex items-center justify-center
        transition-all duration-300 ease-out
        ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      aria-label="Back to top"
    >
      <FontAwesomeIcon icon={faArrowUp} className="text-lg" />
    </button>
  );
});

BackToTop.displayName = 'BackToTop';

export default BackToTop;
