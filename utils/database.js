const Sequelize = require("sequelize");
const _ = require("lodash");
const Faker = require("faker");

//Change credentials as needed
const sequelize = new Sequelize("node-db", "root", "sql123Xzaf", {
  dialect: "mysql",
  host: "localhost",
  operatorsAliases: false,
});

const User = sequelize.define("users", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
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

const Property = sequelize.define("property", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
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
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Relationship
User.hasMany(Property);
Property.belongsTo(User);

//Create 10 users and 10 properties
sequelize.sync({ force: true }).then(() => {
  _.times(10, () => {
    return User.create({
      id: Faker.datatype.uuid(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
    }).then((user) => {
      return user.createProperty({
        id: Faker.datatype.uuid(),
        street: Faker.address.streetName(),
        city: Faker.address.city(),
        state: Faker.address.state(),
        zip: Faker.address.zipCode(),
        rent: Faker.commerce.price(),
      });
    });
  });
});

module.exports = sequelize;
