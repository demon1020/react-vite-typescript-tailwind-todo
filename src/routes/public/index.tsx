import { routerPaths } from "../../constants/routes";
import DashboardPage from "./DashboardPage/DashboardPage";
import LoginPage from "./LoginPage/LoginPage";
import NotFoundPage from "./NotFound/NotFound";
import RegisterPage from "./RegisterPage/RegisterPage";

export default [
  {
    path: routerPaths.LOGIN_PAGE,
    element: <LoginPage />,
  },
  {
    path: routerPaths.REGISTER_PAGE,
    element: <RegisterPage />,
  },
  {
    path: routerPaths.DASHBOARD_PAGE,
    element: <DashboardPage />,
  },
  {
    path: routerPaths.NOT_FOUND,
    element: <NotFoundPage />,
  },
];
