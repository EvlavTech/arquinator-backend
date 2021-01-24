import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

class Permission extends GenericModel {
    public user_id!: number;

    public permission!: string;

    public static initModel(connection: Sequelize): void {
        Permission.init(
            {
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                permission: {
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
