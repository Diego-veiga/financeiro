module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('bills', 'active', Sequelize.BOOLEAN);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn('bills', 'active');
  }
};
