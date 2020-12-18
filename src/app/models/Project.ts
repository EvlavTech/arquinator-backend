import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import Task from './Task';

class Project extends Model {
    public name!: string;

    public description!: string;

    public owner_id!: number;

    public start_date!: Date;

    public end_date!: Date;
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
    },
    {
        sequelize: database.connection,
        tableName: 'Projects',
    },
);

Project.hasMany(Task, { foreignKey: 'projet_id', as: 'tasks' });

export default Project;
