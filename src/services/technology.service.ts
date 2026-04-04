import { Technology, TechnologyCategories } from '@/models';
import {
  faCss3Alt,
  faDocker,
  faGitAlt,
  faGithub,
  faJs,
  faNodeJs,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBook,
  faChartLine,
  faClipboardList,
  faCode,
  faDatabase,
  faGlobe,
  faMobileScreen,
  faPalette,
  faRobot,
  faServer,
  faShieldHalved,
  faTable,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';

const LANGUAGES: Technology[] = [
  {
    name: 'TypeScript',
    color: '#3178C6',
    icon: faCode,
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    icon: faJs,
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    name: 'C#',
    color: '#512BD4',
    icon: faCode,
    link: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
  },
];

const FRONTEND_FRAMEWORKS: Technology[] = [
  {
    name: 'React',
    color: '#61DAFB',
    icon: faReact,
    link: 'https://react.dev/',
  },
  {
    name: 'React Native',
    color: '#61DAFB',
    icon: faMobileScreen,
    link: 'https://reactnative.dev/',
  },
  {
    name: 'Expo',
    color: '#000020',
    icon: faMobileScreen,
    link: 'https://expo.dev/',
  },
  {
    name: 'Next.js',
    color: '#000000',
    icon: faReact,
    link: 'https://nextjs.org/',
  },
  {
    name: 'Svelte',
    color: '#FF3E00',
    icon: faCode,
    link: 'https://svelte.dev/',
  },
  {
    name: 'Vue.js',
    color: '#42B883',
    icon: faCode,
    link: 'https://vuejs.org/',
  },
];

const BACKEND_FRAMEWORKS: Technology[] = [
  {
    name: 'Node.js',
    color: '#339933',
    icon: faNodeJs,
    link: 'https://nodejs.org/',
  },
  {
    name: 'Express',
    color: '#000000',
    icon: faServer,
    link: 'https://expressjs.com/',
  },
  {
    name: 'NestJS',
    color: '#E0234E',
    icon: faServer,
    link: 'https://nestjs.com/',
  },
  {
    name: 'AdonisJS',
    color: '#5A45FF',
    icon: faServer,
    link: 'https://adonisjs.com/',
  },
];

const DATABASES: Technology[] = [
  {
    name: 'SQL',
    color: '#00758F',
    icon: faDatabase,
    link: 'https://www.w3schools.com/sql/',
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    icon: faDatabase,
    link: 'https://www.mongodb.com/',
  },
];

const TOOLS: Technology[] = [
  {
    name: 'Git',
    color: '#F05032',
    icon: faGitAlt,
    link: 'https://git-scm.com/',
  },
  {
    name: 'Docker',
    color: '#2496ED',
    icon: faDocker,
    link: 'https://www.docker.com/',
  },
  {
    name: 'GitHub Actions',
    color: '#2088FF',
    icon: faGithub,
    link: 'https://github.com/features/actions',
  },
  {
    name: 'Jest',
    color: '#C21325',
    icon: faWandMagicSparkles,
    link: 'https://jestjs.io/',
  },
  {
    name: 'React Testing Library',
    color: '#E33332',
    icon: faWandMagicSparkles,
    link: 'https://testing-library.com/docs/react-testing-library/intro/',
  },
  {
    name: 'ESLint',
    color: '#4B32C3',
    icon: faShieldHalved,
    link: 'https://eslint.org/',
  },
  {
    name: 'Husky',
    color: '#42B983',
    icon: faCode,
    link: 'https://typicode.github.io/husky/',
  },
  {
    name: 'Storybook',
    color: '#FF4785',
    icon: faBook,
    link: 'https://storybook.js.org/',
  },
  {
    name: 'Figma',
    color: '#F24E1E',
    icon: faPalette,
    link: 'https://www.figma.com/',
  },
  {
    name: 'Jira',
    color: '#0052CC',
    icon: faClipboardList,
    link: 'https://www.atlassian.com/software/jira',
  },
];

const LIBRARIES: Technology[] = [
  {
    name: 'Redux',
    color: '#764ABC',
    icon: faReact,
    link: 'https://redux.js.org/',
  },
  {
    name: 'React Query',
    color: '#FF4154',
    icon: faReact,
    link: 'https://tanstack.com/query/latest',
  },
  {
    name: 'React Hook Form',
    color: '#EC5990',
    icon: faReact,
    link: 'https://react-hook-form.com/',
  },
  {
    name: 'Zod',
    color: '#3E67B1',
    icon: faShieldHalved,
    link: 'https://zod.dev/',
  },
  {
    name: 'React i18n',
    color: '#009688',
    icon: faGlobe,
    link: 'https://react.i18next.com/',
  },
  {
    name: 'Tailwind CSS',
    color: '#06B6D4',
    icon: faCss3Alt,
    link: 'https://tailwindcss.com/',
  },
  {
    name: 'Material UI',
    color: '#007FFF',
    icon: faPalette,
    link: 'https://mui.com/',
  },
  {
    name: 'agGrid',
    color: '#0084E7',
    icon: faTable,
    link: 'https://www.ag-grid.com/',
  },
  {
    name: 'Recharts',
    color: '#22B5BF',
    icon: faChartLine,
    link: 'https://recharts.org/',
  },
];

const AI_TOOLING: Technology[] = [
  {
    name: 'GitHub Copilot',
    color: '#000000',
    icon: faGithub,
    link: 'https://github.com/features/copilot',
  },
  {
    name: 'Claude',
    color: '#D97757',
    icon: faRobot,
    link: 'https://claude.ai/',
  },
  {
    name: 'OpenAI Codex',
    color: '#412991',
    icon: faRobot,
    link: 'https://openai.com/index/openai-codex/',
  },
  {
    name: 'MCP Servers',
    color: '#10B981',
    icon: faServer,
    link: 'https://modelcontextprotocol.io/',
  },
  {
    name: 'Prompt Engineering',
    color: '#8B5CF6',
    icon: faWandMagicSparkles,
    link: 'https://platform.openai.com/docs/guides/prompt-engineering',
  },
];

export const TechnologyService = {
  getAll(): TechnologyCategories {
    return {
      languages: LANGUAGES,
      frontendFrameworks: FRONTEND_FRAMEWORKS,
      backendFrameworks: BACKEND_FRAMEWORKS,
      databases: DATABASES,
      tools: TOOLS,
      libraries: LIBRARIES,
      aiTooling: AI_TOOLING,
    };
  },

  getLanguages(): Technology[] {
    return LANGUAGES;
  },

  getFrontendFrameworks(): Technology[] {
    return FRONTEND_FRAMEWORKS;
  },

  getBackendFrameworks(): Technology[] {
    return BACKEND_FRAMEWORKS;
  },

  getDatabases(): Technology[] {
    return DATABASES;
  },

  getTools(): Technology[] {
    return TOOLS;
  },

  getLibraries(): Technology[] {
    return LIBRARIES;
  },

  getAiTooling(): Technology[] {
    return AI_TOOLING;
  },

  getTotalCount(): number {
    return (
      LANGUAGES.length +
      FRONTEND_FRAMEWORKS.length +
      BACKEND_FRAMEWORKS.length +
      DATABASES.length +
      TOOLS.length +
      LIBRARIES.length +
      AI_TOOLING.length
    );
  },
};
