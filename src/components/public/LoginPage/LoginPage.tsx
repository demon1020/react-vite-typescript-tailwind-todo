import { useNavigate } from "react-router-dom";
import { routerPaths } from "../../../constants/routes";
import useLogin from "../../../hooks/useLogin"; // Import custom hook

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    username,
    password,
    errors,
    isLoading,
    setUsername,
    setPassword,
    handleLogin,
  } = useLogin(); // Use the custom hook

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="card w-96 bg-base-300 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your username"
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
              className="input input-bordered w-full"
              placeholder="Enter your password"
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
            className="btn btn-primary w-full"
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
