import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import TaskTemplate from './TaskTemplate';

export interface IProjectTemplate {
    name: string;
    description: string;
    owner_id: number;
}

class ProjectTemplate extends Model {
    public name!: string;

    public description!: string;

    public owner_id!: number;
}

ProjectTemplate.init(
    {
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        description: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        owner_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Clients',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
    {
        sequelize: database.connection,
        tableName: 'ProjectsTemplates',
    },
);

ProjectTemplate.hasMany(TaskTemplate, { foreignKey: 'project_template_id', as: 'tasks' });

export default ProjectTemplate;
