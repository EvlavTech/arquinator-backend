import TaskTemplate, { ITaskTemplate } from '@models/templates/TaskTemplate';

import BaseRepository from './BaseRepository';

class TaskRepository extends BaseRepository<TaskTemplate, ITaskTemplate> {
}

export default new TaskRepository(TaskTemplate);
