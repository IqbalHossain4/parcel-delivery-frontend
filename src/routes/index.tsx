import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

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
    ],
  },
]);
