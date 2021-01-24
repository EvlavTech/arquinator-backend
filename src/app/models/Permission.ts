import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import User from '@models/User';
import UserPermission from '@models/UserPermission';

export interface IPermission {
    name: string;
}

class Permission extends Model {
    public name!: string;
}

Permission.init(
    {
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
    },
    {
        sequelize: database.connection,
        tableName: 'Permissions',
    },
);

Permission.belongsToMany(User, {
    through: 'UserPermissions',
    foreignKey: 'permissionId',
});

export default Permission;
