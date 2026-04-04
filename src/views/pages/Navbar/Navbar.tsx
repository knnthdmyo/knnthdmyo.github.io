'use client';

import { useState, useEffect } from 'react';
import {
  faSearch,
  faBars,
  faXmark,
  faDownload,
  faRoute,
  faBriefcase,
  faEnvelope,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeToggle } from '@/views/components/ThemeToggle';

interface NavBarProps {
  onSearchClick?: () => void;
}

const CV_LINK =
  'https://drive.google.com/file/d/1BwI5OSUnxb8c8usowPTB-DQKRDB79RC8/view?usp=sharing';

const NavBar = ({ onSearchClick }: NavBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
    onSearchClick?.();
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#experiences', label: 'Journey', icon: faRoute },
    { href: '#projects', label: 'Projects', icon: faBriefcase },
    { href: '#technologies', label: 'Tech Stack', icon: faCode },
    { href: '#reach-out', label: 'Connect', icon: faEnvelope },
  ];

  return (
    <>
      {/* Fixed Mobile Sticky Bar - Always visible on mobile */}
      <div className="fixed top-0 left-0 right-0 z-[9997] md:hidden">
        <div
          className={`relative flex items-center gap-3 px-4 py-2 transition-all duration-300 ${
            isAtTop ? '' : 'bg-white/80 dark:bg-surface-950/80 backdrop-blur-lg'
          }`}
        >
          {/* Fading bottom border */}
          <div
            className={`absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300 ${
              isAtTop ? 'opacity-0' : 'opacity-0'
            }`}
          />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-surface-500 hover:text-surface-900 dark:hover:text-surface-200 transition-colors"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faXmark : faBars}
              className="text-xl"
            />
          </button>
          <button
            onClick={handleSearchClick}
            className="flex items-center gap-2 px-3 h-9 rounded-full bg-surface-100 dark:bg-white/5 hover:bg-surface-200 dark:hover:bg-white/10 border border-surface-200 dark:border-white/10 transition-colors text-surface-500 text-xs flex-1"
          >
            <FontAwesomeIcon icon={faSearch} className="text-xs" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] text-surface-400 bg-surface-200 dark:bg-white/5 rounded">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Navigation - Desktop only */}
      <div className="w-full lg:justify-between justify-center hidden md:flex">
        <section className="relative w-full">
          <nav className="flex w-full items-center justify-between">
            <div className="px-4 xl:px-12 py-4 md:py-6 flex w-full items-center justify-between gap-4">
              <ul className="flex px-2 md:px-4 xl:space-x-12 space-x-3 md:space-x-6 items-center text-[10px] md:text-xs uppercase tracking-widest font-medium">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a className="nav-link" href={link.href}>
                      <FontAwesomeIcon icon={link.icon} className="text-xs" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
                <li className="hidden sm:block">
                  <a
                    href={CV_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                  >
                    <FontAwesomeIcon icon={faDownload} className="text-xs" />
                    <span>Download CV</span>
                  </a>
                </li>
              </ul>

              {/* Search */}
              <div className="flex items-center flex-1 md:flex-none justify-end gap-2 md:gap-4">
                <ThemeToggle />
                <button
                  onClick={handleSearchClick}
                  className="flex items-center gap-2 md:gap-3 px-3 md:px-4 h-9 md:h-10 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors text-surface-500 dark:text-surface-400 text-xs md:text-sm w-full md:w-auto md:min-w-[160px] lg:min-w-[200px]"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-xs" />
                  <span className="flex-1 text-left">Search...</span>
                  <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs bg-surface-200 dark:bg-surface-700 rounded-md">
                    ⌘K
                  </kbd>
                </button>
              </div>
            </div>
          </nav>
        </section>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-[9999] bg-white dark:bg-surface-950 shadow-2xl shadow-black/10 dark:shadow-black/50 border-r border-surface-200 dark:border-surface-800 transform transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
            <span className="text-sm font-bold text-surface-900 dark:text-surface-200">{`< knnthdmyo />`}</span>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-surface-400 hover:text-surface-200 transition-colors"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-5">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="nav-link-mobile"
                  >
                    <FontAwesomeIcon icon={link.icon} className="text-xs" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-surface-200 dark:border-surface-800">
                <a
                  href={CV_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="nav-link-mobile-primary"
                >
                  <FontAwesomeIcon icon={faDownload} className="text-xs" />
                  <span>Download CV</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Search Button */}
          <div className="p-5 border-t border-surface-200 dark:border-surface-800 flex flex-col gap-3">
            <ThemeToggle />
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-surface-100 dark:bg-white/5 hover:bg-surface-200 dark:hover:bg-white/10 border border-surface-200 dark:border-white/10 transition-all duration-300 text-surface-600 dark:text-surface-300 text-sm"
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="text-xs text-surface-400"
              />
              <span className="flex-1 text-left">Search...</span>
              <kbd className="px-2 py-0.5 text-[10px] text-surface-400 bg-surface-200 dark:bg-white/5 rounded">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
