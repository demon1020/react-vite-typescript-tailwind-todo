import { useEffect } from "react";
import useSettingsStore from "../store/useUserStore"; // Adjust path as needed
import bcrypt from "bcryptjs";
import { apiUrls } from "../constants/apiUrls";
import api from "../services/ApiService";
import { toast } from "react-toastify";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../utils/validateFields"; // Import validation functions

const useSettings = () => {
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
    setUsername("emilys");
    setEmail("emily.johnson@x.dummyjson.com");
    setPassword("emilyspass");
  }, [setUsername, setEmail, setPassword]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (usernameError) newErrors.username = usernameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await api.put<{ message: string }>(apiUrls.UPDATE_USER, {
        username,
        email,
        password: hashedPassword,
      });

      setIsLoading(false);
      toast.success("User updated successfully!");
      console.log("API Response:", data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
      setErrors({ apiError: error.message || "Failed to update user" });
    }
  };

  return {
    username,
    email,
    password,
    errors,
    isLoading,
    setUsername,
    setEmail,
    setPassword,
    handleSubmit,
  };
};

export default useSettings;
