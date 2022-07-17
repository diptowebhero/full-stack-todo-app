//dependencies
const { Router } = require("express");
const {
  addNewTaskHandler,
  deleteTaskHandler,
  updateStatusHandler,
  updateTaskHandler,
} = require("../controller/todo/todoControllers");
const { authChecker } = require("../middleware/auth/authMiddleware");
const todoRouter = Router();

//add new task handler
todoRouter.post("/addNewTask", authChecker, addNewTaskHandler);

//delete task handler
todoRouter.get("/deleteTask/:taskId", authChecker, deleteTaskHandler);

//update status
todoRouter.get("/updateStatus/:taskId", authChecker, updateStatusHandler);

//update task
todoRouter.post("/updateTask/:id", authChecker, updateTaskHandler);

module.exports = todoRouter;
