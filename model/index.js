const Sequelize = require('sequelize');

const UserModel = require('./User');

const { SQL_USER, SQL_PASSWORD } = process.env;

const sequelize = new Sequelize('taobai210103', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

const user = UserModel(sequelize, Sequelize.DataTypes);

user.sync().then(() => {
  console.log('User 表创建成功');
});

module.exports = {
  user
};
