import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { getAccessToken } from "../../services/tokens";

interface Props {
  children?: ReactNode;
}

function AuthGuard({ children }: Props) {
  const { isAuthenticated } = useAuth();
  const token = getAccessToken()

  if (!isAuthenticated && !token) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}

export default AuthGuard;
