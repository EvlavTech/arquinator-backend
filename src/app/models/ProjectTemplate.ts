import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface IProjectTemplate {
    id: number;
    name: string;
    description: string;
    client_id: number;
    duration: number;
}

class ProjectTemplate extends GenericModel {
    public id!: number;

    public name!: string;

    public description!: string;

    public client_id!: number;

    public duration!: number;

    static associate(models: DB) {
        ProjectTemplate.hasMany(models.TaskTemplate, { foreignKey: 'project_template_id', as: 'tasks' });
        ProjectTemplate.hasMany(models.Project, { foreignKey: 'template_id', as: 'template' });
    }

    public static initModel(connection: Sequelize): void {
        ProjectTemplate.init(
            {
                name: {
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                description: {
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                client_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Clients',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                duration: {
                    allowNull: false,
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize: connection,
                tableName: 'ProjectsTemplates',
            },
        );
    }
}

export default ProjectTemplate;
