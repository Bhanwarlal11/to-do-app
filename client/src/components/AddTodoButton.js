import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { createTask } from "../api/api";
import toast from "react-hot-toast";

const AddTodoButton = ({ tasks, setTasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = useSelector((state) => state.auth.token);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Submit task creation
  const handleAddTodo = async () => {
    try {
      const response = await createTask(title, description, token);
      if (response.data.success) {
        // Optimistic UI update
        const newTask = response.data.task; // Assuming the response includes the newly created task
        setTasks((prevTasks) => [...prevTasks, newTask]);

        setOpenDialog(false);
        toast.success(response.data.message);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task. Please try again.");
    }
  };

  return (
    <>
      <IconButton
        onClick={handleDialogOpen}
        sx={{
          color: "white",
          fontWeight: "bold",
          padding: 1.5,
          borderRadius: "50%",
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0",
            transform: "scale(1.1)",
            transition: "transform 0.2s, background-color 0.3s",
          },
          transition: "background-color 0.3s",
        }}
      >
        <AddIcon sx={{ fontSize: 30 }} />
      </IconButton>

      {/* Add Todo Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTodo} color="primary">
            Add Todo
          </Button>
        </DialogActions>
      </Dialog>

  
    </>
  );
};

export default AddTodoButton;
