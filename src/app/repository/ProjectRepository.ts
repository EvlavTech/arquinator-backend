import Project, { IProject } from '@models/Project';

import BaseRepository from './BaseRepository';

class ProjectRepository extends BaseRepository<Project, IProject> {
}

export default new ProjectRepository(Project);
