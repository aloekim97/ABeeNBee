'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Spots';
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
   await queryInterface.bulkInsert(options, [
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
      price: 200.00
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
      price: 300.00
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
      price: 450.00
    },
    {
      ownerId: 1,
      address: "1 street",
      city: "Los Angeles",
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: 118.2437,
      name: "house 4",
      description: "a great place to be",
      price: 200.00
    },
    {
      ownerId: 2,
      address: "2 street",
      city: "Los Angeles",
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: 118.2437,
      name: "house 5",
      description: "a great place to be",
      price: 300.00
    },
    {
      ownerId: 1,
      address: "1 street",
      city: "Los Angeles",
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: 118.2437,
      name: "house 6",
      description: "a great place to be",
      price: 200.00
    },
    {
      ownerId: 2,
      address: "2 street",
      city: "Los Angeles",
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: 118.2437,
      name: "house 7",
      description: "a great place to be",
      price: 300.00
    },
    {
      ownerId: 2,
      address: "2 street",
      city: "Los Angeles",
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: 118.2437,
      name: "house 8",
      description: "a great place to be",
      price: 300.00
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options)
  }
};

