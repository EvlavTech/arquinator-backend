import DataTypes, { Sequelize } from 'sequelize';
import GenericModel from './GenericModel';

export interface IUserPermission {
    id: number;
    userId: number;
    permissionId: number;
}

class UserPermission extends GenericModel {
    public id!: number;
    public userId!: number;
    public permissionId!: number;

    public static initModel(connection: Sequelize): void {
        UserPermission.init(
            {
                userId: {
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                    type: DataTypes.INTEGER,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                permissionId: {
                    allowNull: false,
                    references: {
                        model: 'Permissions',
                        key: 'id',
                    },
                    type: DataTypes.INTEGER,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
            {
                sequelize: connection,
                tableName: 'UserPermissions',
            },
        );
    }
}

export default UserPermission;
