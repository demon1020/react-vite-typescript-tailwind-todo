import { create } from "zustand";
import api from "../services/apiService"; // Import API service
import { apiUrls } from "../constants/apiUrls";

interface Task {
  id: number;
  todo: string;
  completed: boolean;
  dueDate: string; // Added due date
  userId: number;
}

interface TaskStore {
  tasks: Task[];
  total: number;
  skip: number;
  limit: number;
  isLoading: boolean;
  fetchTasks: (page?: number) => Promise<void>;
  toggleTaskStatus: (id: number) => void; // New function
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  total: 0,
  skip: 0,
  limit: 3,
  isLoading: false,

  fetchTasks: async (page = 0) => {
    set({ isLoading: true });

    try {
      const response = await api.get<{
        todos: Task[];
        total: number;
        skip: number;
        limit: number;
      }>(`${apiUrls.TODOS}?skip=${page * 3}&limit=3`);

      // Mock due dates (since API doesn't provide it)
      const tasksWithDueDates = response.todos.map((task) => ({
        ...task,
        dueDate: new Date(
          Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0], // Random due date within 10 days
      }));

      set({
        tasks: tasksWithDueDates,
        total: response.total,
        skip: response.skip,
        limit: response.limit,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      set({ isLoading: false });
    }
  },

  toggleTaskStatus: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  },
}));

export default useTaskStore;
