import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function AuthGuard({ children }: Props) {
  const { isAuthenticated, isInitialized, user } = useAuth();

  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && user && user.id) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default AuthGuard;
