const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Users = sequelize.define("users", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Users;
