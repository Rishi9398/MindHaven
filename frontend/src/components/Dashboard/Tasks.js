import React, { useState, useEffect } from "react";
import { allAPIs } from "../../services/allAPIs";

const Tasks = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    priority: "Medium",
    dueDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState({ High: [], Medium: [], Low: [] });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await allAPIs.getTasks();
      console.log("API Response:", response.data); // Debug API response
      const tasksByPriority = { High: [], Medium: [], Low: [] };

      response.data.forEach((task) => {
        if (tasksByPriority[task.priority]) {
          tasksByPriority[task.priority].push(task);
        } else {
          console.warn(`Invalid priority "${task.priority}" for task:`, task);
        }
      });

      setTasks(tasksByPriority); // Update the state with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error.message); // Debug error
      setError("Failed to fetch tasks. Please try again.");
    }
  };

  // Handle task submission
  const handleAddTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const createdDate = new Date().toISOString().split("T")[0];
    const newTask = {
      ...formData,
      createdDate,
    };

    try {
      const response = await allAPIs.createTasks(newTask);
      if (response.status === 201) {
        alert("Task added successfully");
        fetchTasks(); // Refresh task list
        setFormData({
          taskName: "",
          priority: "Medium",
          dueDate: "",
        });
      }
    } catch (error) {
      console.error("Error adding task:", error.message); // Debug error
      setError("Failed to add task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id) => {
    try {
      await allAPIs.deleteTask(id);
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error("Error deleting task:", error.message); // Debug error
      setError("Failed to delete task. Please try again.");
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Task Dashboard
        </h2>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Task Form */}
        <form
          onSubmit={handleAddTask}
          className="flex flex-col gap-4 md:flex-row md:gap-4"
        >
          <input
            type="text"
            name="taskName"
            placeholder="Enter Task"
            value={formData.taskName}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 disabled:bg-gray-400"
          >
            {isSubmitting ? "Adding Task..." : "Add Task"}
          </button>
        </form>
      </div>

      {/* Task List by Priority */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-4">
        {["High", "Medium", "Low"].map((priority) => (
          <div key={priority} className="w-full bg-neutral-100 shadow-lg p-4">
            <h3 className="text-xl font-bold mb-4">{priority} Priority Tasks</h3>
            {tasks[priority].length === 0 ? (
              <p>No tasks available</p>
            ) : (
              tasks[priority].map((task) => (
                <div
                  key={task._id}
                  className="border-b border-gray-300 pb-2 mb-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{task.taskName}</p>
                    <p className="text-sm text-gray-600">
                      Due: {task.dueDate.split("T")[0]}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`Edit task with ID: ${task._id}`)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
