import AddTaskPopup from "../../AddTaskPopup/AddTaskPopup";
import TaskCard from "../../TaskCard/TaskCard";
import AddNewTaskCard from "../AddNewTaskCard/AddNewTaskCard";
import "./AllTaskList.scss";
import { useState } from "react";

function AllTaskList() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="all-task-list">
      <div className="all-task-list__container">
        <TaskCard />

        <AddNewTaskCard setShowPopup={setShowPopup} />
        {showPopup && <AddTaskPopup setShowPopup={setShowPopup} />}
      </div>
    </section>
  );
}

export default AllTaskList;
