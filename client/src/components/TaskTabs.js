import React, { useEffect, useState } from "react";
import {
  Tab,
  Tabs,
  Box,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getTasks, updateTask, deleteTask } from "../api/api.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskTabs = ({ tasks, setTasks }) => {
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const token = useSelector((state) => state.auth.token);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await getTasks(token);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle task completion toggle
  const handleComplete = async (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (!task) return;

    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    try {
      const response = await updateTask(taskId, updatedTask, token);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === taskId ? response.data.task : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle task delete
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle task edit
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // Handle task update
  const handleUpdate = async () => {
    try {
      const response = await updateTask(editingTask._id, editingTask, token);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTask._id ? response.data.task : task
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Task list rendering
  const renderTask = (task) => (
    <motion.div
      key={task._id}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          marginBottom: "16px",
          borderBottom: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => handleComplete(task._id)}
            style={{ marginRight: "16px" }}
          />
          <div>
            {editingTask && editingTask._id === task._id ? (
              <>
                <TextField
                  label="Task Title"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Task Description"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                />
              </>
            ) : (
              <>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textDecoration: task.isCompleted ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                <p style={{ color: "#757575" }}>{task.description}</p>
              </>
            )}
          </div>
        </div>
        <div>
          {editingTask && editingTask._id === task._id ? (
            <Button
              onClick={handleUpdate}
              color="primary"
              variant="contained"
              sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              Save
            </Button>
          ) : (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, auto)" }, // Single column on small screens, two columns on larger screens
                  gap: "8px", // Space between buttons
                  alignItems: "center",
                }}
              >
                {!task.isCompleted ? (
                  <Button
                    onClick={() => handleEdit(task)}
                    color="primary"
                    variant="text"
                    sx={{
                      minWidth: "40px",
                      minHeight: "40px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <EditIcon />
                  </Button>
                ) : null}

                <Button
                  onClick={() => handleDelete(task._id)}
                  color="secondary"
                  variant="text"
                  sx={{
                    minWidth: "40px",
                    minHeight: "40px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            </div>
          )}
        </div>
      </Box>
    </motion.div>
  );

  return (
    // <Box sx={{ padding: "16px", maxWidth: "1200px", margin: "0 auto" }}>
    //   <Tabs
    //     value={tabValue}
    //     onChange={handleTabChange}
    //     centered
    //     sx={{ marginBottom: "16px" }}
    //   >
    //     <Tab label="Pending" />
    //     <Tab label="Completed" />
    //   </Tabs>

    //   <div style={{ marginTop: "16px" }}>
    //     {loading ? (
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <CircularProgress />
    //       </div>
    //     ) : (
    //       <div>
    //         {tasks
    //           .filter((task) =>
    //             tabValue === 0 ? !task.isCompleted : task.isCompleted
    //           )
    //           .map(renderTask)}
    //       </div>
    //     )}
    //   </div>
    // </Box>

    <Box sx={{ padding: "16px", maxWidth: "1200px", margin: "0 auto" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        sx={{ marginBottom: "16px" }}
      >
        <Tab label="Pending" />
        <Tab label="Completed" />
      </Tabs>

      <div style={{ marginTop: "16px" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div>
            {tasks.filter((task) =>
              tabValue === 0 ? !task.isCompleted : task.isCompleted
            ).length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#757575",
                  marginTop: "16px",
                }}
              >
                {tabValue === 0
                  ? "You don't have any pending tasks."
                  : "You don't have any completed tasks."}
              </div>
            ) : (
              tasks
                .filter((task) =>
                  tabValue === 0 ? !task.isCompleted : task.isCompleted
                )
                .map(renderTask)
            )}
          </div>
        )}
      </div>
    </Box>
  );
};

export default TaskTabs;
