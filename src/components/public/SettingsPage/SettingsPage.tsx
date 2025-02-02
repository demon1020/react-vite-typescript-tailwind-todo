// src/pages/SettingsPage.tsx

import { useEffect } from "react";
import api from "../../../services/apiService"; // Import the api instance
import useSettingsStore from "../../../store/useUserStore"; // Zustand store
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import bcrypt from "bcryptjs";
import { apiUrls } from "../../../constants/apiUrls";
import useTheme from "../../../hooks/useTheme"; // Import the useTheme hook

const SettingsPage = () => {
  const {
    username,
    email,
    password,
    errors,
    isLoading,
    setUsername,
    setEmail,
    setPassword,
    setErrors,
    setIsLoading,
  } = useSettingsStore();

  const { theme, toggleTheme } = useTheme(); // Use the custom theme hook

  useEffect(() => {
    // Ideally, fetch the user data on page load and set it in the store
    // For demo purposes, we are not fetching from the API
    setUsername("emilys");
    setEmail("emily.johnson@x.dummyjson.com");
    setPassword("emilyspass");
  }, [setUsername, setEmail, setPassword]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (!email.includes("@"))
      newErrors.email = "Please enter a valid email address";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Hash the password before sending it to the API
      const hashedPassword = await bcrypt.hash(password, 10);

      // Perform the API call to update the user
      const data = await api.put<{ message: string }>(
        apiUrls.UPDATE_USER, // Assuming the user's ID is 1 for update
        {
          username,
          email,
          password: hashedPassword,
        }
      );

      setIsLoading(false);

      // Log the response for debugging purposes
      console.log("API Response:", data);

      // Show a toast notification for success
      toast.success("User updated successfully!");

      // Redirect to dashboard after success
      //   navigate(routerPaths.DASHBOARD_PAGE);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      // Log error details for debugging
      console.error("Error updating user:", error);

      // Show error toast
      toast.error("Failed to update user. Please try again.");

      // Optional: Set API error message to state (for display in form)
      setErrors({ apiError: error.message || "Failed to update user" });
    }
  };

  return (
    <div className="p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Theme</label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onClick={toggleTheme}
            className="toggle toggle-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Notification</label>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>

        {errors.apiError && (
          <p className="text-red-500 text-sm mb-4">{errors.apiError}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
