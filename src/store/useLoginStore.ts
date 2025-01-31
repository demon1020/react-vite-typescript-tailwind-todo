// store/useLoginStore.ts
import { create } from "zustand";

interface LoginState {
  username: string;
  password: string;
  errors: Record<string, string>;
  isLoading: boolean;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setErrors: (errors: Record<string, string>) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useLoginStore = create<LoginState>((set) => ({
  username: "",
  password: "",
  errors: {},
  isLoading: false,
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setErrors: (errors) => set({ errors }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useLoginStore;
