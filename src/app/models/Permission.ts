import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import User from './User';

class Permission extends Model {
    public user_id!: number;

    public permission!: string;
}

Permission.init(
    {
        user_id: Sequelize.INTEGER,
        permission: Sequelize.STRING,
    },
    {
        sequelize: database.connection,
    },
);

Permission.hasMany(User);

export default Permission;
