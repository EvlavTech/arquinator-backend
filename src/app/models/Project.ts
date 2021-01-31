import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface IProject {
    id: number;
    name: string;
    description: string;
    owner_id: number;
    start_date: Date;
    end_date: Date;
    value: number;
    template_id: number;
}

class Project extends GenericModel {
    public id!: number;

    public name!: string;

    public description!: string;

    public owner_id!: number;

    public start_date!: Date;

    public end_date!: Date;

    public value!: number;

    public template_id!: number;

    static associate(models: DB) {
        Project.hasMany(models.Task, { foreignKey: 'project_id', as: 'tasks' });
    }

    public static initModel(connection: Sequelize): void {
        Project.init(
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
                value: {
                    allowNull: true,
                    type: DataTypes.INTEGER,
                },
                template_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'ProjectsTemplates',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
            {
                sequelize: connection,
                tableName: 'Projects',
            },
        );
    }
}

export default Project;
