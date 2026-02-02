'use client';

import { Hero, Experiences, Projects, Technologies, ReachOut } from '@/views/pages';
import { CustomCursor, CommandPalette, BackToTop, LoadingScreen } from '@/views/components';
import { useInactivityDetector } from '@/hooks/useInactivityDetector';
import { MAIN_CODE_CHARS } from '@/constants/code-chars';

export default function Home() {
  const isInactive = useInactivityDetector();

  return (
    <>
      {/* Initial loading screen */}
      <LoadingScreen />
      
      {/* Inactivity loading screen */}
      <LoadingScreen showOnInactivity isInactive={isInactive} />
      
      <div className="bg-gradient-to-br from-slate-100 via-gray-100 to-sky-100/40 dark:from-[#0a0f1a] dark:via-[#0d1320] dark:to-[#0f172a] text-black dark:text-gray-100 transition-colors duration-300 cursor-none relative min-h-screen">
      {/* Gradient orbs for visual depth */}
      <div className="gradient-orb gradient-orb-1" aria-hidden="true" />
      <div className="gradient-orb gradient-orb-2" aria-hidden="true" />
      <div className="gradient-orb gradient-orb-3" aria-hidden="true" />
      
      {/* Matrix Code Rain Background */}
      <div className="code-rain" aria-hidden="true" />
      <div className="code-rain-columns" aria-hidden="true">
        {MAIN_CODE_CHARS.map((char, index) => (
          <span key={`main-code-${index}`}>{char}</span>
        ))}
      </div>
      
      <CustomCursor />
      <CommandPalette />
      <BackToTop />
      <section id="home">
        <Hero />
      </section>
      <section id="experiences">
        <Experiences />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="technologies">
        <Technologies />
      </section>
      <section id="reach-out">
        <ReachOut />
      </section>
    </div>
    </>
  );
}

