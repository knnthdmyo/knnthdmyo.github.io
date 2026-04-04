'use client';

import { useHeroStats } from '@/viewmodels';

const Hero = () => {
  const { stats } = useHeroStats();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-4xl w-full">
          {/* Title */}
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-surface-900 dark:text-surface-100">
            knnthdmyo
          </h1>

          {/* Role */}
          <p className="mt-4 text-base md:text-lg text-surface-600 dark:text-surface-400">
            Frontend Engineer. Tech Lead.
          </p>

          {/* Stats — raw numbers, no cards */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 mt-12">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100 tabular-nums">
                {stats.years.toFixed(1)}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-surface-600 dark:text-surface-400 mt-1">
                Years
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100">
                {stats.companies}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-surface-600 dark:text-surface-400 mt-1">
                Companies
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100">
                {stats.projects}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-surface-600 dark:text-surface-400 mt-1">
                Projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
