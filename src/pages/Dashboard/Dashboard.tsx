import { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TaskList from "../../components/TaskList/TaskList";
import "./Dashboard.scss";

function Dashboard() {
  const [selected, setSelected] = useState<string>("All Tasks");

  const handleTaskChange = (task: string) => {
    setSelected(task);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <SideBar onTaskSelect={handleTaskChange} />
      </div>
      <main className="main_content">
        <TaskList selected={selected} />
      </main>
    </div>
  );
}

export default Dashboard;
