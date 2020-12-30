module.exports = {
    up: async (queryInterface, Sequelize) => {
        const AddColumn = queryInterface.addColumn('Projects', 'template_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'ProjectsTemplates',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        return AddColumn;
    },

    down: async (queryInterface) =>
        queryInterface.removeColumn('Projects', 'template_id'),
};
