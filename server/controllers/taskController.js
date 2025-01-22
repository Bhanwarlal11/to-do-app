const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      userId: req.user._id,
    });
    res
      .status(201)
      .json({ success: true, message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// const updateTask = async (req, res) => {
//   const { id } = req.params;
//   const { title, description, isCompleted } = req.body;

//   try {
//     const task = await Task.findByIdAndUpdate(
//       id,
//       { title, description, isCompleted },
//       { new: true }
//     );
//     res.json({ success: true, message: "Task updated successfully", task });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
