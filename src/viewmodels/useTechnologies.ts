import { TechnologyService } from '@/services';

export const useTechnologies = () => {
  const technologies = TechnologyService.getAll();
  const totalCount = TechnologyService.getTotalCount();

  const categorizedTechnologies = [
    { title: 'Languages', items: technologies.languages },
    { title: 'Frontend', items: technologies.frontendFrameworks },
    { title: 'Backend', items: technologies.backendFrameworks },
    { title: 'Databases', items: technologies.databases },
    { title: 'Tools', items: technologies.tools },
    { title: 'Libraries', items: technologies.libraries },
  ];

  return {
    technologies,
    categorizedTechnologies,
    totalCount,
  };
};
