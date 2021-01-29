import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface IClient {
    id: number;

    name: string;

    company_id: number;
}

class Client extends GenericModel {
    id!: number;

    public name!: string;

    public company_id!: number;

    static associate(models: DB) {
        Client.hasMany(models.Project, { foreignKey: 'owner_id', as: 'projects' });
        Client.hasMany(models.ProjectTemplate, { foreignKey: 'owner_id', as: 'projects_templates' });
    }

    static initModel(connection: Sequelize) {
        Client.init(
            {
                name: {
                    allowNull: false,
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
                tableName: 'Clients',
            },
        );
    }
}

export default Client;
