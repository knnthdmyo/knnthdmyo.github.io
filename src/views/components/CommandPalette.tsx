'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark, faBriefcase, faCode, faFolder, faEnvelope, faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { ExperienceService, ProjectService, TechnologyService, ContactService } from '@/services';

interface SearchResult {
  type: 'experience' | 'project' | 'technology' | 'contact' | 'section' | 'suggestion';
  title: string;
  description: string;
  link?: string;
  section?: string;
  query?: string;
}

const SECTIONS = [
  { id: 'home', title: 'Home', description: 'Go to homepage' },
  { id: 'experiences', title: 'Experiences', description: 'View my career journey' },
  { id: 'projects', title: 'Projects', description: 'Browse my portfolio' },
  { id: 'reach-out', title: 'Contact', description: 'Get in touch with me' },
];

const QUICK_SUGGESTIONS = [
  { title: 'About Me', description: 'Learn about my background and expertise', query: 'about me' },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchableData = useMemo(() => {
    const data: SearchResult[] = [];
    const experiences = ExperienceService.getExperiences();
    const projects = ProjectService.getProjects();
    const technologies = TechnologyService.getAll();
    const contactInfo = ContactService.getContactInfo();

    SECTIONS.forEach(section => {
      data.push({
        type: 'section',
        title: section.title,
        description: section.description,
        section: section.id,
      });
    });

    experiences.forEach(exp => {
      data.push({
        type: 'experience',
        title: `${exp.role} at ${exp.company}`,
        description: exp.description.slice(0, 100) + '...',
        section: 'experiences',
      });
    });

    projects.forEach(project => {
      data.push({
        type: 'project',
        title: project.title,
        description: project.description.slice(0, 100) + '...',
        section: 'projects',
      });
    });

    Object.values(technologies).flat().forEach(tech => {
      data.push({
        type: 'technology',
        title: tech.name,
        description: `Technology - ${tech.name}`,
        link: tech.link,
      });
    });

    contactInfo.forEach(contact => {
      data.push({
        type: 'contact',
        title: contact.title,
        description: contact.value,
        section: 'reach-out',
      });
    });

    return data;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) {
      const sections = searchableData.filter(item => item.type === 'section');
      const suggestions = QUICK_SUGGESTIONS.map(s => ({
        type: 'suggestion' as const,
        title: s.title,
        description: s.description,
        query: s.query,
      }));
      return [...suggestions, ...sections];
    }

    const lowerQuery = query.toLowerCase();
    return searchableData.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
  }, [query, searchableData]);

  const aiResponse = useMemo(() => {
    if (!query.trim()) return null;

    const lowerQuery = query.toLowerCase();
    const experiences = ExperienceService.getExperiences();
    const projects = ProjectService.getProjects();
    const technologies = TechnologyService.getAll();
    const email = ContactService.getEmail();

    if (lowerQuery.includes('about') || lowerQuery.includes('who are') || lowerQuery.includes('introduce') || lowerQuery.includes('summary')) {
      return `I'm a Frontend Engineer with 6+ years of experience shipping React web apps and React Native mobile experiences. I build fast, accessible interfaces with TypeScript, Redux, and Tailwind—whether it's SaaS dashboards, PWAs that hit the App Store, or cross-platform apps running on iOS and Android. I've led migrations, mentored devs, and kept production systems running smoothly. Currently exploring AI-assisted development to ship even faster.`;
    }

    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
      return `I have ${experiences.length} professional experiences, including roles at ${experiences.map(e => e.company).join(', ')}. My most recent role was as ${experiences[experiences.length - 1].role} at ${experiences[experiences.length - 1].company}.`;
    }

    if (lowerQuery.includes('project') || lowerQuery.includes('portfolio')) {
      return `I've worked on ${projects.length} notable projects: ${projects.map(p => p.title).join(', ')}. Each showcases different aspects of my development skills.`;
    }

    if (lowerQuery.includes('skill') || lowerQuery.includes('tech') || lowerQuery.includes('stack')) {
      const allTech = Object.values(technologies).flat();
      return `I'm proficient in ${allTech.length}+ technologies including ${allTech.slice(0, 5).map(t => t.name).join(', ')}, and more.`;
    }

    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
      return `You can reach me at ${email}. I'm always open to new opportunities and collaborations!`;
    }

    if (lowerQuery.includes('react') || lowerQuery.includes('frontend')) {
      return `Yes! React is one of my primary skills. I've used it extensively at ${experiences[experiences.length - 1].company} and in projects like ${projects[0].title}.`;
    }

    if (results.length > 0) {
      return `Found ${results.length} results matching "${query}". Here's what I found on my portfolio:`;
    }

    return `I couldn't find specific information about "${query}", but feel free to explore the sections below or contact me directly!`;
  }, [query, results]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'suggestion' && result.query) {
      setQuery(result.query);
      setSelectedIndex(0);
      return;
    }
    if (result.link) {
      window.open(result.link, '_blank');
    } else if (result.section) {
      const element = document.getElementById(result.section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setQuery('');
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'experience': return faBriefcase;
      case 'project': return faFolder;
      case 'technology': return faCode;
      case 'contact': return faEnvelope;
      case 'suggestion': return faUser;
      default: return faArrowRight;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh]">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <FontAwesomeIcon icon={faSearch} className="text-black/50 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Ask me anything about my portfolio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder-gray-400"
            autoFocus
          />
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 text-xs font-medium text-black/60 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded">ESC</kbd>
            <button onClick={() => setIsOpen(false)} className="text-black/50 dark:text-gray-400 hover:text-black dark:hover:text-gray-300">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        {aiResponse && (
          <div className="p-4 bg-gradient-to-r from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                AI
              </div>
              <p className="text-sm text-black dark:text-gray-300 leading-relaxed">
                {aiResponse}
              </p>
            </div>
          </div>
        )}

        <div className="max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.title}-${index}`}
                  onClick={() => handleSelect(result)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors
                    ${selectedIndex === index 
                      ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-black dark:text-gray-300'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                    ${selectedIndex === index 
                      ? 'bg-sky-100 dark:bg-sky-800/50 text-sky-500' 
                      : 'bg-gray-100 dark:bg-gray-800 text-black/60 dark:text-gray-500'
                    }`}>
                    <FontAwesomeIcon icon={getIcon(result.type)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{result.title}</p>
                    <p className="text-xs text-black/60 dark:text-gray-400 truncate">{result.description}</p>
                  </div>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className={`text-sm transition-transform ${selectedIndex === index ? 'translate-x-1' : ''}`}
                  />
                </button>
              ))}
            </div>
          ) : query && (
            <div className="p-8 text-center text-black/60 dark:text-gray-500">
              <p>No results found for &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between text-xs text-black/60 dark:text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↵</kbd>
                to select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">K</kbd>
              to toggle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;

