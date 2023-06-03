'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    const pricelist = [
      {
        id: 1,
        departure: 'BANDUNG',
        destination: 'JAKARTA',
        price: 130000,
      },
      {
        id: 2,
        departure: 'BANDUNG',
        destination: 'KARAWANG',
        price: 100000,
      },
      {
        id: 3,
        departure: 'JAKARTA',
        destination: 'BANDUNG',
        price: 130000,
      },
      {
        id: 4,
        departure: 'JAKARTA',
        destination: 'KARAWANG',
        price: 100000,
      },
      {
        id: 5,
        departure: 'KARAWANG',
        destination: 'BANDUNG',
        price: 70000,
      },
      {
        id: 6,
        departure: 'KARAWANG',
        destination: 'JAKARTA',
        price: 70000,
      },
    ];
    await queryInterface.bulkInsert('Prices', pricelist);
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Prices');
  },
};
