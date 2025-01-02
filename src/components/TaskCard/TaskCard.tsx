import { MdDelete, MdEditDocument } from "react-icons/md";
import "./TaskCard.scss";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  isImportant: boolean;
}

function TaskCard({ task }: { task: Task }) {
  return (
    <section className="task-card">
      <div className="task-card__container">
        <h2 className="task-card__title">{task.title}</h2>
        <div className="task-card__description">
          <p>
            {task.description.length > 100
              ? task.description.substring(0, 100) + "..."
              : task.description}
          </p>
        </div>
        <div className="task-card__date">
          <p>{task.dueDate}</p>
        </div>
        <div className="task-card__buttom">
          <button className={task.isComplete ? "completed" : "incomplete"}>
            {task.isComplete ? "Completed" : "InCompleted"}
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
