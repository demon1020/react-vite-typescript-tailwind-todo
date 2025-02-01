import { useNavigate } from "react-router-dom";
import api from "../../../services/ApiService";
import useLoginStore from "../../../store/useLoginStore";
import useSessionStore from "../../../store/useSessionStore";
import { routerPaths } from "../../../constants/routes";
import { apiUrls } from "../../../constants/apiUrls";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    username,
    password,
    errors,
    isLoading,
    setUsername,
    setPassword,
    setErrors,
    setIsLoading,
    setUserDetails,
  } = useLoginStore();

  const { setAccessToken, setRefreshToken } = useSessionStore();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    console.log("Sending login request with:", { username, password });

    try {
      const data = await api.post<{
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        gender: string;
        image: string;
        accessToken: string;
        refreshToken: string;
      }>(apiUrls.LOGIN, { username, password, expiresInMins: 30 });

      console.log("Login successful. Response received:", data);

      setIsLoading(false);

      // Store the tokens
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      // Store user details
      setUserDetails({
        email: data.email,
        firstName: data.firstName,
        image: data.image,
      });

      api.setToken(data.accessToken);
      navigate(routerPaths.DASHBOARD_PAGE);
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed:", error);
      setErrors({ apiError: "Login failed. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="text-center mt-2">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            className="text-blue-500"
            onClick={() => navigate(routerPaths.REGISTER_PAGE)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
