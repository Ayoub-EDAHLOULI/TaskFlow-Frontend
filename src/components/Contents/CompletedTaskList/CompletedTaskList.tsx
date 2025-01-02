import "./CompletedTaskList.scss";
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

function CompletedTaskList() {
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

  // Fetch only completed tasks
  const fetchCompletedTasks = async () => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    try {
      const response = await axios.get(
        `http://localhost:5174/api/user/${userId}/tasks`
      );
      const completedTasks = response.data.tasks.filter(
        (task: Task) => task.isComplete
      );
      setTasks(completedTasks);
    } catch (error) {
      console.error("Failed to fetch completed tasks", error);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <section className="completed-task-list">
      <div className="completed-task-list__container">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </section>
  );
}

export default CompletedTaskList;
