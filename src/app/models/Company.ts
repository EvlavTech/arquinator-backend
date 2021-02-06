import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface ICompany {
    id: number;
    name: string;
}

class Company extends GenericModel {
    public id!: number;

    public name!: string;

    static associate(models: DB) {
        Company.hasMany(models.Client, { foreignKey: 'company_id', as: 'clients' });
        Company.hasMany(models.User, { foreignKey: 'company_id', as: 'users' });
        Company.hasMany(models.Project, { foreignKey: 'company_id', as: 'projects' });
        Company.hasMany(models.ProjectTemplate, { foreignKey: 'company_id', as: 'projects_templates' });
    }

    public static initModel(connection: Sequelize): void {
        Company.init(
            {
                name: {
                    allowNull: false,
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize: connection,
                tableName: 'Companies',
            },
        );
    }
}

export default Company;
