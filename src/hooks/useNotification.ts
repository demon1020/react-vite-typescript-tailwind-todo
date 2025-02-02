import { useState, useEffect } from "react";

// Define a hook to handle notification preferences
const useNotification = () => {
  // Get the initial notification preference from localStorage or default to "enabled"
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") === "disabled"
      ? "disabled"
      : "enabled"
  );

  useEffect(() => {
    // Store notification preference in localStorage
    localStorage.setItem("notifications", notifications);
  }, [notifications]);

  // Toggle notification settings
  const toggleNotifications = () => {
    setNotifications((prev) => (prev === "enabled" ? "disabled" : "enabled"));
  };

  return {
    notifications,
    toggleNotifications,
  };
};

export default useNotification;
