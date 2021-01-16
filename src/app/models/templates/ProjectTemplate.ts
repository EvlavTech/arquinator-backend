import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import Project from '@models/Project';

import TaskTemplate from './TaskTemplate';

export interface IProjectTemplate {
    name: string;
    description: string;
    owner_id: number;
    start_date: Date;
    end_date: Date;
}

class ProjectTemplate extends Model {
    public name!: string;

    public description!: string;

    public owner_id!: number;

    public start_date!: Date;

    public end_date!: Date;
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
        start_date: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        end_date: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    },
    {
        sequelize: database.connection,
        tableName: 'ProjectsTemplates',
    },
);

ProjectTemplate.hasMany(TaskTemplate, { foreignKey: 'project_template_id', as: 'tasks' });
ProjectTemplate.hasMany(Project, { foreignKey: 'template_id', as: 'template' });

export default ProjectTemplate;
