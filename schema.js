const Db = require("./utils/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const User = new GraphQLObjectType({
  name: "User",
  description: "This represents a User",
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve(user) {
          return user.id;
        },
      },
      firstName: {
        type: GraphQLString,
        resolve(user) {
          return user.firstName;
        },
      },
      lastName: {
        type: GraphQLString,
        resolve(user) {
          return user.lastName;
        },
      },
      property: {
        type: new GraphQLList(Property),
        resolve(user) {
          return user.getProperties();
        },
      },
    };
  },
});

const Property = new GraphQLObjectType({
  name: "Property",
  description: "Property addresses",
  fields() {
    return {
      id: {
        type: GraphQLString,
        resolve(prop) {
          return prop.id;
        },
      },
      street: {
        type: GraphQLString,
        resolve(prop) {
          return prop.street;
        },
      },
      city: {
        type: GraphQLString,
        resolve(prop) {
          return prop.city;
        },
      },
      state: {
        type: GraphQLString,
        resolve(prop) {
          return prop.state;
        },
      },
      zip: {
        type: GraphQLString,
        resolve(prop) {
          return prop.zip;
        },
      },
      rent: {
        type: GraphQLString,
        resolve(prop) {
          return prop.rent;
        },
      },
      user: {
        type: User,
        resolve(prop) {
          return prop.getUser();
        },
      },
    };
  },
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root query object",
  fields: () => {
    return {
      user: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLString,
          },
          firstName: {
            type: GraphQLString,
          },
          lastName: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          const result1 = Db.models.users.findAll({
            where: args,
          });
          return result1;
        },
      },

      searchUser: {
        type: new GraphQLList(User),
        args: {
          key: { type: GraphQLString },
        },
        resolve(parentValue, args) {
          return Db.models.users.findAll({
            where: {
              [Op.or]: [
                {
                  firstName: {
                    [Op.like]: "%" + args.key + "%",
                  },
                },
                {
                  lastName: {
                    [Op.like]: "%" + args.key + "%",
                  },
                },
              ],
            },
          });
        },
      },
      property: {
        type: new GraphQLList(Property),
        resolve(root, args) {
          return Db.models.property.findAll({ where: args });
        },
      },
      searchProperty: {
        type: new GraphQLList(Property),
        args: {
          key: { type: GraphQLString },
        },
        resolve(parentValue, args) {
          return Db.models.property.findAll({
            where: {
              [Op.or]: [
                {
                  street: {
                    [Op.like]: "%" + args.key + "%",
                  },
                },
                {
                  city: {
                    [Op.like]: "%" + args.key + "%",
                  },
                },
                {
                  state: {
                    [Op.like]: "%" + args.key + "%",
                  },
                },
                {
                  zip: {
                    [Op.like]: "%" + args.key + "%",
                  },
                },
                {
                  rent: {
                    [Op.like]: "%" + args.key + "%",
                  },
                },
              ],
            },
          });
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: mutation,
});
