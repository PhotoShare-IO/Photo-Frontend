import React, { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";

import { getAccessToken } from "../../services/tokens";

interface Props {
  children?: ReactNode;
}

function AuthGuard({ children }: Props) {
  const [token] = useState<string | null>(getAccessToken());

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}

export default AuthGuard;
