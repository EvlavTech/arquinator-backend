module.exports = {
    up: async (queryInterface, Sequelize) => {
        const ClientsTable = queryInterface.createTable('Clients', {
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
            company_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Companies',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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

        return ClientsTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('Clients'),
};
