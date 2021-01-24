import Task, { ITask } from '@models/Task';

import BaseRepository from './BaseRepository';

class TaskRepository extends BaseRepository<Task, ITask> {
}

export default new TaskRepository(Task);
