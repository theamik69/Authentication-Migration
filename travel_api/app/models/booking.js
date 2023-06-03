'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'user_id' });
      Booking.hasMany(models.Ticket, { foreignKey: 'booking_id', as: 'tickets' });
      Booking.hasMany(models.Passenger, { foreignKey: 'booking_id', as: 'passengers' });
    }
  }
  Booking.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    user_id: DataTypes.STRING,
    departure_date: DataTypes.DATE,
    departure_time: DataTypes.STRING,
    departure_location: DataTypes.STRING,
    destination: DataTypes.STRING,
    passenger_count: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
