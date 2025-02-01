import DashboardPage from "../../components/public/DashboardPage/DashboardPage";
import LoginPage from "../../components/public/LoginPage/LoginPage";
import NotFoundPage from "../../components/public/NotFound/NotFound";
import RegisterPage from "../../components/public/RegisterPage/RegisterPage";
import { routerPaths } from "../../constants/routes";

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
