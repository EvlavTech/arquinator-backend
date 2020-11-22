import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import Client from './Client';

class Project extends Model {
    public name!: string;

    public description!: string;

    public client_id!: number;

    public start_date!: Date;

    public end_date!: Date;
}

Project.init(
    {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        client_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
    },
    {
        sequelize: database.connection,
    },
);

export default Project;
