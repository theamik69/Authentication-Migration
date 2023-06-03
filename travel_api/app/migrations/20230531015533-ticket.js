'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      booking_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Bookings',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      passenger_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Passengers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      passenger_name: {
        type: Sequelize.STRING,
      },
      departure_date: {
        type: Sequelize.DATE,
      },
      departure_time: {
        type: Sequelize.STRING,
      },
      departure_location: {
        type: Sequelize.STRING,
      },
      destination: {
        type: Sequelize.STRING,
      },
      ticket_price: {
        type: Sequelize.INTEGER,
      },
      seat_number: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Tickets');
  },
};
