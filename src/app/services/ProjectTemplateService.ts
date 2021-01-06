import ProjectTemplateRepository from '@repositories/ProjectTemplateRepository';

import ProjectTemplate, { IProjectTemplate } from '@models/templates/ProjectTemplate';

import BaseService from './BaseService';

class ProjectTemplateService extends BaseService<ProjectTemplate, IProjectTemplate> {
}

export default new ProjectTemplateService(ProjectTemplateRepository);
