const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose'); 
const app = express();



// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://myAtlasDBUser:HelloAgain22@myatlasclusteredu.asusjdu.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU'

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listener to confirm connection
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// Set up GraphQL endpoint with the schema
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema, // Pass the imported schema here
    graphiql: true, // Enable GraphiQL interface for testing
  })
);

app.listen(4002, () => {
  console.log('now listening for requests on port 4002');
});
