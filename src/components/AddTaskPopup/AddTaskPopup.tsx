import { IoClose } from "react-icons/io5";
import "./AddTaskPopup.scss";
import { useState } from "react";

interface AddTaskPopupProps {
  setShowPopup: (show: boolean) => void;
}

interface Task {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  important: boolean;
}

function AddTaskPopup({ setShowPopup }: AddTaskPopupProps) {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    date: "",
    completed: false,
    important: false,
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(task);
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

          <label htmlFor="date" className="add-task-popup__label">
            Task Date
          </label>
          <input
            type="date"
            id="date"
            className="add-task-popup__input"
            value={task.date}
            onChange={handleInputChange}
          />

          <div className="add-task-popup__toogle__container">
            <div className="add-task-popup__toogle__group">
              <label htmlFor="completed" className="add-task-popup__label">
                Toggle Completed
              </label>
              <input
                type="checkbox"
                id="completed"
                className="add-task-popup__toogle"
                checked={task.completed}
                onChange={handleInputChange}
              />
            </div>
            <div className="add-task-popup__toogle__group">
              <label htmlFor="important" className="add-task-popup__label">
                Toggle Important
              </label>
              <input
                type="checkbox"
                id="important"
                className="add-task-popup__toogle"
                checked={task.important}
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
