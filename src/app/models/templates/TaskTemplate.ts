import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

export interface ITaskTemplate{
    id: number;
    name: string;
    duration: number;
    project_template_id: number;
    owner_id: number;
}

class TaskTemplate extends Model {
    public id !: number;

    public name!: string;

    public duration!: number;

    public project_template_id!: number;

    public owner_id!: number;
}

TaskTemplate.init(
    {
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        duration: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        project_template_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'ProjectsTemplates',
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
    },
    {
        sequelize: database.connection,
        tableName: 'TaskTemplate',
    },
);

export default TaskTemplate;
