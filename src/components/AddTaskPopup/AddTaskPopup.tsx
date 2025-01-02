import { IoClose } from "react-icons/io5";
import "./AddTaskPopup.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // Import axios

interface AddTaskPopupProps {
  setShowPopup: (show: boolean) => void;
}

interface Task {
  title: string;
  description: string;
  isComplete: boolean;
  isImportant: boolean;
}

function AddTaskPopup({ setShowPopup }: AddTaskPopupProps) {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    isComplete: false,
    isImportant: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setTask({
        ...task,
        [id]: checked,
      });
    } else {
      setTask({
        ...task,
        [id]: value,
      });
    }
  };

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return; // handle the error
    }

    const userId = getUserIdFromToken(); // Get the userId

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    // Send data to the server using axios
    try {
      const response = await axios.post(
        "http://localhost:5174/api/taskitems",
        {
          ...task, // Spread the task object
          userId: parseInt(userId), // Add the userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data; // Axios automatically parses JSON

      if (response.status === 200) {
        // Reset form after submitting
        setTask({
          title: "",
          description: "",
          isComplete: false,
          isImportant: false,
        });

        // Show success message
        toast.success("Task added successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        console.error("An error occurred", result.message);
        toast.error(result.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An error occurred. Please try again later", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setShowPopup(false); // Close popup after submitting
  };

  return (
    <section className="add-task-popup">
      <div
        className="add-task-popup__close"
        onClick={() => setShowPopup(false)}
      >
        <IoClose className="add-task-popup__close__icon " />
      </div>
      <div className="add-task-popup__container">
        <h2 className="add-task-popup__title">Add New Task</h2>
        <form className="add-task-popup__form" onSubmit={handleFormSubmit}>
          <label htmlFor="title" className="add-task-popup__label">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            className="add-task-popup__input"
            value={task.title}
            onChange={handleInputChange}
          />

          <label htmlFor="description" className="add-task-popup__label">
            Task Description
          </label>
          <textarea
            id="description"
            className="add-task-popup__textarea"
            value={task.description}
            onChange={handleInputChange}
          ></textarea>

          {/* <label htmlFor="date" className="add-task-popup__label">
            Task Date
          </label>
          <input
            type="date"
            id="date"
            className="add-task-popup__input"
            value={task.date}
            onChange={handleInputChange}
          /> */}

          <div className="add-task-popup__toogle__container">
            <div className="add-task-popup__toogle__group">
              <label htmlFor="completed" className="add-task-popup__label">
                Toggle Completed
              </label>
              <input
                type="checkbox"
                id="isComplete"
                className="add-task-popup__toogle"
                checked={task.isComplete}
                onChange={handleInputChange}
              />
            </div>
            <div className="add-task-popup__toogle__group">
              <label htmlFor="important" className="add-task-popup__label">
                Toggle Important
              </label>
              <input
                type="checkbox"
                id="isImportant"
                className="add-task-popup__toogle"
                checked={task.isImportant}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit" className="add-task-popup__button">
            Add Task
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddTaskPopup;
