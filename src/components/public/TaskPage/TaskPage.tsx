import { useEffect, useState } from "react";
import useTaskStore from "../../../store/useTaskStore";
import Task from "./Task"; // Import Task component
import Pagination from "./Pagination";

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
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="animate-pulse p-4 border border-base-400 rounded-lg flex justify-between items-center shadow-sm"
            >
              <div>
                <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-16 mt-1"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-28"></div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && tasks.length === 0 && <p>No tasks found.</p>}

      {!isLoading && (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              toggleTaskStatus={toggleTaskStatus}
            />
          ))}
        </ul>
      )}

      <Pagination
        page={page}
        setPage={setPage}
        skip={skip === 0 ? 1 : skip}
        total={total}
      />
    </div>
  );
};

export default TaskList;
