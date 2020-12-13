module.exports = {
    up: async (queryInterface, Sequelize) => {
        const AddColumn = queryInterface.addColumn('users', 'company_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'companies',
                key: 'id',
            },
        });

        return AddColumn;
    },

    down: async (queryInterface) =>
        queryInterface.removeColumn('users', 'company_id'),
};
