import AddTaskPopup from "../../AddTaskPopup/AddTaskPopup";
import TaskCard from "../../TaskCard/TaskCard";
import AddNewTaskCard from "../AddNewTaskCard/AddNewTaskCard";
import "./AllTaskList.scss";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  isImportant: boolean;
}

function AllTaskList() {
  const [showPopup, setShowPopup] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Get the user Id from the token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      return decodedToken.sub; // Use the 'sub' field for the user ID
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  };

  // Fetch all tasks for the user
  const fetchTasks = async () => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    try {
      const response = await axios.get(
        `http://localhost:5174/api/user/tasks/${userId}`
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section className="all-task-list">
      <div className="all-task-list__container">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}

        <AddNewTaskCard setShowPopup={setShowPopup} />
        {showPopup && <AddTaskPopup setShowPopup={setShowPopup} />}
      </div>
    </section>
  );
}

export default AllTaskList;
