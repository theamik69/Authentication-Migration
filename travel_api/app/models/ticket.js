'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ticket.belongsTo(models.Booking, { foreignKey: 'booking_id', as: 'tikets' });
      Ticket.belongsTo(models.Passenger, { foreignKey: 'passenger_id' });
    }
  }
  Ticket.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    booking_id: DataTypes.STRING,
    passenger_id: DataTypes.INTEGER,
    passenger_name: DataTypes.STRING,
    departure_date: DataTypes.DATE,
    departure_time: DataTypes.STRING,
    departure_location: DataTypes.STRING,
    destination: DataTypes.STRING,
    ticket_price: DataTypes.INTEGER,
    seat_number: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
