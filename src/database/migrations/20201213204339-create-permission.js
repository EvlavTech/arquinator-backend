module.exports = {
    up: async (queryInterface, Sequelize) => {
        const PermissionsTable = queryInterface.createTable('permissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            permission: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });

        return PermissionsTable;
    },

    down: async (queryInterface, Sequelize) =>
        queryInterface.dropTable('permissions'),
};
