'use client';

import { useEffect, useState, useCallback } from 'react';
import FallingCodeBlocks from './FallingCodeBlocks';

interface LoadingScreenProps {
  showOnInactivity?: boolean;
  isInactive?: boolean;
}

export default function LoadingScreen({
  showOnInactivity = false,
  isInactive = false,
}: LoadingScreenProps = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [, setBumpCount] = useState(0);

  const handleLogoHit = useCallback(() => {
    setBumpCount((prev) => prev + 1);
    setTimeout(() => {
      setBumpCount((prev) => prev - 1);
    }, 200);
  }, []);

  useEffect(() => {
    if (showOnInactivity) {
      if (isInactive) {
        setIsLoading(true);
        setFadeOut(false);
      } else {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } else {
      const handleLoad = () => {
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }, 500);
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, [showOnInactivity, isInactive]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0f1a] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Canvas-based Falling Code Blocks */}
      <FallingCodeBlocks onLogoHit={handleLogoHit} />

      {/* Logo Text - Centered (Static) */}
      <div className="relative z-[9999] justify-center items-center">
        <h1 id="loading-logo" className="loading-logo">
          {`< knnthdmyo />`}
        </h1>
        <p className="loading-subtitle">Frontend Engineer</p>
      </div>
    </div>
  );
}
