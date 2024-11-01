const mongoose = require('mongoose');
// Create a constant Schema that references mongoose.Schema
const Schema = mongoose.Schema;

// Define the schema for the task
const taskSchema = new Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  description: { type: String, required: true },
  projectId: { type: String, required: true }, // Reference to the project ID
});

// Export the model
module.exports = mongoose.model('Task', taskSchema);
