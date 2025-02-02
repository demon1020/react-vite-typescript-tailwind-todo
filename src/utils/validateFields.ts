export const validateUsername = (username: string): string | null => {
  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};
