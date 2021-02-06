module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserPermissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            permission_id: {
                allowNull: false,
                references: {
                    model: 'Permissions',
                    key: 'id',
                },
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('UserPermissions');
    },
};
