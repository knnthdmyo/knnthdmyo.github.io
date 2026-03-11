'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const CURSOR_SIZE = 27;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      className={`fixed pointer-events-none z-[100002] will-change-transform transition-transform duration-150
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${isClicking ? 'scale-75' : 'scale-100'}`}
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-15%, -15%) rotate(-90deg) ${isClicking ? 'scale(0.75)' : 'scale(1)'}`,
        color: '#38bdf8',
        fontSize: `${CURSOR_SIZE}px`,
        WebkitTextStroke: '2px #1e3a5f',
        paintOrder: 'stroke fill',
        filter: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.6))',
      }}
    >
      <FontAwesomeIcon icon={faLocationArrow} />
    </div>
  );
};

export default CustomCursor;
