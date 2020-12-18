import Sequelize, { Model } from 'sequelize';

import database from '@database/index';

import Project from './Project';
import ProjectTemplate from './templates/ProjectTemplate';

class Client extends Model {
    public name!: string;

    public company_id!: number;
}

Client.init(
    {
        name: {
            allowNull: false,
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
    },
);

Client.hasMany(Project, { foreignKey: 'owner_id', as: 'projects' });
Client.hasMany(ProjectTemplate, { foreignKey: 'owner_id', as: 'projects_templates' });

export default Client;
