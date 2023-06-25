import Home from "./components/home/Home";
import Landing from "./components/landing/Landing";
import Auth from "./layouts/Auth";
import BaseTemplate from "./layouts/BaseTemplate";
import Presentation from "./layouts/Presentation";
import AuthGuard from "./layouts/guards/AuthGuard";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

const routes = [
  {
    path: "/",
    element: <Presentation />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
    ],
  },
  {
    path: "",
    element: (
      <AuthGuard>
        <BaseTemplate />
      </AuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
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
];

export default routes;
