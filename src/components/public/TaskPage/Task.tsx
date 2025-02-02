import React from "react";

interface TaskProps {
  task: {
    id: number;
    todo: string;
    completed: boolean;
    dueDate: string;
  };
  toggleTaskStatus: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, toggleTaskStatus }) => {
  return (
    <li className="p-4 border border-base-400 rounded-lg flex justify-between items-center shadow-sm">
      <div>
        <h3 className="font-semibold text-lg">{task.todo}</h3>
        <p>
          Status:{" "}
          <span className={task.completed ? "text-green-600" : "text-red-600"}>
            {task.completed ? "Completed" : "In Progress"}
          </span>
        </p>
        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      </div>
      <button
        className={`btn  ${task.completed ? "btn-disabled" : "btn-primary"} ${
          task.completed ? "btn-outline" : ""
        } px-4 py-2`}
        onClick={() => toggleTaskStatus(task.id)}
      >
        {task.completed ? "Mark as Pending" : "Mark as Completed"}
      </button>
    </li>
  );
};

export default Task;
