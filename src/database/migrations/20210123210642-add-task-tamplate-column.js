module.exports = {
    up: async (queryInterface, Sequelize) => {
        const addColumn = queryInterface.addColumn('Tasks', 'task_template_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'TaskTemplate',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        return addColumn;
    },

    down: async (queryInterface) => {
        queryInterface.removeColumn('Tasks', 'task_template_id');
    },
};
