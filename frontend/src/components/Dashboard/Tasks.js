import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"; // Import Supabase client

const TaskManager = () => {
  const [taskForm, setTaskForm] = useState({
    taskTitle: "",
    priority: "Medium",
    dueDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [taskList, setTaskList] = useState({ High: [], Medium: [], Low: [] });
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Track real-time user session
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setLoggedInUser(session?.user || null);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setLoggedInUser(session?.user || null);
    });

    return () => authListener?.unsubscribe();
  }, []);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch tasks associated with logged-in user
  const loadTasks = async () => {
    if (!loggedInUser) return;

    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_email", loggedInUser.email);
      if (error) throw error;

      const categorizedTasks = { High: [], Medium: [], Low: [] };
      data.forEach((task) => {
        if (categorizedTasks[task.priority]) {
          categorizedTasks[task.priority].push(task);
        } else {
          console.warn(`Unexpected priority "${task.priority}" for task:`, task);
        }
      });

      setTaskList(categorizedTasks);
    } catch (err) {
      console.error("Error loading tasks:", err.message);
      setErrorMessage("Failed to load tasks. Please try again.");
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!loggedInUser) {
      alert("Please log in to add tasks.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const currentDate = new Date().toISOString();
    const newTaskData = {
      title: taskForm.taskTitle,
      priority: taskForm.priority,
      dueDate: taskForm.dueDate,
      created_at: currentDate,
      user_email: loggedInUser.email,
    };

    try {
      const { error } = await supabase.from("tasks").insert([newTaskData]);
      if (error) throw error;

      alert("Task added successfully!");
      setTaskForm({
        taskTitle: "",
        priority: "Medium",
        dueDate: "",
      });
      loadTasks();
    } catch (err) {
      console.error("Error adding task:", err.message);
      setErrorMessage("Failed to add task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a task by ID
  const deleteTask = async (taskId) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
      if (error) throw error;

      loadTasks(); // Refresh task list after deletion
    } catch (err) {
      console.error("Error deleting task:", err.message);
      setErrorMessage("Failed to delete task. Please try again.");
    }
  };

  // Fetch tasks when user logs in
  useEffect(() => {
    if (loggedInUser) {
      loadTasks();
    }
  }, [loggedInUser]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Task Dashboard
        </h2>

        {/* Display error messages */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            <p>{errorMessage}</p>
          </div>
        )}
 
        {/* Task Form */}
        {loggedInUser ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
            className="flex flex-col gap-4 md:flex-row md:gap-4"
          >
            <input
              type="text"
              name="taskTitle"
              placeholder="Enter Task"
              value={taskForm.taskTitle}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              name="priority"
              value={taskForm.priority}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <input
              type="date"
              name="dueDate"
              value={taskForm.dueDate}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
            >
              {isLoading ? "Adding Task..." : "Add Task"}
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500 font-medium">
            Please log in to manage tasks.
          </p>
        )}
      </div>

      {/* Task List by Priority */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-4">
        {["High", "Medium", "Low"].map((priority) => (
          <div key={priority} className="w-full bg-neutral-100 shadow-lg p-4">
            <h3 className="text-xl font-bold mb-4">{priority} Priority Tasks</h3>
            {taskList[priority].length === 0 ? (
              <p>No tasks available</p>
            ) : (
              taskList[priority].map((task) => (
                <div
                  key={task.id}
                  className="border-b border-gray-300 pb-2 mb-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-gray-600">
                      Due: {task.dueDate.split("T")[0]}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteTask(task.id)}
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

export default TaskManager;
