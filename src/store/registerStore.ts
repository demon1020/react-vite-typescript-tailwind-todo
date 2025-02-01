// store/registerStore.ts
import { create } from "zustand";

// Define types for store state and actions
interface RegisterState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: Record<string, string>;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setErrors: (errors: Record<string, string>) => void;
}

// Zustand store for managing form state
const useRegisterStore = create<RegisterState>((set) => ({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: {},
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setErrors: (errors) => set({ errors }),
}));

export default useRegisterStore;
