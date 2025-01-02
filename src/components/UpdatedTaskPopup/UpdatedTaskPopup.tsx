import { IoClose } from "react-icons/io5";
import "./UpdatedTaskPopup.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  isImportant: boolean;
}

interface UpdateTaskPopupProps {
  setShowPopup: (show: boolean) => void;
  task: Task;
  updateTaskInParent: (updatedTask: Task) => void; // Add the prop
}

function UpdateTaskPopup({
  setShowPopup,
  task,
  updateTaskInParent,
}: UpdateTaskPopupProps) {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    if (type === "checkbox") {
      setUpdatedTask({
        ...updatedTask,
        [id]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setUpdatedTask({
        ...updatedTask,
        [id]: value,
      });
    }
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub;
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const userId = getUserIdFromToken();
    if (!userId) return;

    try {
      const response = await axios.patch(
        `http://localhost:5174/api/taskitems/${task.id}`,
        {
          ...updatedTask,
          userId: parseInt(userId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Task updated successfully");
        updateTaskInParent(updatedTask); // Update task in the parent component
        setShowPopup(false);
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      toast.error("Error updating task");
      console.error("Error:", error);
    }
  };

  return (
    <section className="update-task-popup">
      <div
        className="update-task-popup__close"
        onClick={() => setShowPopup(false)}
      >
        <IoClose className="update-task-popup__close__icon" />
      </div>
      <div className="update-task-popup__container">
        <h2 className="update-task-popup__title">Update Task</h2>
        <form className="update-task-popup__form" onSubmit={handleFormSubmit}>
          <label htmlFor="title" className="update-task-popup__label">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            className="update-task-popup__input"
            value={updatedTask.title}
            onChange={handleInputChange}
          />

          <label htmlFor="description" className="update-task-popup__label">
            Task Description
          </label>
          <textarea
            id="description"
            className="update-task-popup__textarea"
            value={updatedTask.description}
            onChange={handleInputChange}
          />

          <div className="update-task-popup__toogle__container">
            <div className="update-task-popup__toogle__group">
              <label htmlFor="completed" className="update-task-popup__label">
                Toggle Completed
              </label>
              <input
                type="checkbox"
                id="isComplete"
                checked={updatedTask.isComplete}
                onChange={handleInputChange}
              />
            </div>
            <div className="update-task-popup__toogle__group">
              <label htmlFor="important" className="update-task-popup__label">
                Toggle Important
              </label>
              <input
                type="checkbox"
                id="isImportant"
                checked={updatedTask.isImportant}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit" className="update-task-popup__button">
            Update Task
          </button>
        </form>
      </div>
    </section>
  );
}

export default UpdateTaskPopup;
