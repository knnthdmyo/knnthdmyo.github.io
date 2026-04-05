'use client';

import { useEffect, useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';

const NavBar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'experiences', 'projects', 'tech', 'connect'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#experiences', label: 'Journey' },
    { href: '#projects', label: 'Projects' },
    { href: '#tech', label: 'Tech' },
    { href: '#connect', label: 'Connect' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9997] transition-all duration-300 ${
        isAtTop ? '' : 'bg-white/80 dark:bg-surface-950/80 backdrop-blur-lg'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 xl:px-12 md:py-6 max-w-7xl mx-auto">
        <ul className="flex space-x-4 md:space-x-6 xl:space-x-12 items-center text-[10px] md:text-xs uppercase tracking-widest font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                className={`nav-link ${activeSection === link.href.slice(1) ? 'nav-link-active' : ''}`}
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
