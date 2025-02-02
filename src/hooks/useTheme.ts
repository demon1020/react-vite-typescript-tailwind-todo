// src/hooks/useTheme.ts

import { useState, useEffect } from "react";

// Define a hook to handle theme state
const useTheme = () => {
  // Get the initial theme from localStorage or default to "light"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Set the theme on document root element and localStorage
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "darkTheme");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "lightTheme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;
