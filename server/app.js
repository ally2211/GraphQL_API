const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4'); // Updated import
const { json } = require('body-parser');
const cors = require('cors');

const app = express();

// Define your type definitions and resolvers
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server and configure middleware
async function startServer() {
  await server.start();
  app.use('/graphql', cors(), json(), expressMiddleware(server));
  
  app.listen(4000, () => {
    console.log('Server running at http://localhost:4000/graphql');
  });
}

startServer();
