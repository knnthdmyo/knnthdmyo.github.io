import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Technology {
  name: string;
  color: string;
  icon: IconDefinition;
  link: string;
}

export interface TechnologyCategories {
  languages: Technology[];
  frontendFrameworks: Technology[];
  backendFrameworks: Technology[];
  databases: Technology[];
  tools: Technology[];
  libraries: Technology[];
  aiTooling: Technology[];
}
