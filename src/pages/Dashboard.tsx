import SideBar from "../components/SideBar/SideBar";
import TaskList from "../components/TaskList/TaskList";
import "./Dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <SideBar />
      </div>
      <main className="main_content">
        <TaskList />
      </main>
    </div>
  );
}

export default Dashboard;
