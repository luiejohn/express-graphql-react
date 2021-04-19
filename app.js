const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const sequelize = require("./utils/database");
const app = express();
const cors = require("cors");

//allow cross-origin-request
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// sequelize
//   .sync()
//   .then((res) => {})
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(4000, () => {
  console.log("Server is running on port 4000..");
});
