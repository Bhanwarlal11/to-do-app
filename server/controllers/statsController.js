const Task = require('../models/Task'); // Assuming Task model is in models/Task
const mongoose = require('mongoose');

// Function for Total Tasks Created, Pending, and Completed
const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({});
    const totalCompleted = await Task.countDocuments({ isCompleted: true });
    const totalPending = totalTasks - totalCompleted;

    res.json({
      success: true,
      totalTasks,
      totalCompleted,
      totalPending,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching task stats.' });
  }
};

// Function for Pie Chart Data
const getPieChartData = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({});
    const totalCompleted = await Task.countDocuments({ isCompleted: true });
    const totalPending = totalTasks - totalCompleted;

    res.json({
      labels: ['Completed', 'Pending', 'Created'],
      data: [totalCompleted, totalPending, totalTasks],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching pie chart data.' });
  }
};



module.exports = {
  getTaskStats,
  getPieChartData,
};
