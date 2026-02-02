'use client';

import { useEffect, useState, useCallback } from 'react';
import FallingCodeBlocks from './FallingCodeBlocks';
import { EXTENDED_CODE_CHARS } from '@/constants/code-chars';

interface LoadingScreenProps {
  showOnInactivity?: boolean;
  isInactive?: boolean;
}

export default function LoadingScreen({ showOnInactivity = false, isInactive = false }: LoadingScreenProps = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [, setBumpCount] = useState(0);

  const handleLogoHit = useCallback(() => {
    setBumpCount((prev) => prev + 1);
    // Reset bump animation
    setTimeout(() => {
      setBumpCount((prev) => prev - 1);
    }, 200);
  }, []);

  useEffect(() => {
    if (showOnInactivity) {
      // For inactivity mode, show when inactive
      if (isInactive) {
        console.log('LoadingScreen: Showing due to inactivity');
        setIsLoading(true);
        setFadeOut(false);
      } else {
        console.log('LoadingScreen: Hiding - user is active');
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } else {
      // Initial loading mode
      const handleLoad = () => {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setFadeOut(true);
          // Remove loading screen after fade out animation
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
      {/* Falling Code Blocks */}
      <FallingCodeBlocks onLogoHit={handleLogoHit} />

      {/* Background gradient */}
      <div className="code-rain code-rain-fast opacity-20" aria-hidden="true" />
      <div className="code-rain-columns code-rain-fast-columns opacity-20" aria-hidden="true">
        {EXTENDED_CODE_CHARS.map((char, index) => (
          <span key={`bg-code-${index}`}>{char}</span>
        ))}
      </div>

      {/* Logo Text - Centered (Static) */}
      <div className="relative z-[9999] justify-center items-center">
        <h1
          id="loading-logo"
          className="loading-logo"
        >
          {`< knnthdmyo />`}
        </h1>
        <p className="loading-subtitle">Frontend Engineer</p>
      </div>

    </div>
  );
}

