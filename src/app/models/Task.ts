import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

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
        start_date: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        end_date: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        description: {
            allowNull: true,
            type: Sequelize.STRING,
        },
        projet_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Projects',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        task_parent_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Tasks',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        owner_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        responsible_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        done: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
        },
    },
    {
        sequelize: database.connection,
        tableName: 'Tasks',
    },
);

Task.belongsTo(Task, { foreignKey: 'task_parent_id', as: 'task_parent' });

export default Task;
