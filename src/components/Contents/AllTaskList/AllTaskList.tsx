import TaskCard from "../../TaskCard/TaskCard";
import "./AllTaskList.scss";

function AllTaskList() {
  return (
    <section className="all-task-list">
      <div className="all-task-list__container">
        <TaskCard />
      </div>
    </section>
  );
}

export default AllTaskList;
