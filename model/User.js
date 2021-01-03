const Sequelize = require('sequelize');

module.exports = function (sequelize, dataTypes) {
  return sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: dataTypes.INTEGER
      },
      username: {
        type: dataTypes.CHAR(255),
        allowNull: false
      },
      password: {
        type: dataTypes.CHAR(255),
        allowNull: false
      },
      userId: {
        type: dataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      }
    },
    {
      sequelize
    }
  );
};
