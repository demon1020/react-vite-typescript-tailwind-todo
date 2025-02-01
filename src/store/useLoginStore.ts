import { create } from "zustand";

interface LoginState {
  username: string;
  password: string;
  email: string;
  firstName: string;
  image: string;
  errors: Record<string, string>;
  isLoading: boolean;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  setFirstName: (firstName: string) => void;
  setImage: (image: string) => void;
  setErrors: (errors: Record<string, string>) => void;
  setIsLoading: (isLoading: boolean) => void;
  setUserDetails: (userData: {
    email: string;
    firstName: string;
    image: string;
  }) => void;
  resetState: () => void; // To reset state on logout
}

const useLoginStore = create<LoginState>((set) => ({
  username: "",
  password: "",
  email: "",
  firstName: "",
  image: "",
  errors: {},
  isLoading: false,

  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setEmail: (email) => set({ email }),
  setFirstName: (firstName) => set({ firstName }),
  setImage: (image) => set({ image }),
  setErrors: (errors) => set({ errors }),
  setIsLoading: (isLoading) => set({ isLoading }),

  // Set user details after successful login
  setUserDetails: ({ email, firstName, image }) =>
    set({ email, firstName, image }),

  // Reset state on logout
  resetState: () =>
    set({
      username: "",
      password: "",
      email: "",
      firstName: "",
      image: "",
      errors: {},
      isLoading: false,
    }),
}));

export default useLoginStore;
