import Home from "./components/home/Home";
import Auth from "./layouts/Auth";
import BaseTemplate from "./layouts/BaseTemplate";
import AuthGuard from "./layouts/guards/AuthGuard";
import SignIn from "./pages/auth/SignIn";

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
    ],
  },
];

export default routes;
