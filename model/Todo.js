//dependencies
const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: String,
    trim: true,
    required: true,
  },
});

const Todo = model("Todo", todoSchema);
module.exports = Todo;
