import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


// register user
export const registerUser = (username, email, password) => 
api.post('/auth/register', { username, email, password });

// Login user
export const SigninUser = (email, password) =>
  api.post('/auth/login', { email, password });

// Create a task
export const createTask = (title, description, token) => {
  return api.post('/tasks', {title, description}, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

// Get tasks
export const getTasks = (token) => {
  return api.get('/tasks', {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

// Update a task
export const updateTask = (taskId, taskData, token) => {
  return api.put(`/tasks/${taskId}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

// Delete a task
export const deleteTask = (taskId, token) => {
  return api.delete(`/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
