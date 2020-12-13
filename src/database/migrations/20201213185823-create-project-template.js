module.exports = {
    up: async (queryInterface, Sequelize) => {
        const ProjectTemplateTable = queryInterface.createTable(
            'projectTemplate',
            {
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
                description: {
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
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            }
        );

        return ProjectTemplateTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('projectTemplate'),
};
