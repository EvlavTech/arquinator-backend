import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import Project from './Project';
import ProjectTemplate from './templates/ProjectTemplate';

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
Client.hasMany(ProjectTemplate);

export default Client;
