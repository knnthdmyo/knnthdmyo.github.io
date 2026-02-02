'use client';

import { useHeroStats } from '@/viewmodels';
import NavBar from '@/views/components/Navbar';
import WorldMap from '@/views/components/WorldMap';

const Hero = () => {
  const { stats, formatHours } = useHeroStats();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="text-center max-w-3xl">
          <h1 className="section-title md:text-7xl mt-2">{`< knnthdmyo />`}</h1>
          <p className="section-subtitle">Frontend Engineer</p>
          
          {/* Highlights - Serious */}
          <div className="flex justify-center gap-6 md:gap-10 mt-10 flex-wrap">
            <div className="stat-box">
              <p className="stat-number tabular-nums">{stats.years.toFixed(1)}</p>
              <p className="stat-label">Years<br/>Experience</p>
            </div>
            <div className="stat-box">
              <p className="stat-number">{stats.companies}</p>
              <p className="stat-label">Companies<br/>Served</p>
            </div>
            <div className="stat-box">
              <p className="stat-number">{stats.projects}+</p>
              <p className="stat-label">Projects<br/>Deployed</p>
            </div>
            <div className="stat-box">
              <p className="stat-number tabular-nums">{formatHours(stats.hours)}</p>
              <p className="stat-label">Hours<br/>Coded</p>
            </div>
          </div>

          {/* World Map */}
          <div className="mt-16">
            <WorldMap title="Teams I've Collaborated With" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
