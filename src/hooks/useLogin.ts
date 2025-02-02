import { useNavigate } from "react-router-dom";
import { apiUrls } from "../constants/apiUrls";
import { routerPaths } from "../constants/routes";
import api from "../services/ApiService";
import useLoginStore from "../store/useLoginStore";
import useSessionStore from "../store/useSessionStore";
import { validateUsername, validatePassword } from "../utils/validateFields"; // Import validation functions
import { toast } from "react-toastify";

const useLogin = () => {
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

    const usernameError = validateUsername(username);
    if (usernameError) newErrors.username = usernameError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigateToRegisterPage = async () => {
    navigate(routerPaths.REGISTER_PAGE);
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
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        image: data.image,
      });

      api.setToken(data.accessToken);
      navigate(routerPaths.DASHBOARD_PAGE);
      toast.success("User logged in successfully!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      console.error("Login failed:", error);
      setErrors({ apiError: error.message });
    }
  };

  return {
    username,
    password,
    errors,
    isLoading,
    setUsername,
    setPassword,
    handleLogin,
    navigateToRegisterPage,
  };
};

export default useLogin;
