import 'dotenv/config';
import { Sequelize } from 'sequelize';


class Database {
  public connection: Sequelize;

  constructor() {
    this.connection = this.init();
  }

  init() {
    return new Sequelize({
      dialect: "postgres",
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
}

export default new Database();