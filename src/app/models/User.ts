import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

class User extends Model {
    public name!: string;

    public email!: string;

    public password!: string;
}

User.init(
    {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
    },
    {
        sequelize: database.connection,
    },
);

export default User;
