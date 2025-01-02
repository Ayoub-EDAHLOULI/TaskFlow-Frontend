import "./ImportantTaskList.scss";
import TaskCard from "../../TaskCard/TaskCard";
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

function ImportantTaskList() {
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

  // Fetch only important tasks
  const fetchImportantTasks = async () => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    try {
      const response = await axios.get(
        `http://localhost:5174/api/user/${userId}/tasks`
      );
      const importantTasks = response.data.tasks.filter(
        (task: Task) => task.isImportant
      );
      setTasks(importantTasks);
    } catch (error) {
      console.error("Failed to fetch important tasks", error);
    }
  };

  useEffect(() => {
    fetchImportantTasks();
  }, []);

  return (
    <section className="important-task-list">
      <div className="important-task-list__container">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </section>
  );
}

export default ImportantTaskList;
