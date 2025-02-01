import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "../../../constants/routes";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Settings from "../SettingsPage/SettingsPage";
import TaskListing from "../TaskPage/TaskPage";
import useSessionStore from "../../../store/useSessionStore";

const DashboardPage = () => {
  const [activePage, setActivePage] = useState("Task Listings");

  const renderContent = () => {
    switch (activePage) {
      case "Settings":
        return <Settings />;
      case "Task Listings":
        return <TaskListing />;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  const navigate = useNavigate();

  function goToLogin() {
    navigate(routerPaths.LOGIN_PAGE);
  }
  const { clearSession } = useSessionStore(); // Access session store

  function logout() {
    clearSession();
    goToLogin();
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activePage={activePage}
        logout={logout}
        setActivePage={setActivePage}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        {/* Body */}
        <div className="flex-1 p-6">{renderContent()}</div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;
