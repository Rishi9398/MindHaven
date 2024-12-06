import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const Tasks = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    priority: "Medium",
    dueDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState({ High: [], Medium: [], Low: [] });
  const [user, setUser] = useState(null); // Track logged-in user

  // Track real-time login/logout
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("email", user.email); // Fetch tasks for the logged-in user
      if (error) throw error;

      const tasksByPriority = { High: [], Medium: [], Low: [] };

      data.forEach((task) => {
        if (tasksByPriority[task.priority]) {
          tasksByPriority[task.priority].push(task);
        } else {
          console.warn(`Invalid priority "${task.priority}" for task:`, task);
        }
      });

      setTasks(tasksByPriority);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      setError("Failed to fetch tasks. Please try again.");
    }
  };

  // Add task to Supabase
  const addTaskToSupabase = async () => {
    const createdDate = new Date().toISOString();
    const newTask = {
      taskName: formData.taskName,
      priority: formData.priority,
      dueDate: formData.dueDate,
      createdDate,
      email: user.email, // Associate task with logged-in user's email
    };

    try {
      const { error } = await supabase.from("tasks").insert([newTask]);
      if (error) throw error;

      alert("Task added successfully");
      fetchTasks(); // Refresh tasks
      setFormData({
        taskName: "",
        priority: "Medium",
        dueDate: "",
      });
    } catch (error) {
      console.error("Error adding task:", error.message);
      setError("Failed to add task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete task from Supabase
  const deleteTaskFromSupabase = async (id) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;

      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error.message);
      setError("Failed to delete task. Please try again.");
    }
  };

  // Fetch tasks when user logs in
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

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
        {user ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              setError(null);
              addTaskToSupabase();
            }}
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
            {tasks[priority].length === 0 ? (
              <p>No tasks available</p>
            ) : (
              tasks[priority].map((task) => (
                <div
                  key={task.id}
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
                      onClick={() => deleteTaskFromSupabase(task.id)}
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
