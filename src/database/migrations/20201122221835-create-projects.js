module.exports = {
    up: async (queryInterface, Sequelize) => {
        const ProjectsTable = queryInterface.createTable('projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            client_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'clients',
                    key: 'id',
                },
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            start_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            end_date: {
                allowNull: false,
                type: Sequelize.DATE,
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

        return ProjectsTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('projects'),
};
