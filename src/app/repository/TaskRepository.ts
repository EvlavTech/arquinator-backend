import Project from '@models/Project';
import Task, { ITask } from '@models/Task';
import User from '@models/User';

import BaseRepository from './BaseRepository';

class TaskRepository extends BaseRepository<Task, ITask> {
    async findAll(): Promise<ITask[]> {
        const objects = Task.findAll<Task>({
            include: [
                {
                    model: User,
                    foreignKey: 'owner_id',
                    as: 'owner',
                },
                {
                    model: User,
                    foreignKey: 'responsible_id',
                    as: 'responsible',
                },
                {
                    model: Project,
                    as: 'project',
                },
            ],
        });
        return objects;
    }
}

export default new TaskRepository(Task);
