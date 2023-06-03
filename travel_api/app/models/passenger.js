'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Passenger.belongsTo(models.Booking, { foreignKey: 'booking_id', as: 'bookingId' });
      Passenger.hasOne(models.Ticket, { foreignKey: 'passenger_id', as: 'tiket' });
    }
  }
  Passenger.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    booking_id: DataTypes.STRING,
    full_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Passenger',
  });
  return Passenger;
};
