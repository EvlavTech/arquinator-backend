import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

import database from '@database/index';

import Task from './Task';
import Permission from './Permission';
import TaskTemplate from './templates/TaskTemplate';

class User extends Model {
    public name!: string;

    public email!: string;

    public password!: string;

    public password_hash!: string;

    checkPassword(password: string) {
        return bcryptjs.compare(password, this.password_hash);
    }
}

User.init(
    {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
    },
    {
        sequelize: database.connection,
    },
);

User.hasMany(Task);
User.hasMany(TaskTemplate);
User.hasMany(Permission);

User.addHook('beforeSave', async (user:User): Promise<void> => {
    if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
    }
});

export default User;
