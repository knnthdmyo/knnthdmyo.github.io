'use client';

import { useTechnologies } from '@/viewmodels';

const Technologies = () => {
  const { categorizedTechnologies, totalCount } = useTechnologies();

  return (
    <div className="box-border md:py-20 py-12 flex flex-col gap-10 md:gap-16">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Tech</h1>
        <p className="page-meta">{totalCount}+ technologies</p>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-10 px-8 md:px-16">
        {categorizedTechnologies.map((category, catIndex) => (
          <div
            key={category.title}
            className="group opacity-0 translate-y-4 animate-[slideUp_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${catIndex * 80}ms` }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs uppercase tracking-widest text-surface-600 dark:text-surface-400 group-hover:text-surface-900 dark:group-hover:text-surface-200 transition-colors duration-300">
                {category.title}
              </span>
              <div className="gradient-line-full" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {category.items.map((tech, index) => (
                <a
                  key={index}
                  href={tech.link}
                  target="_blank"
                  rel="noreferrer"
                  className="tech-link"
                >
                  <span className="tech-name">{tech.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technologies;
