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
      url: "img url",
      preview: true
    },
    {
      spotId: 1,
      url: "img url",
      preview: false
    },
    {
      spotId: 1,
      url: "img url",
      preview: false
    },
    {
      spotId: 2,
      url: "img url",
      preview: true
    },
    {
      spotId: 2,
      url: "img url",
      preview: false
    },
    {
      spotId: 2,
      url: "img url",
      preview: false
    },
    {
      spotId: 3,
      url: "img url",
      preview: true
    },
    {
      spotId: 3,
      url: "img url",
      preview: false
    },
    {
      spotId: 3,
      url: "img url",
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