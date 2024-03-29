import ProjectTemplate, { IProjectTemplate } from '@models/ProjectTemplate';

import BaseController from './BaseController';
import ProjectTemplateService from '../services/ProjectTemplateService';

class ProjectTemplateController extends BaseController<ProjectTemplate, IProjectTemplate> {
}

export default new ProjectTemplateController(ProjectTemplateService);
