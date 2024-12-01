import axios from 'axios';

const prod = {
  url: {
    API_BASE_URL: 'https://mindhavenbackend.vercel.app', // Production backend URL
  },
};

const dev = {
  url: {
    API_BASE_URL: 'http://localhost:5000', // Local backend URL for development
  },
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

const instance = axios.create({
  baseURL: config.url.API_BASE_URL, // Automatically picks the correct base URL
  headers: { 'Content-Type': 'application/json' }, // Ensure headers are properly set
});

export const allAPIs = {
  createTasks,
  getTasks,
  deleteTask,
  loginUser,
  registerUser,
};

function createTasks(payload) {
  return instance.post('/tasks/createTasks', payload);
}

function getTasks() {
  return instance.get('/tasks/getTasks');
}

// Define the deleteTask function to fix the error
function deleteTask(taskId) {
  return instance.delete(`/tasks/deleteTask/${taskId}`);
}

function loginUser(payload) {
  return instance.post('/auth/login', payload);
}

function registerUser(payload) {
  return instance.post('/auth/register', payload);
}

// Example API endpoints
// http://localhost:5000/tasks/deleteTask/674ac987703a281a563c331a
// http://localhost:5000/tasks/getTasks
// http://localhost:5000/tasks/createTasks
// {
//   "taskName": "hi",
//   "priority": "High",
//   "dueDate": "2024-11-02",
//   "createdDate": "2024-11-28"
// }
