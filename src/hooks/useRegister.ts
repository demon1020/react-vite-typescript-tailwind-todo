import { useState } from "react";
import bcrypt from "bcryptjs";
import useRegisterStore from "../store/registerStore";

import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validateFields";
import { apiUrls } from "../constants/apiUrls";
import api from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "../constants/routes";
import { toast } from "react-toastify";

export const useRegister = () => {
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

  const navigate = useNavigate();
  // Define loading and API error states
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const usernameError = validateUsername(username);
    if (usernameError) newErrors.username = usernameError;

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

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
      toast.success("User registered successfully!");

      // Navigate to the login page after successful registration
      navigate(routerPaths.LOGIN_PAGE);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
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
    loading,
    apiError,
    handleRegister,
  };
};
