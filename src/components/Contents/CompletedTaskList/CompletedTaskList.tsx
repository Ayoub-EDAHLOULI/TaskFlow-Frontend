import "./CompletedTaskList.scss";
import TaskCard from "../../TaskCard/TaskCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchTasks } from "../../../store/taskSlice";

function CompletedTaskList() {
  const dispatch = useDispatch<AppDispatch>();

  // Get the tasks from the store
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Filter the tasks to get only the completed tasks
  const completedTasks = tasks.filter((task) => task.isComplete);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <section className="completed-task-list">
      <div className="completed-task-list__container">
        {completedTasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </section>
  );
}

export default CompletedTaskList;
