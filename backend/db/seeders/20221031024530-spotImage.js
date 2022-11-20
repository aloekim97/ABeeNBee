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
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/dfe9fd1e-a010-43c9-b546-0bbc7d59f7f3.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/a39fa85a-8a4f-4774-b77c-91366ff5cd70.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/937eb2df-25b5-4351-b7d9-42da37e6eb91.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/d08b66d1-6eb0-4da5-8b9d-342b102a7449.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/a92c8bed-0d6a-435d-9072-2bca6a442a28.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/875ea373-9fa5-4632-9228-0bb8aa3efa88.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/a811a4d0-14d2-45f1-ac43-9964f61c261a.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/96bd40c8-a62a-4f4e-8c5e-f4a85656084a.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/efb19fc3-7027-4b95-aa85-41e9b1339224.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/6c04ca59-6e3b-4cf3-8cb2-210b01e4f09a.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/07c2691a-7a40-4740-bf9b-6e821b52547b.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/d96f67a7-39f3-46ab-a341-e3b57b2b1c2f.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/6b276b37-4ca4-44b1-a8cf-62eba91c8831.jpg?im_w=720',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/bc63427b-48a3-479e-b64f-7875c6ddca8f.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/b206fe45-1282-43f3-970d-8799e6c5a6c9.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-740807800483774592/original/6491cdaf-0dfa-46ad-b93a-a3f05382cbb1.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-740807800483774592/original/221e024f-9800-4ed8-9c36-b538101207f4.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-740807800483774592/original/27002407-70d1-418a-adff-5ac98789ebf6.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-740807800483774592/original/a913a420-953e-4741-ad4f-059dd3d9b91d.png?im_w=720',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-740807800483774592/original/8e5abed0-4864-4370-bf60-fcf27af06bdb.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/ca8633af-3e34-4d5d-9911-52dc04c93f6a.jpeg?im_w=960',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/f5f89044-d328-48e2-ade7-aa974bd89905.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/d8b7b02a-a9da-481d-a50f-45c49650625f.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/684fb868-e732-41eb-a284-37fb42067cd1.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/d6c6423d-8541-4465-9da4-2713c700886f.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/2ce2a515-078f-4c71-9b94-e2d0997f46d0.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/1d3faa49-0463-46a8-b080-c0223a685424.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/cf3318de-8d6f-4308-b705-10b39317759e.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/12998baa-87cb-43c5-9d98-cfcc097ce025.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/11b9ee04-a7cf-4c58-a23e-f8085e8baf36.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695961137509782450/original/04ac7c19-b120-4d01-a91d-10a80ecc0048.jpeg?im_w=960',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695961137509782450/original/1a62be75-18ef-42dc-9494-08f68e8f53da.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695961137509782450/original/7c098c95-fc64-45dd-9f6f-aa35adf7313d.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695961137509782450/original/3f10f5ba-50ea-47bd-86bf-45e56bfc981c.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-695961137509782450/original/6fd5bb5e-70d9-4920-ad72-16bfe4c97e15.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/4402ef01-5bb8-49c4-89b3-3652761d7a6d.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/a39fa85a-8a4f-4774-b77c-91366ff5cd70.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/937eb2df-25b5-4351-b7d9-42da37e6eb91.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/d08b66d1-6eb0-4da5-8b9d-342b102a7449.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/a92c8bed-0d6a-435d-9072-2bca6a442a28.jpeg?im_w=720',
      preview: false
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
     await queryInterface.bulkDelete("SpotImages")
  }
};
