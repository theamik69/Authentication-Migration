'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: 'user_roles',
        foreignKey: 'userId',
        otherKey: 'roleId'
      });
  
      User.hasMany(models.Status, {
        foreignKey: 'user_id',
        as: 'statuses',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
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