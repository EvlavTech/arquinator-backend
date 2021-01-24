import ProjectTemplate, { IProjectTemplate } from '@models/ProjectTemplate';

import BaseRepository from './BaseRepository';

class ProjectTemplateRepository extends BaseRepository<ProjectTemplate, IProjectTemplate> {
}

export default new ProjectTemplateRepository(ProjectTemplate);
