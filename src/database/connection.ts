import {Sequelize} from 'sequelize';
require('dotenv/config');

const connection = new Sequelize(process.env.DB_NAME || "", 
    process.env.DB_USERNAME || "", 
    process.env.DB_PASSWORD || "",
    {
        dialect: 'postgres'
    }
);

export default connection;