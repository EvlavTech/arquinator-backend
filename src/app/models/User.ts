import DataTypes, { Sequelize, Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

import GenericModel, { DB } from './GenericModel';

export interface IUser {
    id: number;

    name: string;

    email: string;

    company_id: number;

    avatar?: string;

    avatar_url?: string;
}

export interface IUserSession {
    id: number;

    name: string;

    email: string;

    password_hash: string;
}

class User extends GenericModel implements IUser {
    public id!: number;

    public name!: string;

    public email!: string;

    public password!: string;

    public password_hash!: string;

    public company_id!: number;

    public avatar!: string;

    public avatar_url?: string;

    checkPassword(password: string) {
        return bcryptjs.compare(password, this.password_hash);
    }

    static associate(models: DB) {
        User.hasMany(models.Task, {
            foreignKey: 'owner_id',
            as: 'task_creator',
        });
        User.hasMany(models.Task, {
            foreignKey: 'responsible_id',
            as: 'responsible_task',
        });
        User.hasMany(models.TaskTemplate, {
            foreignKey: 'owner_id',
            as: 'task_template_creator',
        });
        User.belongsToMany(models.Permission, { through: 'UserPermissions' });
    }

    public static initModel(connection: Sequelize): void {
        User.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    allowNull: false,
                    unique: true,
                    type: DataTypes.STRING,
                },
                password: DataTypes.VIRTUAL,
                password_hash: {
                    type: DataTypes.STRING,
                },
                avatar: {
                    allowNull: true,
                    type: DataTypes.STRING,
                },
                avatar_url: {
                    type: DataTypes.VIRTUAL,
                    get() {
                        return `http://${process.env.APP_URL}/files/${this.avatar}`
                    }
                },
                company_id: {
                    type: DataTypes.INTEGER,
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
                sequelize: connection,
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
    }
}

export default User;
