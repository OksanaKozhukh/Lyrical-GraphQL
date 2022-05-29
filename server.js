const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const cors = require("cors");

const schema = require("./server/schema/schema");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
