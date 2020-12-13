module.exports = {
    up: async (queryInterface, Sequelize) => {
        const TaskTable = queryInterface.createTable('task', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            start_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            end_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            project_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'projects',
                    key: 'id',
                },
            },
            task_parent_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'task',
                    key: 'id',
                },
            },
            owner_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            responsible_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            done: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        return TaskTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('task'),
};
