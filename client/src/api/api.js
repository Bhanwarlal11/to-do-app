import axios from 'axios';
console.log("process.env.REACT_APP_API_URL",process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// register user
export const registerUser = (username, email, password) => 
api.post('/api/auth/register', { username, email, password });

// Login user
export const SigninUser = (email, password) =>
  api.post('/api/auth/login', { email, password });

// Create a task
export const createTask = (title, description, token) => {
  return api.post('/api/tasks', {title, description}, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

// Get tasks
export const getTasks = (token) => {
  return api.get('/api/tasks', {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

// Update a task
export const updateTask = (taskId, taskData, token) => {
  return api.put(`/api/tasks/${taskId}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

// Delete a task
export const deleteTask = (taskId, token) => {
  return api.delete(`/api/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



// get basic stats data
export const getTaskStats = (token) => {
  return api.get('/api/stats/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Fetch Pie Chart Data
export const getPieChartData = (token) => {
  return api.get('/api/stats/pie-chart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


