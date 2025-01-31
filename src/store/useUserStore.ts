// store/useSettingsStore.ts
import { create } from "zustand";

interface SettingsState {
  username: string;
  email: string;
  password: string;
  errors: Record<string, string>;
  isLoading: boolean;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setErrors: (errors: Record<string, string>) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  username: "",
  email: "",
  password: "",
  errors: {},
  isLoading: false,
  setUsername: (username: string) => set(() => ({ username })),
  setEmail: (email: string) => set(() => ({ email })),
  setPassword: (password: string) => set(() => ({ password })),
  setErrors: (errors: Record<string, string>) => set(() => ({ errors })),
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));

export default useSettingsStore;
