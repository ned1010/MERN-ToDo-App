//This where we define the structure of the Database
//We will use the Mongoose library to do so

const mongoose = require("mongoose");

//define a schema of the model or the database
const todoSchema = new mongoose.Schema({
  id: { type: Number },
  text: { type: String },
});

//create mode from the schema
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo; //provides an interface to the this file
