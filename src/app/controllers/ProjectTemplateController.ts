import ProjectTemplateRepository from '@repositories/ProjectTemplateRepository';

import ProjectTemplate, { IProjectTemplate } from '@models/templates/ProjectTemplate';

import BaseController from './BaseController';

class ProjectTemplateController extends BaseController<ProjectTemplate, IProjectTemplate> {
}

export default new ProjectTemplateController(ProjectTemplateRepository);
