import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

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

export default Permission;
