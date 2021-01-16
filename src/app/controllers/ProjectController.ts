import Project, { IProject } from '@models/Project';

import BaseController from './BaseController';
import ProjectService from '../services/ProjectService';

class ProjectController extends BaseController<Project, IProject> {
}

export default new ProjectController(ProjectService);
