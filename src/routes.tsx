import React from "react";
import Home from "./components/startpage/Home";
import Auth from "./layouts/Auth";
import BaseTemplate from "./layouts/BaseTemplate";
import AuthGuard from "./layouts/guards/AuthGuard";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import NonFound from "./components/NonFound";
import BaseGuard from "./layouts/guards/BaseGuard";

const routes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <BaseTemplate />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "*",
        element: <NonFound />,
      },
    ],
  },
  {
    path: "auth",
    element: (
      <BaseGuard>
        <Auth />
      </BaseGuard>
    ),
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NonFound />,
  },
];

export default routes;
