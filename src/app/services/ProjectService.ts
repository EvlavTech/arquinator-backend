import ProjectRepository from '@repositories/ProjectRepository';
import ProjectTemplateRepository from '@repositories/ProjectTemplateRepository';

import Project, { IProject } from '@models/Project';
import { IProjectTemplate } from '@models/ProjectTemplate';

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
            throw new BaseError(`Project Template with ID = ${projectBody.template_id} not found!`, 404);
        }
        const projectCreated = await ProjectRepository.create(
            this.makeProject(projectBody, projectTemplate),
        );

        return projectCreated;
    }

    private makeProject(project: IProject, projectTemplate: IProjectTemplate) {
        const date = new Date(project.start_date);
        project.name = projectTemplate.name;
        project.description = projectTemplate.description;
        project.owner_id = projectTemplate.owner_id;
        date.setDate(date.getDate() + projectTemplate.duration);
        project.end_date = date;
        project.template_id = projectTemplate.id;
        return project;
    }
}

export default new ProjectService(ProjectRepository);
