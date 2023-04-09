const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const Todo = require("./model"); //mongoDB automatically creates a todos collections

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Connecting to database 'mongodb://localhost:27017/todo-app'
mongoose
  .connect("mongodb://localhost:/todoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to the DB"))
  .catch((err) => console.log(`have an error ${err}`));

//get to the home
app.get("/", async (req, res) => {
  res.send("hell there");
});

//Routes
//Route to show all the todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const { id, text } = req.body;
    const newTodo = new Todo({
      id: id,
      text: text,
    });
    const savedTodo = await newTodo.save(); //save() inserts the todo into the database
    res.json(savedTodo);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Invalid request sent");
  }
});

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //can also use findByIDAndUpdate
    await Todo.deleteOne({ id: id });
    res.json("Item deleted");
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Invalid delete request");
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    //I can also use findByIDAndUpdate ->
    const updateTodo = await Todo.updateOne(
      { id: id },
      { $set: { text: text } }
    );
    res.json(updateTodo);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Invalid request");
  }
});
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
