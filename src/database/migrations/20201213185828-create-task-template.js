module.exports = {
    up: async (queryInterface, Sequelize) => {
        const TaskTemplateTable = queryInterface.createTable('taskTemplate', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            duration: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            project_template_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'projectTemplate',
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
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        return TaskTemplateTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('taskTemplate'),
};
