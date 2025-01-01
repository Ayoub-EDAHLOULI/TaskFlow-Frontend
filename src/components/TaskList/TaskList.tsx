import "./TaskList.scss";

function TaskList({ selected }: { selected: string }) {
  return (
    <section className="task-list">
      <div className="task-list__container">
        <h1>{selected}</h1>
      </div>
    </section>
  );
}

export default TaskList;
