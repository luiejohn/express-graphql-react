const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Property = sequelize.define("property", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rent: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
});

module.exports = Property;
