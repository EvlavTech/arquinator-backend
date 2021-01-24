import TaskRepository from '@repositories/TaskRepository';
import TaskTemplateRepository from '@repositories/TaskTemplateRepository';

import { ITaskTemplate } from '@models/TaskTemplate';
import Tasks, { ITask } from '@models/Task';

import BaseService from './BaseService';
import BaseError from '../errors/BaseError';

class TaskService extends BaseService<Tasks, ITask> {
    async create(body: any) {
        const taskBody: ITask = body;
        if (!taskBody.task_template_id) {
            const object = await this.repository.create(taskBody);
            return object;
        }

        const taskTemplate = await TaskTemplateRepository.findById(
            taskBody.task_template_id,
        );

        if (!taskTemplate) {
            return new BaseError(`Task Template with ID = ${taskBody.task_template_id} not found!`, 404);
        }
        const taskCreated = await this.repository.create(
            this.makeProject(taskBody, taskTemplate),
        );

        return taskCreated;
    }

    private makeProject(task: ITask, taskTemplate: ITaskTemplate) {
        const date = new Date();
        task.name = taskTemplate.name;
        task.start_date = date.toUTCString();
        date.setDate(date.getDate() + taskTemplate.duration);
        task.end_date = date.toUTCString();
        task.owner_id = taskTemplate.owner_id;
        task.task_template_id = taskTemplate.id;
        task.done = false;
        return task;
    }
}

export default new TaskService(TaskRepository);
