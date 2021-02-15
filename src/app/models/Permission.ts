import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface IPermission {
    id: number;
    name: string;
}

class Permission extends GenericModel {
    public id!: number;

    public name!: string;

    public static initModel(connection: Sequelize): void {
        Permission.init(
            {
                name: {
                    allowNull: false,
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize: connection,
                tableName: 'Permissions',
            },
        );
    }

    static associate(models: DB) {
        Permission.belongsToMany(models.User, { through: 'UserPermissions' });
    }
}

export default Permission;
