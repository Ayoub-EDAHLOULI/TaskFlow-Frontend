import { RiAddCircleFill } from "react-icons/ri";
import "./AddNewTaskCard.scss";

function AddNewTaskCard({
  setShowPopup,
}: {
  setShowPopup: (show: boolean) => void;
}) {
  return (
    <section className="add-new-task-card" onClick={() => setShowPopup(true)}>
      <div className="add-new-task-card__container">
        <RiAddCircleFill className="icon" />
        <h2 className="add-new-task-card__title">Add New Task</h2>
      </div>
    </section>
  );
}

export default AddNewTaskCard;
