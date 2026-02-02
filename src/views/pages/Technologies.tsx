'use client';

import { useTechnologies } from '@/viewmodels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Technologies = () => {
  const { categorizedTechnologies, totalCount } = useTechnologies();

  return (
    <div className="box-border md:py-20 py-12 flex flex-col gap-10 md:gap-16">
      {/* Header */}
      <div className="page-header">
        <span className="page-subtitle">Tech</span>
        <h1 className="page-title">Stack</h1>
        <div className="page-title-divider">
          <div className="page-divider-line" />
          <p className="page-divider-text">{totalCount}+ technologies</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-10 px-8 md:px-20">
        {categorizedTechnologies.map((category, catIndex) => (
          <div
            key={category.title}
            className="group opacity-0 translate-y-4 animate-[slideUp_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${catIndex * 80}ms` }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs uppercase tracking-widest text-black/60 dark:text-gray-400 group-hover:text-sky-500 transition-colors duration-300">
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
                  <FontAwesomeIcon 
                    icon={tech.icon} 
                    className="tech-icon"
                    style={{ color: tech.color }}
                  />
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
