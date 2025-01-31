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
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      {isLoading && <p>Loading tasks...</p>}
      {!isLoading && tasks.length === 0 && <p>No tasks found.</p>}

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-3 p-4 border rounded-lg flex justify-between items-center"
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
              className={`px-4 py-2 rounded ${
                task.completed ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
              onClick={() => toggleTaskStatus(task.id)}
            >
              {task.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
          </li>
        ))}
      </ul>

      <div className="join grid grid-cols-3 mt-4">
        <button
          className="join-item btn btn-outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          « Previous
        </button>
        <button className="join-item btn btn-outline">
          {" "}
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
