import ProjectTemplate, { IProjectTemplate } from '@models/templates/ProjectTemplate';

import BaseRepository from './BaseRepository';

class ProjectTemplateRepository extends BaseRepository<ProjectTemplate, IProjectTemplate> {
}

export default new ProjectTemplateRepository(ProjectTemplate);
