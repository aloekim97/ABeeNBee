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
   await queryInterface.bulkInsert("Spots", [
    {
      ownerId: 1,
      address: "1 street",
      city: "Los Angeles",
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: 118.2437,
      name: "house 1",
      description: "a great place to be",
      price: 200
    },
    {
      ownerId: 2,
      address: "2 street",
      city: "Los Angeles",
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: 118.2437,
      name: "house 2",
      description: "a great place to be",
      price: 200
    },
    {
      ownerId: 3,
      address: "3 street",
      city: "Los Angeles",
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: 118.2437,
      name: "house 3",
      description: "a great place to be",
      price: 200
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
     await queryInterface.bulkDelete("Spots")
  }
};
