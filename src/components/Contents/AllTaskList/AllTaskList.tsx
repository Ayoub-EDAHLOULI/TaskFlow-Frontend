import TaskCard from "../../TaskCard/TaskCard";
import AddNewTaskCard from "../AddNewTaskCard/AddNewTaskCard";
import "./AllTaskList.scss";

function AllTaskList() {
  return (
    <section className="all-task-list">
      <div className="all-task-list__container">
        <TaskCard />
        <AddNewTaskCard />
      </div>
    </section>
  );
}

export default AllTaskList;
