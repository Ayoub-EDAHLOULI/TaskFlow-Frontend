import AddTaskPopup from "../../AddTaskPopup/AddTaskPopup";
import TaskCard from "../../TaskCard/TaskCard";
import AddNewTaskCard from "../AddNewTaskCard/AddNewTaskCard";
import "./AllTaskList.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchTasks } from "../../../store/taskSlice";

function AllTaskList() {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <section className="all-task-list">
      <div className="all-task-list__container">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}

        <AddNewTaskCard setShowPopup={setShowPopup} />
        {showPopup && <AddTaskPopup setShowPopup={setShowPopup} />}
      </div>
    </section>
  );
}

export default AllTaskList;
