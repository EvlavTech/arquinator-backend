import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import User from './User';

class Task extends Model {
    public start_date!: string;

    public end_date!: string;

    public name!: string;

    public description!: string;

    public projet_id!: number;

    public task_parent_id!: number;

    public owner_id!: number;

    public responsible_id!: number;

    public done!: boolean;
}

Task.init(
    {
        start_date: Sequelize.DATE,
        end_date: Sequelize.STRING,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        projet_id: Sequelize.INTEGER,
        task_parent_id: Sequelize.INTEGER,
        owner_id: Sequelize.INTEGER,
        responsible_id: Sequelize.INTEGER,
        done: Sequelize.BOOLEAN,
    },
    {
        sequelize: database.connection,
    },
);

Task.belongsTo(Task, { foreignKey: 'task_parent_id', as: 'task_parent' });
Task.belongsTo(User, { foreignKey: 'responsible_id', as: 'responsible' });

export default Task;
