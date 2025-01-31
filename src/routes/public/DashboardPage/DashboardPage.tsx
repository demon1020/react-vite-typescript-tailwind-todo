import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "../../../constants/routes";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Settings from "../SettingsPage/SettingsPage";

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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activePage={activePage}
        goToLogin={goToLogin}
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

function TaskListing() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      Task Listings Page Content
    </div>
  );
}
