const axios = require("axios");
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

// Sample Data
// const customers = [
//   { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 35 },
//   { id: "2", name: "Steve Smith", email: "steve@gmail.com", age: 25 },
//   { id: "3", name: "Sara Williams", email: "sara@gmail.com", age: 32 },
// ];

// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     id: { type: GraphQLInt },
//     firstName: { type: GraphQLString },
//     lastName: { type: GraphQLString },
//     // age: { type: GraphQLInt },
//   }),
// });

// // Root Query
// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     user: {
//       type: UserType,
//       args: {
//         id: { type: GraphQLInt },
//       },
//       resolve(parentValue, args) {
//         // for (let i = 0; i < customers.length; i++) {
//         //   if (customers[i].id == args.id) {
//         //     return customers[i];
//         //   }
//         //

//         // return axios
//         //   .get("http://localhost:3000/customers/" + args.id)
//         //   .then((res) => res.data);

//         return Db.models.person.findAll({ where: args });
//       },
//     },
//     users: {
//       type: new GraphQLList(UserType),
//       resolve(parentValue, args) {
//         // return axios
//         //   .get("http://localhost:3000/customers/")
//         //   .then((res) => res.data);
//         return Db.models.person.findAll({ where: args });
//       },
//     },
//   },
// });

// const mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     addCustomer: {
//       type: UserType,
//       args: {
//         name: {
//           type: new GraphQLNonNull(GraphQLString),
//         },
//         name: {
//           type: new GraphQLNonNull(GraphQLString),
//         },
//         name: {
//           type: new GraphQLNonNull(GraphQLString),
//         },
//       },

//       resolve(parentValue, args) {
//         return axios
//           .post("http://localhost:3000/customers/", {
//             name: args.name,
//             email: args.email,
//             age: args.age,
//           })
//           .then((res) => res.data);
//       },
//     },
//   },
// });

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
          console.log("args ");
          console.log(args);
          const result1 = Db.models.users.findAll({
            where: args,
          });
          // const result = {
          //   data: {
          //     result:
          //   }
          // };
          // console.log(result1);
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
        // args: {
        //   id: {
        //     type: GraphQLString,
        //   },
        //   street: {
        //     type: GraphQLString,
        //   },
        //   city: {
        //     type: GraphQLString,
        //   },
        //   zip: {
        //     type: GraphQLString,
        //   },
        // },
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
