import dayjs from 'dayjs';
import { Milestone, WorkArrangement } from '@/models';

export const calculateGapWeights = (milestones: Milestone[]): number[] => {
  const weights: number[] = [];
  for (let i = 0; i < milestones.length - 1; i++) {
    const current = milestones[i];
    const next = milestones[i + 1];

    // Education/achievement milestones get minimal gap (decorative only)
    if (current.type !== 'work' || next.type !== 'work') {
      weights.push(0.5); // Small fixed gap for non-work milestones
      continue;
    }

    // Gap is from current's end to next's start (work experiences only)
    const currentEnd = current.endDate ? dayjs(current.endDate) : dayjs();
    const nextStart = dayjs(next.startDate);
    const monthsGap = Math.max(1, nextStart.diff(currentEnd, 'month'));
    weights.push(monthsGap);
  }
  return weights;
};

export const getGapFlex = (gapWeights: number[], index: number): number => {
  if (index >= gapWeights.length) return 1;
  const weight = gapWeights[index];
  // Non-work gaps stay small
  if (weight <= 0.5) return 0.5;
  // Work gaps: very subtle differences
  const workWeights = gapWeights.filter((w) => w > 0.5);
  if (workWeights.length === 0) return 1;
  const minWorkWeight = Math.min(...workWeights);
  const ratio = weight / minWorkWeight;
  // Noticeable gaps: base 1, add larger percentage of difference
  // ratio 1 = 1, ratio 4 = 1.7, ratio 9 = 2.1
  return 1 + Math.log(ratio) * 0.5;
};

export const formatDateRange = (start: Date, end: Date | null): string => {
  const startYear = dayjs(start).year();
  const endYear = end ? dayjs(end).year() : null;
  if (!endYear || startYear === endYear) return `${startYear}`;
  return `${startYear} - ${endYear}`;
};

export const formatDuration = (start: Date, end: Date | null): string => {
  const endDate = end ? dayjs(end) : dayjs();
  const months = endDate.diff(dayjs(start), 'month');
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths}mo`;
  if (remainingMonths === 0) return `${years}yr`;
  return `${years}yr ${remainingMonths}mo`;
};

export const getArrangementLabel = (arrangement: WorkArrangement): string => {
  switch (arrangement) {
    case 'onsite':
      return 'Onsite';
    case 'remote':
      return 'Remote';
    case 'hybrid':
      return 'Hybrid';
  }
};
