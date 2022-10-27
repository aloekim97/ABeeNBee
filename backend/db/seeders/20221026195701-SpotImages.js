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
   await queryInterface.bulkInsert("SpotImages", [
    {
      spotId: 1,
      url: "1",
      preview: true
    },
    {
      spotId: 1,
      url: "2",
      preview: false
    },
    {
      spotId: 1,
      url: "3",
      preview: false
    },
    {
      spotId: 2,
      url: "4",
      preview: true
    },
    {
      spotId: 2,
      url: "5",
      preview: false
    },
    {
      spotId: 2,
      url: "6",
      preview: false
    },
    {
      spotId: 3,
      url: "7",
      preview: true
    },
    {
      spotId: 3,
      url: "8",
      preview: false
    },
    {
      spotId: 3,
      url: "9",
      preview: false
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
     await queryInterface.bulkDelete("SpotImages")
  }
};
