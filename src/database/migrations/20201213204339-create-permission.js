module.exports = {
    up: async (queryInterface, Sequelize) => {
        const PermissionsTable = queryInterface.createTable('Permissions', {
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
        });

        return PermissionsTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('Permissions'),
};
