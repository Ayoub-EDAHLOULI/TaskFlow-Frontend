import { MdDelete, MdEditDocument } from "react-icons/md";
import "./TaskCard.scss";

function TaskCard() {
  return (
    <section className="task-card">
      <div className="task-card__container">
        <h2 className="task-card__title">Task Title</h2>
        <div className="task-card__description">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit,
            consectetur adipisicing elit. Velit, consectetur adipisicing elit.
          </p>
        </div>
        <div className="task-card__date">
          <p>01/01/2025</p>
        </div>
        <div className="task-card__buttom">
          <button>Completed</button>
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
