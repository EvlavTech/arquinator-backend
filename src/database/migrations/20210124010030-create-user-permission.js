module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserPermissions', {
            userId: {
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            permissionId: {
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Permissions',
                    key: 'id',
                },
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('UserPermissions');
    },
};
