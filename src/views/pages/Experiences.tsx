'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { useExperiences } from '@/viewmodels';
import { MilestoneType } from '@/models';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faTrophy, faBriefcase, faChevronDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Experiences = () => {
  const {
    milestones,
    hoveredMilestone,
    showAll,
    tooltipPos,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    toggleShowAll,
    getArrangementLabel,
    getGapFlex,
    formatDateRange,
    formatDuration,
  } = useExperiences();

  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);

  const toggleMilestone = (index: number) => {
    if (!showAll) {
      setExpandedMilestone(expandedMilestone === index ? null : index);
    }
  };

  const handleToggleShowAll = () => {
    toggleShowAll();
    setExpandedMilestone(null);
  };

  const getIcon = (type: MilestoneType) => {
    switch (type) {
      case 'education': return faGraduationCap;
      case 'achievement': return faTrophy;
      case 'work': return faBriefcase;
    }
  };

  return (
    <>
      <div className="box-border md:py-20 py-12 flex flex-col gap-8 md:gap-12">
        {/* Header */}
        <div className="group/header px-8 md:px-20">
          <div className="flex items-end gap-4">
            <div>
              <span className="page-subtitle">Career</span>
              <h1 className="page-title">Journey</h1>
            </div>
            
            {/* See All Button - Mobile always visible, Desktop on hover */}
            <button
              onClick={handleToggleShowAll}
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
            <div className="w-12 h-0.5 bg-gradient-to-r from-sky-400 to-cyan-400" />
            <p className="text-xs text-black/60 dark:text-gray-400">{milestones.length} milestones</p>
          </div>
        </div>
        
        {/* Mobile: Vertical roadmap | Desktop: Horizontal roadmap */}
        <div className="relative w-full">
          {/* Desktop: Horizontal roadmap with proportional gaps */}
          <div className="hidden md:block py-16">
            <div className="flex items-center w-full px-20">
              {/* Road line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
              
              {/* Milestones */}
              {milestones.map((milestone, index) => {
                const isLast = index === milestones.length - 1;
                const isFirst = index === 0;
                const gapFlex = getGapFlex(index);
                
                return (
                  <div 
                    key={index} 
                    className="flex items-center last:flex-none"
                    style={{ flex: isLast ? 'none' : gapFlex }}
                  >
                    {/* Milestone node */}
                    <div 
                      className="relative flex flex-col items-center group shrink-0"
                      onMouseEnter={(e) => handleMouseEnter(milestone, e)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Date label - above (just year for non-work, full range for work) */}
                      <div className="absolute -top-8 whitespace-nowrap">
                        <span className="text-xs font-bold text-sky-500 dark:text-sky-400">
                          {milestone.type === 'work' 
                            ? formatDateRange(milestone.startDate, milestone.endDate)
                            : dayjs(milestone.startDate).year()
                          }
                        </span>
                      </div>
                      
                      {/* Icon bullet */}
                      <div className={`relative z-10 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-400 flex items-center justify-center text-sky-500 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/30 group-hover:scale-110 transition-all duration-300 ${isFirst ? 'animate-[heartbeat_2s_ease-in-out_infinite]' : ''}`}>
                        <FontAwesomeIcon icon={getIcon(milestone.type)} className="text-sm" />
                        {isFirst && <div className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping" />}
                      </div>
                      
                      {/* Label - below (no duration for non-work) */}
                      <div className="absolute top-12 whitespace-nowrap text-center max-w-32">
                        <p className="text-[10px] font-semibold text-black dark:text-gray-300 uppercase tracking-wide truncate">
                          {milestone.type === 'work' ? milestone.subtitle : milestone.title}
                        </p>
                        <p className="text-[9px] text-black/60 dark:text-gray-500 truncate">
                          {milestone.type === 'work' ? milestone.title : milestone.subtitle}
                        </p>
                        {milestone.type === 'work' && (
                          <p className="text-[9px] text-sky-400 mt-0.5">
                            {formatDuration(milestone.startDate, milestone.endDate)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Connecting road segment - width is proportional to time gap */}
                    {!isLast && (
                      <div className="flex-1 h-0.5 bg-sky-400/50 mx-2 min-w-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: Vertical roadmap */}
          <div className="md:hidden px-8">
            <div className="relative">
              {/* Vertical road line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400/50 via-sky-400/50 to-transparent" />
              
              {/* Milestones */}
              <div className="flex flex-col">
                {milestones.map((milestone, index) => {
                  const isLast = index === milestones.length - 1;
                  const isFirst = index === 0;
                  const gapFlex = getGapFlex(index);
                  // Scale gap for mobile (min 2rem, proportional to time)
                  const gapHeight = `${Math.max(2, gapFlex * 1.5)}rem`;
                  
                  return (
                    <div 
                      key={index} 
                      className="flex items-start gap-4"
                      style={{ marginBottom: isLast ? 0 : gapHeight }}
                    >
                      {/* Icon bullet */}
                      <div className={`relative z-10 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-400 flex items-center justify-center text-sky-500 shrink-0 ${isFirst ? 'animate-[heartbeat_2s_ease-in-out_infinite]' : ''}`}>
                        <FontAwesomeIcon icon={getIcon(milestone.type)} className="text-sm" />
                        {isFirst && <div className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping" />}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-2">
                        {/* Title Section - Always visible, clickable */}
                        <div 
                          className={`group ${showAll ? '' : 'cursor-pointer'}`}
                          onClick={() => toggleMilestone(index)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 flex-wrap flex-1">
                              <span className="text-xs font-bold text-sky-500 dark:text-sky-400">
                                {milestone.type === 'work' 
                                  ? formatDateRange(milestone.startDate, milestone.endDate)
                                  : dayjs(milestone.startDate).year()
                                }
                              </span>
                              {milestone.type === 'work' && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400">
                                  {formatDuration(milestone.startDate, milestone.endDate)}
                                </span>
                              )}
                              {milestone.workArrangement && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-400">
                                  {getArrangementLabel(milestone.workArrangement)}
                                </span>
                              )}
                            </div>
                            {/* Expand arrow - only visible on hover, hidden when showAll */}
                            {!showAll && (
                              <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`text-xs text-black/50 dark:text-gray-400 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                                  expandedMilestone === index ? 'rotate-180' : ''
                                }`}
                              />
                            )}
                          </div>
                          
                          <h3 className="text-sm font-semibold text-black dark:text-gray-200 uppercase tracking-wide">
                            {milestone.type === 'work' ? milestone.subtitle : milestone.title}
                          </h3>
                          <p className="text-xs text-black/70 dark:text-gray-400">
                            {milestone.type === 'work' ? milestone.title : milestone.subtitle}
                          </p>
                        </div>
                        
                        {/* Expanded Description */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-out ${
                            showAll || expandedMilestone === index ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                          }`}
                        >
                          <p className="text-xs text-black/80 dark:text-gray-300 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* See All Expanded View - Desktop only (work experiences only) */}
        <div 
          className={`hidden md:block px-8 md:px-20 overflow-hidden transition-all duration-500 ease-out ${
            showAll ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-8 pt-4">
            {milestones.filter(m => m.type === 'work').map((milestone, index) => (
              <div 
                key={index}
                className={`group flex flex-col md:flex-row gap-6 md:gap-10 transition-all duration-500 ease-out ${
                  showAll ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 -translate-x-8 blur-sm'
                }`}
                style={{ transitionDelay: showAll ? `${index * 100}ms` : `${(milestones.filter(m => m.type === 'work').length - index) * 30}ms` }}
              >
                {/* Index number */}
                <div className="flex-shrink-0">
                  <span className="text-5xl md:text-6xl font-extralight text-black/20 dark:text-gray-800 group-hover:text-sky-500/30 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl md:text-2xl font-light tracking-wide text-black dark:text-gray-100 group-hover:text-sky-500 transition-colors duration-300">
                      {milestone.subtitle}
                    </h3>
                    <span className="text-xs text-sky-500">
                      {formatDateRange(milestone.startDate, milestone.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-black/70 dark:text-gray-400 mt-1">
                    {milestone.title}
                  </p>
                  <p className="text-sm text-black/70 dark:text-gray-400 mt-3 leading-relaxed max-w-2xl">
                    {milestone.description}
                  </p>
                  {/* Subtle divider */}
                  <div className="w-full h-px bg-gradient-to-r from-gray-200 dark:from-gray-800 via-gray-200 dark:via-gray-700 to-transparent mt-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA - Let's Build Together */}
        <div className="px-8 md:px-20 pt-8">
          <a 
            href="#reach-out"
            className="group flex items-center justify-center gap-3 py-4 px-8 mx-auto w-fit rounded-full bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border border-sky-500/20 hover:border-sky-500/40 hover:from-sky-500/20 hover:to-emerald-500/20 transition-all duration-300"
          >
            <span className="text-sm font-medium text-black dark:text-gray-300">
              What&apos;s next? <span className="text-sky-500 font-semibold">Let&apos;s build something together</span>
            </span>
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="text-sky-500 group-hover:translate-x-1 transition-transform duration-300" 
            />
          </a>
        </div>
      </div>

      {/* Hover Tooltip - Desktop only, follows cursor */}
      {hoveredMilestone && !showAll && (
        <div 
          className="fixed z-[99999] pointer-events-none hidden md:block"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: tooltipPos.x > window.innerWidth - 320 ? 'translateX(-100%)' : 'none',
          }}
        >
          <div className="w-72 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-500">
                  <FontAwesomeIcon icon={getIcon(hoveredMilestone.type)} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-sky-500">
                      {formatDateRange(hoveredMilestone.startDate, hoveredMilestone.endDate)}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400">
                      {formatDuration(hoveredMilestone.startDate, hoveredMilestone.endDate)}
                    </span>
                  </div>
                  <h3 className="text-sm font-light uppercase tracking-tight">{hoveredMilestone.title}</h3>
                  <p className="text-xs text-black/60 dark:text-gray-500">{hoveredMilestone.subtitle}</p>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <p className="text-xs text-black/80 dark:text-gray-300 leading-relaxed line-clamp-4">
                {hoveredMilestone.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Experiences;
