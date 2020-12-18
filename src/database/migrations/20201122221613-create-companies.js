module.exports = {
    up: async (queryInterface, Sequelize) => {
        const CompaniesTable = queryInterface.createTable('Companies', {
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
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        return CompaniesTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('Companies'),
};
