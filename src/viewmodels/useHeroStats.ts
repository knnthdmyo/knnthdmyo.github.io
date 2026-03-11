import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { ExperienceService } from '@/services';
import { formatHours } from '@/utils';

const CAREER_START = dayjs('2019-03-19');
const VACANT_START = dayjs('2024-10-01');
const VACANT_END = dayjs('2025-01-01');
const HOURS_PER_WEEK = 45; // Average of 40-50 hrs/week

interface HeroStats {
  years: number;
  hours: number;
  companies: number;
  projects: number;
}

export const useHeroStats = () => {
  const [stats, setStats] = useState<HeroStats>({
    years: 0,
    hours: 0,
    companies: 0,
    projects: 10, // Static value for projects worked on
  });

  const companyCount = ExperienceService.getCompanyCount();

  useEffect(() => {
    const calculateStats = () => {
      const now = dayjs();
      const totalYears = now.diff(CAREER_START, 'year', true);
      const gapYears = VACANT_END.diff(VACANT_START, 'year', true);
      const diffYears = totalYears - gapYears;

      const totalWeeks = now.diff(CAREER_START, 'week', true);
      const gapWeeks = VACANT_END.diff(VACANT_START, 'week', true);
      const diffWeeks = totalWeeks - gapWeeks;
      const hours = Math.floor(diffWeeks * HOURS_PER_WEEK);

      setStats({
        years: Math.floor(diffYears * 10) / 10,
        hours,
        companies: companyCount,
        projects: 8,
      });
    };

    calculateStats();
    const interval = setInterval(calculateStats, 1000 * 60); // Update every minute

    return () => clearInterval(interval);
  }, [companyCount]);

  return {
    stats,
    formatHours,
  };
};
