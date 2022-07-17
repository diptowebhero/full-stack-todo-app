const Todo = require("../../model/Todo");

//add new task controller
async function addNewTaskHandler(req, res) {
  try {
    const { taskName, priority, date } = req.body;
    const user = new Todo({
      taskName,
      priority,
      date,
      status: "pending",
      user: req.email,
    });
    const result = await user.save();
    if (result) {
      return res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
}

//delete task handler
async function deleteTaskHandler(req, res) {
  try {
    const taskId = req.params.taskId;
    const result = await Todo.findOneAndDelete({
      _id: taskId,
      user: req.email,
    });
    if (result) {
      res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
}

//update status
async function updateStatusHandler(req, res) {
  try {
    const taskId = req.params.taskId;
    const task = await Todo.findOne({ _id: taskId, user: req.email });
    const status = task.status === "pending" ? "complete" : "pending";

    const result = await Todo.findOneAndUpdate(
      {
        _id: taskId,
        user: req.email,
      },
      {
        $set: {
          status: status,
        },
      }
    );
    if (result) {
      res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
}

//update task
async function updateTaskHandler(req, res) {
  try {
    const _id = req.params.id;
    const { taskName, priority, date } = req.body;
    console.log(taskName, priority, date, _id);
    await Todo.findOneAndUpdate(
      {
        _id,
        user: req.email,
      },
      {
        $set: {
          taskName,
          priority,
          date,
        },
      }
    );
    res.redirect("/");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addNewTaskHandler,
  deleteTaskHandler,
  updateStatusHandler,
  updateTaskHandler,
};
