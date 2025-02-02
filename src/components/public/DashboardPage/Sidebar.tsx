import ConfirmationDialog from "../../../components/shared/LogoutDialog";

interface SidebarProps {
  activePage: string;
  logout: () => void;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  activePage,
  logout,
  setActivePage,
}: SidebarProps) {
  return (
    <div className="w-64 bg-base-300 text-white p-5 shadow-lg">
      <h2 className="text-xl font-bold mb-5 text-center">Dashboard</h2>
      <ul className="space-y-3">
        <li
          className={`cursor-pointer py-2 px-4 rounded-lg transition-all duration-300 ${
            activePage === "Task Listings"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-500"
          }`}
          onClick={() => setActivePage("Task Listings")}
        >
          Task Listings
        </li>
        <li
          className={`cursor-pointer py-2 px-4 rounded-lg transition-all duration-300 ${
            activePage === "Settings"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-500"
          }`}
          onClick={() => setActivePage("Settings")}
        >
          Settings
        </li>
      </ul>

      <div className="mt-5">
        <ConfirmationDialog
          title="Confirm Logout"
          message="Are you sure you want to log out?"
          confirmText="Confirm Logout"
          cancelText="Cancel"
          onConfirm={logout}
          onCancel={() => {}}
        />
      </div>
    </div>
  );
}
