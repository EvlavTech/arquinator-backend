module.exports = {
    up: async (queryInterface, Sequelize) => {
        const ProjectsTable = queryInterface.createTable('Projects', {
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
                    model: 'Clients',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
            value: {
                allowNull: true,
                type: Sequelize.INTEGER,
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

    down: async (queryInterface) => queryInterface.dropTable('Projects'),
};
