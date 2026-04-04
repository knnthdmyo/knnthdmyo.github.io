'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { useExperiences } from '@/viewmodels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Experiences = () => {
  const {
    milestones,
    showAll,
    toggleShowAll,
    getArrangementLabel,
    formatDateRange,
    formatDuration,
  } = useExperiences();

  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(
    null
  );

  const toggleMilestone = (index: number) => {
    if (!showAll) {
      setExpandedMilestone(expandedMilestone === index ? null : index);
    }
  };

  const handleToggleShowAll = () => {
    toggleShowAll();
    setExpandedMilestone(null);
  };

  return (
    <div className="box-border md:py-20 py-12 flex flex-col gap-8 md:gap-12">
      {/* Header */}
      <div className="group/header px-8 md:px-16">
        <div className="flex items-end gap-4">
          <div>
            <h1 className="page-title">Journey</h1>
            <p className="page-meta">{milestones.length} milestones</p>
          </div>
          <button onClick={handleToggleShowAll} className="expand-button mb-2">
            <span>{showAll ? 'Collapse' : 'Expand All'}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-[10px] transition-transform duration-300 ${showAll ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="flex flex-col px-8 md:px-16">
        {milestones.map((milestone, index) => {
          const isExpanded = showAll || expandedMilestone === index;

          return (
            <div
              key={index}
              className={`group flex gap-6 md:gap-12 py-5 border-b border-surface-200 dark:border-surface-800 ${showAll ? '' : 'cursor-pointer'}`}
              onClick={() => toggleMilestone(index)}
            >
              {/* Date column */}
              <div className="w-24 md:w-36 shrink-0 pt-0.5">
                <span className="text-xs text-surface-500 dark:text-surface-500">
                  {milestone.type === 'work'
                    ? formatDateRange(milestone.startDate, milestone.endDate)
                    : dayjs(milestone.startDate).year()}
                </span>
                {milestone.type === 'work' && (
                  <p className="text-[10px] text-surface-500 dark:text-surface-600 mt-0.5">
                    {formatDuration(milestone.startDate, milestone.endDate)}
                  </p>
                )}
              </div>

              {/* Content column */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-200">
                      {milestone.type === 'work'
                        ? milestone.subtitle
                        : milestone.title}
                    </h3>
                    <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">
                      {milestone.type === 'work'
                        ? milestone.title
                        : milestone.subtitle}
                    </p>
                  </div>
                  {!showAll && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-xs text-surface-500 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                        expandedMilestone === index ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>

                {/* Tags */}
                {milestone.workArrangement && (
                  <div className="flex gap-2 mt-2">
                    {milestone.workArrangement && (
                      <span className="text-[10px] text-surface-500 dark:text-surface-500">
                        {getArrangementLabel(milestone.workArrangement)}
                      </span>
                    )}
                  </div>
                )}

                {/* Expanded Description */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isExpanded
                      ? 'max-h-96 opacity-100 mt-3'
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed max-w-2xl">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experiences;
