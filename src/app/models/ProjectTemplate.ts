import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface IProjectTemplate {
    name: string;
    description: string;
    owner_id: number;
    start_date: Date;
    end_date: Date;
}

class ProjectTemplate extends GenericModel {
    public name!: string;

    public description!: string;

    public owner_id!: number;

    public start_date!: Date;

    public end_date!: Date;

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
                owner_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Clients',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                start_date: {
                    allowNull: false,
                    type: DataTypes.DATE,
                },
                end_date: {
                    allowNull: false,
                    type: DataTypes.DATE,
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
