import ProjectRepository from '@repositories/ProjectRepository';
import ProjectTemplateRepository from '@repositories/ProjectTemplateRepository';

import Project, { IProject } from '@models/Project';
import { IProjectTemplate } from '@models/templates/ProjectTemplate';

import BaseService from './BaseService';

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
            return new Error(`ProjectTemplate with ID = ${projectBody.template_id} not found!`);
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
        return project;
    }
}

export default new ProjectService(ProjectRepository);
