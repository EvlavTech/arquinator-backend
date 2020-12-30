import { Request, Response } from 'express';
import ProjectRepository from '@repositories/ProjectRepository';
import ProjectTemplateRepository from '@repositories/ProjectTemplateRepository';

import Project, { IProject } from '@models/Project';
import { IProjectTemplate } from '@models/templates/ProjectTemplate';

import BaseController from './BaseController';

class ProjectController extends BaseController<Project, IProject> {
    async store(req: Request, res: Response) {
        const projectBody: IProject = req.body;
        if (!projectBody.template_id) {
            const object = await this.repository.create(req.body);

            return res.status(201).json(object);
        }

        const projectTemplate = await ProjectTemplateRepository.findById(
            projectBody.template_id,
        );
        if (!projectTemplate) {
            return res.status(404).json({
                message: `ProjectTemplate with ID = ${projectBody.template_id} not found!`,
            });
        }
        const projectCreated = await ProjectRepository.create(
            this.makeProject(projectBody, projectTemplate),
        );

        return res.status(201).json(projectCreated);
    }

    private makeProject(project: IProject, projectTemplate: IProjectTemplate) {
        project.name = projectTemplate.name;
        project.description = projectTemplate.description;
        project.owner_id = projectTemplate.owner_id;
        return project;
    }
}

export default new ProjectController(ProjectRepository);
