import Project, { IProject } from '@models/Project';

import ProjectRepository from '../repository/ProjectRepository';
import BaseController from './BaseController';

class ProjectController extends BaseController<Project, IProject> {
}

export default new ProjectController(ProjectRepository);
