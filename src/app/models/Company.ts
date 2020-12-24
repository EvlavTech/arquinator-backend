import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import Client from './Client';
import User from './User';

export interface ICompany {
    name: string;
}

class Company extends Model {
    public name!: string;
}

Company.init(
    {
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
    },
    {
        sequelize: database.connection,
        tableName: 'Companies',
    },
);

Company.hasMany(Client, { foreignKey: 'company_id', as: 'clients' });
Company.hasMany(User, { foreignKey: 'company_id', as: 'users' });

export default Company;
