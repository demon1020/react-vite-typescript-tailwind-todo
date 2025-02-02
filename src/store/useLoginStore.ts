import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginState {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  image: string;
  errors: Record<string, string>;
  isLoading: boolean;
  setId: (id: number) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  setFirstName: (firstName: string) => void;
  setImage: (image: string) => void;
  setErrors: (errors: Record<string, string>) => void;
  setIsLoading: (isLoading: boolean) => void;
  setUserDetails: (userData: {
    id: number;
    email: string;
    firstName: string;
    image: string;
  }) => void;
  resetState: () => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      id: 0,
      username: "",
      password: "",
      email: "",
      firstName: "",
      image: "",
      errors: {},
      isLoading: false,

      setId: (id) => set({ id }),
      setUsername: (username) => set({ username }),
      setPassword: (password) => set({ password }),
      setEmail: (email) => set({ email }),
      setFirstName: (firstName) => set({ firstName }),
      setImage: (image) => set({ image }),
      setErrors: (errors) => set({ errors }),
      setIsLoading: (isLoading) => set({ isLoading }),

      setUserDetails: ({ id, email, firstName, image }) =>
        set({ id, email, firstName, image }),

      resetState: () =>
        set({
          id: 0,
          username: "",
          password: "",
          email: "",
          firstName: "",
          image: "",
          errors: {},
          isLoading: false,
        }),
    }),
    {
      name: "login-storage", // The name of the storage key in localStorage
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setItem: (name: string, value: any) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useLoginStore;
