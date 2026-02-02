'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProjects } from '@/viewmodels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Projects = () => {
  const { projects } = useProjects();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleProject = (index: number) => {
    if (!showAll) {
      setExpandedProject(expandedProject === index ? null : index);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setExpandedProject(null);
  };

  return (
    <div className="box-border md:py-20 py-12 flex flex-col gap-8 md:gap-12">
      {/* Header */}
      <div className="group/header px-8 md:px-20">
        <div className="flex items-end gap-4">
          <div>
            <span className="page-subtitle">Portfolio</span>
            <h1 className="page-title">Projects</h1>
          </div>
          
          {/* See All Button - Mobile always visible, Desktop on hover */}
          <button
            onClick={toggleShowAll}
            className="expand-button mb-2"
          >
            <span>{showAll ? 'Collapse' : 'Expand All'}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-[10px] transition-transform duration-300 ${showAll ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-12 h-0.5 bg-gradient-to-r from-violet-400 to-sky-400" />
          <p className="text-xs text-gray-400">{projects.length} featured projects</p>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-8 px-8 md:px-20">
        {projects.map((project, index) => (
          <div
            key={index}
            className="opacity-0 translate-y-4 animate-[slideUp_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Project Row */}
            <div
              className={`group flex flex-col md:flex-row gap-6 md:gap-10 ${showAll ? '' : 'cursor-pointer'}`}
              onClick={() => toggleProject(index)}
            >
              {/* Index number */}
              <div className="flex-shrink-0">
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="project-title">
                    {project.title}
                  </h3>
                  {/* Expand arrow - only visible on hover, hidden when showAll */}
                  {!showAll && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-xs text-gray-400 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                        expandedProject === index ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
                <p className="project-description">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Expanded Image Section */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                showAll || expandedProject === index ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
              }`}
              style={{ transitionDelay: showAll ? `${index * 100}ms` : '0ms' }}
            >
              <div className="md:ml-[88px] rounded-xl overflow-hidden">
                {project.image ? (
                  <div className="relative w-full max-w-2xl h-64 md:h-80 rounded-xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-2xl h-64 md:h-80 flex flex-col items-center justify-center gap-3 text-gray-500 bg-gray-100 dark:bg-gray-800/30 rounded-xl">
                    <FontAwesomeIcon icon={faImage} className="text-4xl" />
                    <span className="text-xs uppercase tracking-wider">No preview available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Subtle divider */}
            <div className="w-full h-px bg-gradient-to-r from-gray-200 dark:from-gray-800 via-gray-200 dark:via-gray-700 to-transparent mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
