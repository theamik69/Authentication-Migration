'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    departure_date: DataTypes.DATE,
    departure_time: DataTypes.STRING,
    departure_location: DataTypes.STRING,
    dastination: DataTypes.STRING,
    passenger_count: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};