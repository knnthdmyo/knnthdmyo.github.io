'use client';

import {
  Hero,
  Experiences,
  Projects,
  Technologies,
  ReachOut,
} from '@/views/pages';
import { BackToTop, Navbar } from '@/views/components';

export default function Home() {
  return (
    <div className="dark-grain bg-white dark:bg-surface-950 text-surface-900 dark:text-surface-100 transition-colors duration-300 relative min-h-screen">
      <Navbar />
      <BackToTop />
      <div className="max-w-7xl mx-auto pb-20 md:pb-0">
        <section id="home">
          <Hero />
        </section>
        <section id="experiences">
          <Experiences />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="tech">
          <Technologies />
        </section>
        <section id="connect">
          <ReachOut />
        </section>
      </div>
    </div>
  );
}
