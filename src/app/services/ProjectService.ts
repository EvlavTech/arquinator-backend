import ProjectRepository from '@repositories/ProjectRepository';
import ProjectTemplateRepository from '@repositories/ProjectTemplateRepository';
import ClientRepository from '@repositories/ClientRepository';
import sequelize from 'sequelize';
import { start } from 'repl';

import Project, { IProject } from '@models/Project';
import { IProjectTemplate } from '@models/ProjectTemplate';

import BaseService from './BaseService';
import BaseError from '../errors/BaseError';
import { getMonth } from '../utils/format_date';

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

    public async getProjectsByCompanyId(company_id: number) {
        const clients_company = await ClientRepository.find({
            attributes: ['id'],
            where: { company_id },
        });

        const projects = await ProjectRepository.find({
            attributes: [
                [sequelize.fn('sum', sequelize.col('value')), 'value'],
                [sequelize.fn('date_trunc', 'month', sequelize.col('start_date')), 'start_date'],
            ],
            where: { owner_id: clients_company.map((client) => client.id) },
            group: [sequelize.fn('date_trunc', 'month', sequelize.col('start_date'))],
        });

        const projects_formatted = projects.map((project) => {
            const { start_date, value } = project;
            const date = new Date(start_date.toString());
            const date_formatted = getMonth(date);
            return {
                total_amount: value,
                date: `${date_formatted}/${date.getUTCFullYear()}`,
            };
        });

        return projects_formatted;
    }
}

export default new ProjectService(ProjectRepository);
