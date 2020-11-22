import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import Project from './Project';

class Client extends Model {
    public name!: string;

    public company_id!: number;
}

Client.init(
    {
        name: Sequelize.STRING,
        company_id: Sequelize.INTEGER,
    },
    {
        sequelize: database.connection,
    },
);

Client.hasMany(Project);

export default Client;
