import "./ImportantTaskList.scss";
import TaskCard from "../../TaskCard/TaskCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchTasks } from "../../../store/taskSlice";

function ImportantTaskList() {
  const dispatch = useDispatch<AppDispatch>();

  // Get the tasks from the store
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Filter the tasks to get only the important tasks
  const importantTasks = tasks.filter((task) => task.isImportant);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <section className="important-task-list">
      <div className="important-task-list__container">
        {importantTasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </section>
  );
}

export default ImportantTaskList;
