import LogoutDialog from "../../../components/shared/LogoutDialog";

interface SidebarProps {
  activePage: string;
  goToLogin: () => void;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  activePage,
  goToLogin,
  setActivePage,
}: SidebarProps) {
  return (
    <div className="w-64 bg-gray-500 text-white p-5">
      <h2 className="text-xl font-bold mb-5">Dashboard</h2>
      <ul>
        <li
          className={`cursor-pointer py-2 ${
            activePage === "Settings" ? "font-bold" : ""
          }`}
          onClick={() => setActivePage("Settings")}
        >
          Settings
        </li>
        <li
          className={`cursor-pointer py-2 ${
            activePage === "Task Listings" ? "font-bold" : ""
          }`}
          onClick={() => setActivePage("Task Listings")}
        >
          Task Listings
        </li>

        <LogoutDialog onConfirm={goToLogin} />
      </ul>
    </div>
  );
}
