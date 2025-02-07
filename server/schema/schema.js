const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');
const _ = require('lodash');
const Project = require('../models/project.js'); // Adjust the path as necessary
const Task = require('../models/task.js'); // Import the Task model if needed


// TaskType definition
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString},
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    projectId: { type: GraphQLID }, // Include projectId to relate to a project
    project: {
      type: ProjectType,
      resolve(parent) {
        // Find and return the project that matches parent.projectId
        //return _.find(projects, { id: parent.projectId.toString() });
        // Use Project model to find the project associated with this task
        return Project.findById(parent.projectId);
      },
    },
  }),
});
// ProjectType definition
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString},
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType), // Correctly specify type as a list of TaskType
      resolve(parent) {
        // Filter tasks by projectId that matches parent.id
        //return tasks.filter(task => task.projectId === parent.id);
        // Use Task model to find tasks with matching projectId
        return Task.find({ projectId: parent.id });
        },
    },
  }),
});
// RootQuery definition
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Find the task by id
        //return tasks.find(task => task.id === args.id);
        // Use lodash's find method to locate the task by id
        //return _.find(tasks, { id: args.id });
        // Ensure the id matches by converting it to a string
        //return _.find(tasks, { id: args.id.toString() });
        // Find a single task by ID using the Task model
        return Task.findById(args.id);
      },
    },
          // Field to fetch all tasks
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        //return tasks;
        // Return all tasks using the Task model
        return Task.find({});
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(projects, { id: args.id.toString() });
        return Project.findById(args.id)
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        //return projects;
        // Return all projects using the Project model
        return Project.find({});
      },
    },
  },
});

// Define the Mutation type
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) }, // Required field
        weight: { type: new GraphQLNonNull(GraphQLInt) },   // Required field
        description: { type: new GraphQLNonNull(GraphQLString) }, // Required field
      },
      resolve(parent, args) {
        // Create a new project instance using Mongoose model
        const project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        // Save to the database and return the result
        return project.save();
      },
    },
     addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) }, // Required field
        weight: { type: new GraphQLNonNull(GraphQLInt) },    // Required field
        description: { type: new GraphQLNonNull(GraphQLString) }, // Required field
        projectId: { type: new GraphQLNonNull(GraphQLID) },  // Required field to link with a project
      },
      resolve(parent, args) {
        const task = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId, // Associate task with projectId
        });
        return task.save(); // Save to the database and return the created task
      },
    },
  },
});

// Export the schema with both query and mutation
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
