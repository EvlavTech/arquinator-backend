import 'dotenv/config';
import DataTypes, { Model, Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

import { DB } from '@models/GenericModel';

const basename = path.resolve(__dirname, '../app/models/');
const db: DB = {};

class Database {
    public connection: Sequelize;

    constructor() {
        this.connection = this.init();
        this.loadModels();
    }

    init() {
        return new Sequelize({
            dialect: 'postgres',
            host: process.env.HOST_DB,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            define: {
                timestamps: true,
                underscored: true,
            },
        });
    }

    loadModels() {
        fs.readdirSync(basename)
            .filter(
                (file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts',
            )
            .forEach((file) => {
                // O require foi usado para importar os models dinamicamente.
                // Não é uma boa prática, mas foi a única forma que conseguimos.
                const model = require(path.join(basename, file));
                model.default.initModel(this.connection);
                db[model.default.name] = model.default;
            });

        Object.keys(db).forEach((model) => {
            db[model].associate(db);
        });
    }
}

export default new Database();
