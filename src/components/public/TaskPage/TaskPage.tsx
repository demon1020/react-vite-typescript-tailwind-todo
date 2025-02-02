import { useEffect, useState } from "react";
import useTaskStore from "../../../store/useTaskStore";

const TaskList = () => {
  const { tasks, total, skip, fetchTasks, isLoading, toggleTaskStatus } =
    useTaskStore();
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchTasks(page);
  }, [page, fetchTasks]);

  return (
    <div className="p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      {isLoading && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
      {!isLoading && tasks.length === 0 && <p>No tasks found.</p>}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 border border-base-300 rounded-lg flex justify-between items-center shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-lg">{task.todo}</h3>
              <p>
                Status:{" "}
                <span
                  className={task.completed ? "text-green-600" : "text-red-600"}
                >
                  {task.completed ? "Completed" : "In Progress"}
                </span>
              </p>
              <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            </div>
            <button
              className={`btn ${
                task.completed ? "btn-disabled" : "btn-primary"
              } px-4 py-2`}
              onClick={() => toggleTaskStatus(task.id)}
            >
              {task.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
          </li>
        ))}
      </ul>

      <div className="join mt-4">
        <button
          className="join-item btn btn-outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          « Previous
        </button>
        <button className="join-item btn btn-outline bg-black text-white">
          Page {skip === 0 ? 1 : skip / 3}
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={skip + 3 >= total}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default TaskList;
