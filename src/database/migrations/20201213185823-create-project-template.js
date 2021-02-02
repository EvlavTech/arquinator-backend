module.exports = {
    up: async (queryInterface, Sequelize) => {
        const ProjectTemplateTable = queryInterface.createTable(
            'ProjectsTemplates',
            {
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
                description: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                owner_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Clients',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                duration: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            },
        );

        return ProjectTemplateTable;
    },

    down: async (queryInterface) =>
        queryInterface.dropTable('ProjectsTemplates'),
};
