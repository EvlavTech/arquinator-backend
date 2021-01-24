import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

import database from '@database/index';

export interface IUser {
    id: number;

    name: string;

    email: string;

    company_id: number;
}

class User extends Model {
    public id!: number;

    public name!: string;

    public email!: string;

    public password!: string;

    public password_hash!: string;

    public company_id!: number;

    checkPassword(password: string) {
        return bcryptjs.compare(password, this.password_hash);
    }
    static associate = (models: any) => {
        User.hasMany(models.Task, {
            foreignKey: 'owner_id',
            as: 'task_creator',
        });
        User.hasMany(models.get(''), {
            foreignKey: 'responsible_id',
            as: 'responsible_task',
        });
        User.hasMany(models?.TaskTemplate, {
            foreignKey: 'owner_id',
            as: 'task_template_creator',
        });
        User.belongsToMany(models.Permission, {
            through: 'UserPermissions',
            foreignKey: 'userId',
        });
    };
}

User.init(
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING,
        },
        password: Sequelize.VIRTUAL,
        password_hash: {
            type: Sequelize.STRING,
        },
        company_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Companies',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
    {
        sequelize: database.connection,
        tableName: 'Users',
    },
);

User.addHook(
    'beforeSave',
    async (user: User): Promise<void> => {
        if (user.password) {
            user.password_hash = await bcryptjs.hash(user.password, 8);
        }
    },
);

export default User;
