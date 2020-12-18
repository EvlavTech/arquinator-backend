import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

import database from '@database/index';

import Task from './Task';
import Permission from './Permission';
import TaskTemplate from './templates/TaskTemplate';

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

User.hasMany(Task, { foreignKey: 'owner_id', as: 'task_creator' });
User.hasMany(Task, { foreignKey: 'responsible_id', as: 'responsible_task' });
User.hasMany(TaskTemplate, { foreignKey: 'owner_id', as: 'task_template_creator' });
User.hasMany(Permission, { foreignKey: 'user_id', as: 'permission' });

User.addHook('beforeSave', async (user:User): Promise<void> => {
    if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
    }
});

export default User;
