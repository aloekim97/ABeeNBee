'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Reviews", [
    {
      spotId: 1,
      userId: 2,
      review: "was as good as wendy's 4 for 4!",
      stars: 5
    },
    {
      spotId: 2,
      userId: 3,
      review: "mediocre",
      stars: 3
    },
    {
      spotId: 3,
      userId: 1,
      review: "was not cash money",
      stars: 1
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reviews")
  }
};
