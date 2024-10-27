const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');

const app = express();


// Set up GraphQL endpoint with the schema
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema, // Pass the imported schema here
    graphiql: true, // Enable GraphiQL interface for testing
  })
);

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
