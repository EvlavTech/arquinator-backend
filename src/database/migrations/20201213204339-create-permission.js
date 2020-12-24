module.exports = {
    up: async (queryInterface, Sequelize) => {
        const PermissionsTable = queryInterface.createTable('Permissions', {
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
                    model: 'Users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            permission: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });

        return PermissionsTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('Permissions'),
};
