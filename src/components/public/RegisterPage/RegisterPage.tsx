// pages/RegisterPage.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { routerPaths } from "../../../constants/routes";
import api from "../../../services/ApiService";
import useRegisterStore from "../../../store/registerStore";
import bcrypt from "bcryptjs";
import { apiUrls } from "../../../constants/apiUrls";

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
    setErrors,
  } = useRegisterStore();

  // Define loading and API error states
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email address";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setApiError(null);

    try {
      // Hash the password before sending it to the API
      const hashedPassword = await bcrypt.hash(password, 10);

      // Call the registration API
      const response = await api.post(apiUrls.REGISTER, {
        username,
        email,
        password: hashedPassword, // Send the hashed password
      });

      console.log("User registered:", response);
      navigate(routerPaths.LOGIN_PAGE);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-6"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-lg"></span>
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
