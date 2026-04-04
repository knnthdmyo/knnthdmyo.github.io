import dayjs from 'dayjs';
import { WorkExperience, Milestone } from '@/models';

// Static data - in a real app, this could come from an API
const EXPERIENCES_DATA: WorkExperience[] = [
  {
    company: 'MySchool',
    role: 'Frontend Tech Lead',
    startDate: dayjs('2026-02-02').toDate(),
    endDate: null,
    employmentType: 'fulltime',
    workArrangement: 'hybrid',
    description:
      'Leading a team of 13 frontend engineers on a Next.js 16 / React 19 SaaS platform for school trip management across three portals (parent, teacher, admin). Architected a URL-driven multi-step form flow eliminating SSR hydration mismatches, designed an identity-verified access gateway, and built a CDN-backed asset registry on Azure Blob Storage. Established unit testing infrastructure from scratch, enforced compiler-level log suppression for zero-console production builds, and resolved multiple SSR hydration mismatches using useSyncExternalStore with deterministic server snapshots.',
  },
  {
    company: 'SNSoft Technology Inc.',
    role: 'Frontend Developer',
    startDate: dayjs('2025-02-01').toDate(), // February 2025
    endDate: dayjs('2026-02-01').toDate(), // February 2026
    employmentType: 'fulltime',
    workArrangement: 'onsite',
    description:
      'Built high-performance web and mobile apps using React, React Native, TypeScript, and Tailwind CSS. Developed cross-platform iOS and Android apps with broad device and OS compatibility. Integrated frontend with backend services via REST, GraphQL, gRPC, and WebSockets for real-time data. Led migration from a dynamic React app to static architecture improving load speed, SEO, and analytics accuracy. Applied MVVM architecture and AI tooling to accelerate development workflows.',
  },
  {
    company: 'Performativ UK',
    role: 'Frontend Developer',
    startDate: dayjs('2021-11-01').toDate(), // November 2021
    endDate: dayjs('2024-09-01').toDate(), // September 2024
    employmentType: 'fulltime',
    workArrangement: 'remote',
    description:
      'Built and maintained React applications with a focus on performance and mobile-first design. Implemented PWA features contributing to successful App Store approval. Developed analytics dashboards and reporting interfaces for SaaS business clients. Applied Redux, TanStack Query, and TypeScript for complex state management. Mentored junior developers, delegated tasks, and conducted code reviews. Delivered consistent releases via Docker and CI/CD pipelines.',
  },
  {
    company: 'XtendOps BPO',
    role: 'Frontend Developer',
    startDate: dayjs('2020-10-01').toDate(), // October 2020
    endDate: dayjs('2022-01-01').toDate(), // January 2022
    employmentType: 'fulltime',
    workArrangement: 'hybrid',
    description:
      'Developed and maintained React and Next.js applications for internal and client-facing platforms. Collaborated with US and Mexican teams across multiple time zones. Refactored legacy frontend code — optimized forms and resolved memory leaks. Built a reusable UI component library using Svelte, Tailwind CSS, and Storybook. Integrated RESTful APIs using AdonisJS and NestJS; eliminated redundant data fetching via Redux.',
  },
  {
    company: 'StackTrek Enterprise',
    role: 'Junior Frontend Developer',
    startDate: dayjs('2019-03-01').toDate(), // March 2019
    endDate: dayjs('2020-10-01').toDate(), // October 2020
    employmentType: 'fulltime',
    workArrangement: 'onsite',
    description:
      'Built React-based web applications, supporting core features and UI components. Implemented responsive layouts and integrated RESTful APIs with backend teams. Participated in agile workflows — sprint planning, task estimation, standups, and code reviews.',
  },
];

const EDUCATION_MILESTONES: Milestone[] = [
  {
    type: 'achievement',
    title: 'StackLeague',
    subtitle: 'Coding Tournament',
    startDate: dayjs('2019-02-01').toDate(), // February 2019
    endDate: dayjs('2019-02-01').toDate(), // February 2019
    description:
      'Participated and passed the StackLeague coding tournament, a competitive programming competition that opened doors to my first professional opportunity.',
  },
  {
    type: 'education',
    title: 'BS Information Technology',
    subtitle: 'Central Philippine University',
    startDate: dayjs('2018-04-01').toDate(), // 2018
    endDate: dayjs('2018-04-01').toDate(), // 2018
    description:
      'Thesis: Barangay Profiling Management System — Led development of a community-based profiling system in collaboration with the City Social Welfare and Development office. Designed statistical reporting and forecasting features to support government planning and decision-making.',
  },
];

export const ExperienceService = {
  getExperiences(): WorkExperience[] {
    return EXPERIENCES_DATA;
  },

  getMilestones(): Milestone[] {
    const workMilestones: Milestone[] = EXPERIENCES_DATA.map((exp) => ({
      type: 'work' as const,
      title: exp.role,
      subtitle: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      workArrangement: exp.workArrangement,
    }));

    return [...workMilestones, ...EDUCATION_MILESTONES];
  },

  getCompanyCount(): number {
    return EXPERIENCES_DATA.length;
  },
};
