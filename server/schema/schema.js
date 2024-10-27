const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');

// TaskType definition
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

// RootQuery definition
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        // Add code here to fetch data by id from your database
        return;
      },
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
});
