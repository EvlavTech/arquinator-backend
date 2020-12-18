module.exports = {
    up: async (queryInterface, Sequelize) => {
        const AddColumn = queryInterface.addColumn('Users', 'company_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Companies',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        return AddColumn;
    },

    down: async (queryInterface) =>
        queryInterface.removeColumn('Users', 'company_id'),
};
