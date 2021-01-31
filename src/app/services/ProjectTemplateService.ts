import ProjectTemplateRepository from '@repositories/ProjectTemplateRepository';
import ProjectRepository from '@repositories/ProjectRepository';

import ProjectTemplate, { IProjectTemplate } from '@models/ProjectTemplate';

import BaseService from './BaseService';
import BaseError from '../errors/BaseError';

class ProjectTemplateService extends BaseService<ProjectTemplate, IProjectTemplate> {
    async update(id: number, bodyUpdated: any) {
        const projectTemplateBefore = await this.repository.findById(id);
        if (!projectTemplateBefore) {
            throw new BaseError('Id not found!', 404);
        }
        const projects = (await ProjectRepository.findByFilters({
            template_id: id,
        })).filter((project) => {
            const end_date = new Date(project.start_date);
            end_date.setDate(end_date.getDate() + projectTemplateBefore.duration);
            return end_date.getTime() === project.end_date.getTime();
        });

        await this.repository.update(id, bodyUpdated);
        const projectsUpdate = projects.map((project) => ProjectRepository.update(
            project.id, bodyUpdated,
        ));

        Promise.all(projectsUpdate).then((values) => {
            console.log('Projects updateds: ', values);
        }).catch((err) => {
            console.error(err);
        });

        const projectTemplate = await this.repository.findById(id);
        return projectTemplate;
    }
}

export default new ProjectTemplateService(ProjectTemplateRepository);
