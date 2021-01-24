import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

class Task extends GenericModel {
    public start_date!: string;

    public end_date!: string;

    public name!: string;

    public description!: string;

    public projet_id!: number;

    public task_parent_id!: number;

    public owner_id!: number;

    public responsible_id!: number;

    public done!: boolean;

    static associate(models: DB) {
        Task.belongsTo(models.Task, { foreignKey: 'task_parent_id', as: 'task_parent' });
    }

    public static initModel(connection: Sequelize): void {
        Task.init(
            {
                start_date: {
                    allowNull: false,
                    type: DataTypes.DATE,
                },
                end_date: {
                    allowNull: false,
                    type: DataTypes.DATE,
                },
                name: {
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                description: {
                    allowNull: true,
                    type: DataTypes.STRING,
                },
                projet_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Projects',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                task_parent_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'Tasks',
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
                responsible_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                done: {
                    allowNull: false,
                    type: DataTypes.BOOLEAN,
                },
            },
            {
                sequelize: connection,
                tableName: 'Tasks',
            },
        );
    }
}

export default Task;
