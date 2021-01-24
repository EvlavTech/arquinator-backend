import DataTypes, { Sequelize } from 'sequelize';

import GenericModel from './GenericModel';

class TaskTemplate extends GenericModel {
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
                tableName: 'TasksTemplate',
            },
        );
    }
}

export default TaskTemplate;
