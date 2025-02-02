import { useNavigate } from "react-router-dom";
import { routerPaths } from "../../../constants/routes";
import { useRegister } from "../../../hooks/useRegister";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    username,
    email,
    password,
    confirmPassword,
    errors,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    loading,
    apiError,
    handleRegister,
  } = useRegister();

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="bg-base-300 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
              disabled={loading}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              disabled={loading}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              disabled={loading}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full"
              disabled={loading}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {apiError && (
          <div className="mt-4 text-center text-red-500">
            <p>{apiError}</p>
          </div>
        )}

        <div className="text-center mt-2">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={() => navigate(routerPaths.LOGIN_PAGE)}
            className="text-blue-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
