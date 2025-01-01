import { IoClose } from "react-icons/io5";
import "./AddTaskPopup.scss";

function AddTaskPopup({
  setShowPopup,
}: {
  setShowPopup: (show: boolean) => void;
}) {
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
        <form className="add-task-popup__form">
          <label htmlFor="task-title" className="add-task-popup__label">
            Task Title
          </label>
          <input
            type="text"
            id="task-title"
            className="add-task-popup__input"
          />
          <label htmlFor="task-description" className="add-task-popup__label">
            Task Description
          </label>
          <textarea
            id="task-description"
            className="add-task-popup__textarea"
          ></textarea>
          <label htmlFor="task-date" className="add-task-popup__label">
            Task Date
          </label>
          <input type="date" id="task-date" className="add-task-popup__input" />
          <div className="add-task-popup__toogle__container">
            <div className="add-task-popup__toogle__group">
              <label htmlFor="task-time" className="add-task-popup__label">
                Toggle Completed
              </label>
              <input type="checkbox" className="add-task-popup__toogle" />
            </div>
            <div className="add-task-popup__toogle__group">
              <label htmlFor="task-time" className="add-task-popup__label">
                Toggle Important
              </label>
              <input type="checkbox" className="add-task-popup__toogle" />
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
