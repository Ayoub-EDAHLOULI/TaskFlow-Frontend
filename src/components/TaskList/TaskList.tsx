import "./TaskList.scss";
import AllTaskList from "../Contents/AllTaskList/AllTaskList";
import ImportantTaskList from "../Contents/ImportantTaskList/ImportantTaskList";
import CompletedTaskList from "../Contents/CompletedTaskList/CompletedTaskList";
import DoItNowTaskList from "../Contents/DoItNowTaskList/DoItNowTakList";

interface TaskListProps {
  selected: string;
}

function TaskList({ selected }: TaskListProps) {
  const renderTaskList = () => {
    switch (selected) {
      case "All Tasks":
        return <AllTaskList />;
      case "Important":
        return <ImportantTaskList />;
      case "Completed":
        return <CompletedTaskList />;
      case "Do it Now":
        return <DoItNowTaskList />;
      default:
        return <AllTaskList />;
    }
  };

  return (
    <section className="task-list">
      <div className="task-list__container">
        <h1>{selected}</h1>
        {renderTaskList()}
      </div>
    </section>
  );
}

export default TaskList;
