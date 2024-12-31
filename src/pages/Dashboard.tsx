import SideBar from "../components/SideBar/SideBar";
import TaskList from "../components/TaskList/TaskList";

function Dashboard() {
  return (
    <div className="dashboard">
      <SideBar />
      <main className="main_content">
        <TaskList />
      </main>
    </div>
  );
}

export default Dashboard;
