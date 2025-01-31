import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/ApiService"; // Import the api instance
import useSettingsStore from "../../../store/useUserStore"; // Zustand store
import { routerPaths } from "../../../constants/routes";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const SettingsPage = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    // Ideally, fetch the user data on page load and set it in the store
    // For demo purposes, we are not fetching from the API
    setUsername("JohnDoe");
    setEmail("john.doe@example.com");
    setPassword("password123");
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
      // Perform the API call to update the user
      const data = await api.put<{ message: string }>(
        `/users/2`, // Assuming the user's ID is 2 for update
        {
          username,
          email,
          password,
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
    <div className="p-6 bg-white shadow rounded-lg m-5">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg"
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
            className="w-full p-2 border rounded-lg"
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
            className="w-full p-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {errors.apiError && (
          <p className="text-red-500 text-sm mb-4">{errors.apiError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
