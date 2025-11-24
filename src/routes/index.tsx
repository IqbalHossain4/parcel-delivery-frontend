import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Verify from "../pages/Verify";
import Unauthorized from "../pages/Unauthorized";
import DashboardLayout from "../components/layout/DashboardLayout";
import { generateRoutes } from "../utils/generateRoutes";
import { adminRoutes } from "./adminRoutes";
import type { ISidebarItem, TRole } from "../types";
import { withAuth } from "../utils/withAuth";
import { role } from "../constant/role";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: SignIn,
        path: "/signin",
      },
      {
        Component: SignUp,
        path: "/signup",
      },
      {
        Component: Unauthorized,
        path: "/unauthorized",
      },
      {
        Component: Verify,
        path: "/verify",
      },
    ],
  },

  //Admin Routes
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminRoutes as ISidebarItem[]),
    ],
  },
]);
