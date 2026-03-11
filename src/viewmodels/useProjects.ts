import { useState } from 'react';
import { ProjectService } from '@/services';

export const useProjects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const projects = ProjectService.getProjects();
  const projectCount = ProjectService.getProjectCount();

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const isExpanded = (index: number): boolean => {
    return expandedIndex === index;
  };

  return {
    projects,
    projectCount,
    expandedIndex,
    toggleExpanded,
    isExpanded,
  };
};
