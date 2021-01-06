import ProjectRepository from '@repositories/ProjectRepository';
import ProjectTemplateRepository from '@repositories/ProjectTemplateRepository';

import Project, { IProject } from '@models/Project';
import { IProjectTemplate } from '@models/templates/ProjectTemplate';

import BaseService from './BaseService';
import BaseError from '../errors/BaseError';

class ProjectService extends BaseService<Project, IProject> {
    async create(body: any) {
        const projectBody: IProject = body;
        if (!projectBody.template_id) {
            const object = await this.repository.create(body);

            return object;
        }

        const projectTemplate = await ProjectTemplateRepository.findById(
            projectBody.template_id,
        );
        if (!projectTemplate) {
            return new BaseError(`ProjectTemplate with ID = ${projectBody.template_id} not found!`, 404);
        }
        const projectCreated = await ProjectRepository.create(
            this.makeProject(projectBody, projectTemplate),
        );

        return projectCreated;
    }

    private makeProject(project: IProject, projectTemplate: IProjectTemplate) {
        project.name = projectTemplate.name;
        project.description = projectTemplate.description;
        project.owner_id = projectTemplate.owner_id;
        project.start_date = projectTemplate.start_date;
        project.end_date = projectTemplate.end_date;
        return project;
    }
}

export default new ProjectService(ProjectRepository);
