import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import Task from './Task';

export interface IProject {
    id: number;
    name: string;
    description: string;
    owner_id: number;
    start_date: Date;
    end_date: Date;
    template_id: number;
}

class Project extends Model {
    public id!: number;

    public name!: string;

    public description!: string;

    public owner_id!: number;

    public start_date!: Date;

    public end_date!: Date;

    public template_id!: number;
}

Project.init(
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
        template_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'ProjectsTemplates',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
    {
        sequelize: database.connection,
        tableName: 'Projects',
    },
);

Project.hasMany(Task, { foreignKey: 'projet_id', as: 'tasks' });

export default Project;
