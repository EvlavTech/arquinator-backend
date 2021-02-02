import DataTypes, { Sequelize } from 'sequelize';

import GenericModel from './GenericModel';

export interface ITaskTemplate{
    id: number;
    name: string;
    duration: number;
    project_template_id: number;
    owner_id: number;
}

class TaskTemplate extends GenericModel {
    public id!: number;

    public name!: string;

    public duration!: number;

    public project_template_id!: number;

    public owner_id!: number;

    public static initModel(connection: Sequelize): void {
        TaskTemplate.init(
            {
                name: {
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                duration: {
                    allowNull: false,
                    type: DataTypes.INTEGER,
                },
                project_template_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'ProjectsTemplates',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                owner_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
            {
                sequelize: connection,
                tableName: 'TaskTemplate',
            },
        );
    }
}

export default TaskTemplate;
