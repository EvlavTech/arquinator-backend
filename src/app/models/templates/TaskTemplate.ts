import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

class TaskTemplate extends Model {
    public name!: string;

    public duration!: number;

    public task_template_id!: number;

    public owner_id!: number;
}

TaskTemplate.init(
    {
        name: Sequelize.STRING,
        duration: Sequelize.NUMBER,
        task_template_id: Sequelize.INTEGER,
        owner_id: Sequelize.INTEGER,
    },
    {
        sequelize: database.connection,
    },
);

export default TaskTemplate;
