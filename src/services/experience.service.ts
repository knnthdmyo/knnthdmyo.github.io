import dayjs from 'dayjs';
import { WorkExperience, Milestone } from '@/models';

// Static data - in a real app, this could come from an API
const EXPERIENCES_DATA: WorkExperience[] = [
  {
    company: 'My School',
    role: 'Tech Lead | Frontend Developer III',
    startDate: dayjs('2026-02-02').toDate(),
    endDate: null,
    employmentType: 'fulltime',
    workArrangement: 'hybrid',
    description:
      'Leading frontend development using Next.js and modern React patterns, defining project architecture and scalable code practices. Responsible for sprint planning, task breakdown, and delegation to ensure consistent delivery. Work closely with the Project Manager to align technical execution with timelines and priorities, collaborate with the Design Team to translate UI/UX into production-ready interfaces, coordinate with DevOps for deployments, environments, and CI/CD workflows, and partner with Backend Engineers to design API contracts and ensure reliable integrations.',
  },
  {
    company: 'SNSoft Technologies Inc.',
    role: 'Frontend Developer',
    startDate: dayjs('2025-02-01').toDate(), // February 2025
    endDate: dayjs('2026-02-27').toDate(), // February 2026
    employmentType: 'fulltime',
    workArrangement: 'onsite',
    description:
      'I specialize in React Native development, building cross-platform mobile apps for iOS and Android with multi-device compatibility. I develop React web and H5 applications using TypeScript and Tailwind CSS, implementing Redux for scalable state management. I integrate frontend systems with REST, GraphQL, gRPC, and WebSocket APIs, and implement WebView postMessage listeners for native-web communication. I led a migration from dynamic React to static pages, improving SEO and load speed. I apply MVVM architecture and leverage AI tools like ChatGPT and Claude for refactoring and debugging.',
  },
  {
    company: 'Performativ UK',
    role: 'Frontend Developer',
    startDate: dayjs('2021-11-01').toDate(), // November 2021
    endDate: dayjs('2024-09-01').toDate(), // September 2024
    employmentType: 'fulltime',
    workArrangement: 'remote',
    description:
      'I led frontend development with React, TypeScript, Storybook, and Docker, improving performance and securing App Store approval. I mentored junior developers, conducted code reviews, and contributed to hiring. Additionally, I implemented mobile-first updates and enhanced product stability with rigorous testing. I collaborated with cross-functional teams to ensure effective communication, smooth workflow, and timely delivery of the app. This involved working closely with product managers and designers to refine user experiences, while coordinating with backend teams to ensure seamless integration and performance.',
  },
  {
    company: 'Extendops BPO',
    role: 'Fullstack Developer',
    startDate: dayjs('2020-10-01').toDate(), // October 2020
    endDate: dayjs('2022-01-01').toDate(), // January 2022
    employmentType: 'fulltime',
    workArrangement: 'hybrid',
    description:
      'I collaborated with US and Mexican teams across different time zones to ensure smooth communication and alignment. I refactored legacy code, optimized ReactFinalForm, and built a UI library with Svelte, Tailwind, and Storybook. I also developed RESTful APIs using AdonisJS and NestJS, improved performance with Redux, and streamlined backend functionality. I worked with backend developers to improve system architecture and enhance frontend-backend integration. Additionally, I regularly interacted with project managers to prioritize tasks and meet deadlines.',
  },
  {
    company: 'Stacktrek Enterprise Inc.',
    role: 'Junior Software Developer',
    startDate: dayjs('2019-03-01').toDate(), // March 2019
    endDate: dayjs('2020-10-01').toDate(), // October 2020
    employmentType: 'fulltime',
    workArrangement: 'onsite',
    description:
      "I worked with React and React Native, enhancing code maintainability for both web and mobile platforms. I built a messaging feature with backend developers and implemented React i18n to expand the app's reach to non-English-speaking users. I collaborated with both local and international teams, ensuring smooth project progress across different time zones. This involved coordinating with backend engineers to develop new features, and working with international teams to implement localization strategies and improve the app's global accessibility.",
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
