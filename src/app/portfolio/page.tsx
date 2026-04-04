'use client';

import {
  Hero,
  Experiences,
  Projects,
  Technologies,
  ReachOut,
} from '@/views/pages';
import { CommandPalette, BackToTop } from '@/views/components';

export default function Portfolio() {
  return (
    <div className="bg-gradient-to-br from-slate-100 via-gray-100 to-sky-100/40 dark:from-[#0a0f1a] dark:via-[#0d1320] dark:to-[#0f172a] text-black dark:text-gray-100 transition-colors duration-300 relative min-h-screen">
      {/* Gradient orbs for visual depth */}
      <div className="gradient-orb gradient-orb-1" aria-hidden="true" />
      <div className="gradient-orb gradient-orb-2" aria-hidden="true" />
      <div className="gradient-orb gradient-orb-3" aria-hidden="true" />

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
  );
}
