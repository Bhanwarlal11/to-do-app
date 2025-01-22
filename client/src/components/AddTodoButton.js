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
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../api/api";
import toast from "react-hot-toast";

const AddTodoButton = () => {
  const [openDialog, setOpenDialog] = useState(false); // State for opening/closing the dialog
  const [title, setTitle] = useState(""); // State for todo title
  const [description, setDescription] = useState(""); // State for todo description
  const token = useSelector((state) => state.auth.token); // Getting token from Redux state

  const dispatch = useDispatch();

  // Toggle the dialog open/close
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  // Handle form input change
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Submit task creation
  const handleAddTodo = async () => {
    try {
      const response = await createTask(title, description, token);
      if (response.data.success) {
        setOpenDialog(false);
        toast.success(response.data.message);
        setTitle(""); // Reset title input
        setDescription(""); // Reset description input
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task. Please try again.");
    }
  };

  return (
    <>
      {/* Add Todo Button with Add Icon */}
      <IconButton  onClick={handleDialogOpen}>
        <AddIcon />
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
