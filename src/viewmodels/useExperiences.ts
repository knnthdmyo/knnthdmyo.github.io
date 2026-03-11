import { useState } from 'react';
import { Milestone } from '@/models';
import { ExperienceService } from '@/services';
import {
  calculateGapWeights,
  getGapFlex as getGapFlexUtil,
  formatDateRange,
  formatDuration,
  getArrangementLabel,
} from '@/utils';

export const useExperiences = () => {
  const [hoveredMilestone, setHoveredMilestone] = useState<Milestone | null>(
    null
  );
  const [showAll, setShowAll] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const milestones = ExperienceService.getMilestones();
  const companyCount = ExperienceService.getCompanyCount();
  const gapWeights = calculateGapWeights(milestones);

  const getGapFlex = (index: number) => getGapFlexUtil(gapWeights, index);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX + 20, y: e.clientY + 10 });
  };

  const handleMouseEnter = (milestone: Milestone, e: React.MouseEvent) => {
    if (!showAll) {
      setHoveredMilestone(milestone);
      setTooltipPos({ x: e.clientX + 20, y: e.clientY + 10 });
    }
  };

  const handleMouseLeave = () => {
    setHoveredMilestone(null);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setHoveredMilestone(null);
  };

  return {
    // State
    milestones,
    hoveredMilestone,
    showAll,
    tooltipPos,
    companyCount,
    gapWeights,

    // Actions
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    toggleShowAll,

    // Helpers
    getArrangementLabel,
    getGapFlex,
    formatDateRange,
    formatDuration,
  };
};
