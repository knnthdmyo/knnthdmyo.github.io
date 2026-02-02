'use client';

import { useState, useEffect } from 'react';
import { faSearch, faBars, faXmark, faDownload, faRoute, faBriefcase, faEnvelope, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeToggle } from './ThemeToggle';

interface NavBarProps {
  onSearchClick?: () => void;
}

const CV_LINK = 'https://drive.google.com/uc?export=download&id=1BwI5OSUnxb8c8usowPTB-DQKRDB79RC8';

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
        <div className={`relative flex items-center gap-3 px-4 py-2 transition-all duration-300 ${
          isAtTop 
            ? '' 
            : 'bg-[#0d1320]/80 backdrop-blur-lg'
        }`}>
          {/* Fading bottom border */}
          <div className={`absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300 ${
            isAtTop ? 'opacity-0' : 'opacity-0'
          }`} />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-sky-500 transition-colors"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="text-xl" />
          </button>
          <button
            onClick={handleSearchClick}
            className="flex items-center gap-2 px-3 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-gray-400 text-xs flex-1"
          >
            <FontAwesomeIcon icon={faSearch} className="text-xs" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] text-gray-500 bg-white/5 rounded">⌘K</kbd>
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
                    <a 
                      className="nav-link" 
                      href={link.href}
                    >
                      <FontAwesomeIcon icon={link.icon} className="text-xs" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
                <li className="hidden sm:block">
                  <a 
                    href={CV_LINK}
                    download="Kenneth_Resume.pdf"
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
                  className="flex items-center gap-2 md:gap-3 px-3 md:px-4 h-9 md:h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 text-xs md:text-sm w-full md:w-auto md:min-w-[160px] lg:min-w-[200px]"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-xs" />
                  <span className="flex-1 text-left">Search...</span>
                  <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs bg-gray-200 dark:bg-gray-700 rounded-md">⌘K</kbd>
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
        className={`fixed top-0 left-0 h-full w-72 z-[9999] bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-r border-white/5 transform transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Gradient orb decoration */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 -right-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Scattered matrix characters - randomly positioned */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden font-mono select-none" aria-hidden="true">
            <span className="absolute top-[3%] left-[8%] text-sky-400/[0.08] text-[10px] rotate-[17deg]">{'{ }'}</span>
            <span className="absolute top-[7%] left-[62%] text-cyan-400/[0.07] text-[9px] rotate-[-42deg]">01</span>
            <span className="absolute top-[2%] left-[38%] text-violet-400/[0.06] text-[8px] rotate-[73deg]">=&gt;</span>
            <span className="absolute top-[11%] left-[81%] text-purple-400/[0.08] text-[10px] rotate-[-8deg]">fn</span>
            <span className="absolute top-[15%] left-[23%] text-sky-500/[0.07] text-[9px] rotate-[156deg]">{'<>'}</span>
            <span className="absolute top-[19%] left-[54%] text-cyan-400/[0.06] text-[8px] rotate-[-67deg]">10</span>
            <span className="absolute top-[14%] left-[4%] text-violet-400/[0.08] text-[10px] rotate-[28deg]">{'[]'}</span>
            <span className="absolute top-[24%] left-[71%] text-sky-400/[0.07] text-[9px] rotate-[-134deg]">&&</span>
            <span className="absolute top-[28%] left-[15%] text-purple-400/[0.06] text-[8px] rotate-[91deg]">::</span>
            <span className="absolute top-[22%] left-[45%] text-cyan-500/[0.08] text-[10px] rotate-[-23deg]">||</span>
            <span className="absolute top-[33%] left-[87%] text-violet-400/[0.07] text-[9px] rotate-[54deg]">**</span>
            <span className="absolute top-[37%] left-[32%] text-sky-400/[0.06] text-[8px] rotate-[-178deg]">{'()'}</span>
            <span className="absolute top-[35%] left-[6%] text-purple-400/[0.08] text-[10px] rotate-[112deg]">;</span>
            <span className="absolute top-[41%] left-[58%] text-cyan-400/[0.07] text-[9px] rotate-[-46deg]">let</span>
            <span className="absolute top-[44%] left-[78%] text-sky-500/[0.06] text-[8px] rotate-[7deg]">{'=>'}</span>
            <span className="absolute top-[48%] left-[19%] text-violet-400/[0.08] text-[10px] rotate-[-89deg]">{'...'}</span>
            <span className="absolute top-[52%] left-[67%] text-purple-400/[0.07] text-[9px] rotate-[163deg]">null</span>
            <span className="absolute top-[47%] left-[41%] text-cyan-400/[0.06] text-[8px] rotate-[-31deg]">{'{ }'}</span>
            <span className="absolute top-[56%] left-[3%] text-sky-400/[0.08] text-[10px] rotate-[78deg]">01</span>
            <span className="absolute top-[61%] left-[84%] text-violet-400/[0.07] text-[9px] rotate-[-142deg]">=&gt;</span>
            <span className="absolute top-[58%] left-[28%] text-purple-400/[0.06] text-[8px] rotate-[35deg]">fn</span>
            <span className="absolute top-[65%] left-[52%] text-cyan-500/[0.08] text-[10px] rotate-[-61deg]">{'<>'}</span>
            <span className="absolute top-[69%] left-[11%] text-sky-400/[0.07] text-[9px] rotate-[127deg]">10</span>
            <span className="absolute top-[72%] left-[73%] text-violet-400/[0.06] text-[8px] rotate-[-15deg]">{'[]'}</span>
            <span className="absolute top-[68%] left-[39%] text-purple-400/[0.08] text-[10px] rotate-[94deg]">&&</span>
            <span className="absolute top-[77%] left-[61%] text-cyan-400/[0.07] text-[9px] rotate-[-103deg]">::</span>
            <span className="absolute top-[81%] left-[7%] text-sky-500/[0.06] text-[8px] rotate-[49deg]">||</span>
            <span className="absolute top-[79%] left-[47%] text-violet-400/[0.08] text-[10px] rotate-[-76deg]">**</span>
            <span className="absolute top-[85%] left-[82%] text-purple-400/[0.07] text-[9px] rotate-[168deg]">{'()'}</span>
            <span className="absolute top-[88%] left-[24%] text-cyan-400/[0.06] text-[8px] rotate-[-52deg]">;</span>
            <span className="absolute top-[92%] left-[56%] text-sky-400/[0.08] text-[10px] rotate-[21deg]">let</span>
            <span className="absolute top-[94%] left-[16%] text-violet-400/[0.07] text-[9px] rotate-[-117deg]">{'=>'}</span>
          </div>
          
          {/* Header */}
          <div className="relative flex items-center justify-between p-5 border-b border-white/5">
            <span className="text-sm font-medium text-gray-200">{`< knnthdmyo />`}</span>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-400 hover:text-sky-400 transition-colors"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="relative flex-1 p-5">
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
              <li className="mt-2 pt-2 border-t border-white/5">
                <a 
                  href={CV_LINK}
                  download="Kenneth_Resume.pdf"
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
          <div className="relative p-5 border-t border-white/5 flex flex-col gap-3">
            <ThemeToggle />
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 text-gray-300 text-sm"
            >
              <FontAwesomeIcon icon={faSearch} className="text-xs text-gray-400" />
              <span className="flex-1 text-left">Search...</span>
              <kbd className="px-2 py-0.5 text-[10px] text-gray-500 bg-white/5 rounded">⌘K</kbd>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
