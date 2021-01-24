import TaskTemplateRepository from '@repositories/TaskTemplateRepository';
import TaskRepository from '@repositories/TaskRepository';

import TaskTemplate, { ITaskTemplate } from '@models/TaskTemplate';

import BaseService from './BaseService';
import BaseError from '../errors/BaseError';

class TaskTemplateService extends BaseService<TaskTemplate, ITaskTemplate> {
    async update(id: number, bodyUpdated: any) {
        const taskTemplateBefore = await this.repository.findById(id);
        if (!taskTemplateBefore) {
            throw new BaseError('Id not found!', 404);
        }
        const tasks = await TaskRepository.findByFilters({
            task_template_id: id,
        });
        await this.repository.update(id, bodyUpdated);
        const tasksUpdate = await tasks.map((task) => TaskRepository.update(
            task.id, bodyUpdated,
        ));

        Promise.all(tasksUpdate).then((values) => {
            console.log('Updated tasks: ', values);
        }).catch((err) => {
            console.log(err);
        });

        const taskTemplate = await this.repository.findById(id);
        return taskTemplate;
    }
}

export default new TaskTemplateService(TaskTemplateRepository);
