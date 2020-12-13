import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

class ProjectTemplate extends Model {
    public name!: string;

    public description!: string;

    public client_id!: number;
}

ProjectTemplate.init(
    {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        client_id: Sequelize.INTEGER,
    },
    {
        sequelize: database.connection,
    },
);

export default ProjectTemplate;
