'use client';

import { memo } from 'react';

interface LogoItem {
  name: string;
  slug: string;
  color: string;
}

const LOGOS: LogoItem[] = [
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
  { name: 'React', slug: 'react', color: '#61DAFB' },
  { name: 'Next.js', slug: 'nextdotjs', color: '#ffffff' },
  { name: 'Svelte', slug: 'svelte', color: '#FF3E00' },
  { name: 'Vue.js', slug: 'vuedotjs', color: '#42B883' },
  { name: 'Node.js', slug: 'nodedotjs', color: '#339933' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4' },
  { name: 'Redux', slug: 'redux', color: '#764ABC' },
  { name: 'Docker', slug: 'docker', color: '#2496ED' },
  { name: 'Git', slug: 'git', color: '#F05032' },
  { name: 'GitHub', slug: 'github', color: '#ffffff' },
  { name: 'Figma', slug: 'figma', color: '#F24E1E' },
  { name: 'Jest', slug: 'jest', color: '#C21325' },
  { name: 'Storybook', slug: 'storybook', color: '#FF4785' },
  { name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
  { name: 'NestJS', slug: 'nestjs', color: '#E0234E' },
  { name: 'React Query', slug: 'reactquery', color: '#FF4154' },
  { name: 'Material UI', slug: 'mui', color: '#007FFF' },
  { name: 'ESLint', slug: 'eslint', color: '#4B32C3' },
];

const LogoCarousel = memo(() => {
  const renderLogos = (key: string) => (
    <div className="logo-scroll-group" aria-hidden={key !== 'a'}>
      {LOGOS.map((logo) => (
        <div
          key={`${key}-${logo.slug}`}
          className="logo-item group relative"
          title={logo.name}
        >
          {/* Grayscale version (default) */}
          <img
            src={`https://cdn.simpleicons.org/${logo.slug}/999999`}
            alt={logo.name}
            width={40}
            height={40}
            loading="lazy"
            className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-30 dark:opacity-40 transition-opacity duration-300 group-hover:opacity-0"
          />
          {/* Colored version (hover) */}
          <img
            src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color.replace('#', '')}`}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            className="w-8 h-8 md:w-10 md:h-10 object-contain absolute inset-0 opacity-0 scale-100 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative w-full py-10 overflow-hidden">
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, var(--carousel-bg) 0%, transparent 100%)',
        }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, var(--carousel-bg) 0%, transparent 100%)',
        }}
      />

      <div className="logo-scroll-track">
        {renderLogos('a')}
        {renderLogos('b')}
        {renderLogos('c')}
        {renderLogos('d')}
      </div>
    </section>
  );
});

LogoCarousel.displayName = 'LogoCarousel';

export default LogoCarousel;
