import DataTypes, { Sequelize } from 'sequelize';
import bcryptjs from 'bcryptjs';

import GenericModel, { DB } from './GenericModel';

export interface IUser {
    id: number;

    name: string;

    email: string;

    company_id: number;
}

class User extends GenericModel {
    public id!: number;

    public name!: string;

    public email!: string;

    public password!: string;

    public password_hash!: string;

    public company_id!: number;

    checkPassword(password: string) {
        return bcryptjs.compare(password, this.password_hash);
    }

    static associate(models: DB) {
        User.hasMany(models.Task, { foreignKey: 'owner_id', as: 'task_creator' });
        User.hasMany(models.Task, { foreignKey: 'responsible_id', as: 'responsible_task' });
        User.hasMany(models.TaskTemplate, { foreignKey: 'owner_id', as: 'task_template_creator' });
        User.hasMany(models.Permission, { foreignKey: 'user_id', as: 'permission' });
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

        User.addHook('beforeSave', async (user:User): Promise<void> => {
            if (user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        });
    }
}

export default User;
