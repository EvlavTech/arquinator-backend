import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

class Permission extends Model {
    public user_id!: number;

    public permission!: string;
}

Permission.init(
    {
        user_id: {
            type: Sequelize.INTEGER,
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
            type: Sequelize.STRING,
        },
    },
    {
        sequelize: database.connection,
        tableName: 'Permissions',
    },
);

export default Permission;
