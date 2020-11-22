import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import Client from './Client';

class Company extends Model {
    public name!: string;
}

Company.init(
    {
        name: Sequelize.STRING,
    },
    {
        sequelize: database.connection,
    },
);

Company.hasMany(Client);

export default Company;
