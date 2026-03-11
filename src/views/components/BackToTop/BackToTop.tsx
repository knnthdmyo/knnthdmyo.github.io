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
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9000] w-12 h-12 rounded-full 
        bg-white/40 dark:bg-slate-800/40 backdrop-blur-md
        border border-white/30 dark:border-slate-600/30
        text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300
        shadow-lg shadow-black/5 dark:shadow-black/20
        hover:bg-white/80 dark:hover:bg-slate-800/80
        hover:shadow-xl hover:shadow-sky-500/20
        flex items-center justify-center
        transition-all duration-300 ease-out
        ${isVisible 
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

