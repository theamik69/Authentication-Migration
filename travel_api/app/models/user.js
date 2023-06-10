'use strict';

const {
  // eslint-disable-next-line comma-dangle
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Booking, { foreignKey: 'user_id' });
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    hooks: {
      // eslint-disable-next-line no-unused-vars
      afterCreate: async (user, option) => {
        console.log('>> user afterCreate', sequelize?.models);
        // query insert into logs
        try {
          await sequelize.models.Auditlog.create({
            table_name: 'Users',
            task: 'insert',
            description: `Proses Insert dengan data ${JSON.stringify(user.toJSON())}`,
          });
        } catch (e) {
          console.log('>> error user afterCreate', e);
        }
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
