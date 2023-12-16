import React from "react";
import Home from "./pages/main/Home";
import Auth from "./layouts/Auth";
import BaseTemplate from "./layouts/BaseTemplate";
import AuthGuard from "./layouts/guards/AuthGuard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import NonFound from "./components/NonFound";
import BaseGuard from "./layouts/guards/BaseGuard";
import PostDetail from "./pages/main/PostDetail";
import AuthForm from "./pages/auth/AuthForm";
import LinkToSignIn from "./components/auth/LinkToSignIn";
import LinkToSignUp from "./components/auth/LinkToSignUp";
import PasswordReset from "./components/auth/PasswordReset";
import NewPasswordConfirm from "./components/auth/NewPasswordConfirm";

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
        path: "post/:postID",
        element: <PostDetail />,
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
        element: (
          <AuthForm authComponent={<SignIn />} link={<LinkToSignUp />} />
        ),
      },
      {
        path: "register",
        element: (
          <AuthForm authComponent={<SignUp />} link={<LinkToSignIn />} />
        ),
      },
      {
        path: "password-reset",
        element: (
          <AuthForm authComponent={<PasswordReset />} link={<LinkToSignIn />} />
        ),
      },
      {
        path: "password-reset-confirm/:uid64/:token",
        element: (
          <AuthForm
            authComponent={<NewPasswordConfirm />}
            link={<LinkToSignIn />}
          />
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NonFound />,
  },
];

export default routes;
