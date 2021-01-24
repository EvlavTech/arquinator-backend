import { Model } from 'sequelize';

import database from '@database/index';

export interface IUserPermission {
    userId: number;
    permissionId: number;
}

class UserPermission extends Model {
    public userId!: number;
    public permissionId!: number;
}

UserPermission.init(
    {},
    {
        sequelize: database.connection,
        tableName: 'UserPermissions',
    },
);

export default UserPermission;
