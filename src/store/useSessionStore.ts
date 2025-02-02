import { create } from "zustand"; // Correct import

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  clearSession: () => void;
}

const useSessionStore = create<SessionState>(
  (
    set: (arg0: {
      accessToken?: string | null;
      refreshToken?: string | null;
    }) => unknown
  ) => ({
    accessToken: null,
    refreshToken: null,
    setAccessToken: (token: string | null) => set({ accessToken: token }), // Explicitly define type
    setRefreshToken: (token: string | null) => set({ refreshToken: token }), // Explicitly define type
    clearSession: () => {
      set({ accessToken: null, refreshToken: null });

      // Clearing session-related data from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Optionally, clear all data in localStorage (not recommended if you have other important data in localStorage)
      localStorage.clear();
    },
  })
);

export default useSessionStore;
