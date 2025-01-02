import { MdDelete, MdEditDocument } from "react-icons/md";
import "./TaskCard.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  isImportant: boolean;
}

function TaskCard({ task }: { task: Task }) {
  const [currentTask, setCurrentTask] = useState(task);

  const handleButtonClick = async () => {
    const updatedTask = { ...currentTask, isComplete: !currentTask.isComplete };
    setCurrentTask(updatedTask); // Optimistically update UI

    try {
      const response = await fetch(
        `http://localhost:5174/api/taskitems/${currentTask.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isComplete: updatedTask.isComplete }),
        }
      );

      if (response.ok) {
        toast.success("Task updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      toast.error(String(error), {
        position: "top-right",
        autoClose: 3000,
      });
      // Revert the UI if the API call fails
      setCurrentTask({ ...currentTask, isComplete: task.isComplete });
    }
  };

  return (
    <section className="task-card">
      <div className="task-card__container">
        <h2 className="task-card__title">{currentTask.title}</h2>
        <div className="task-card__description">
          <p>
            {currentTask.description.length > 100
              ? currentTask.description.substring(0, 100) + "..."
              : currentTask.description}
          </p>
        </div>
        <div className="task-card__date">
          <p>{currentTask.dueDate}</p>
        </div>
        <div className="task-card__buttom">
          <button
            className={currentTask.isComplete ? "completed" : "incomplete"}
            onClick={handleButtonClick}
          >
            {currentTask.isComplete ? "Completed" : "Incomplete"}
          </button>
          <div className="task-card__buttom__icons">
            <div className="task-card__buttom__icons__edit">
              <MdEditDocument />
            </div>
            <div className="task-card__buttom__icons__delete">
              <MdDelete />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaskCard;
