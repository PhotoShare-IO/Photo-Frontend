import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { getAccessToken } from "../../services/tokens";

interface Props {
  children?: ReactNode;
}

function BaseGuard({ children }: Props) {
  const token = getAccessToken();

  if (token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default BaseGuard;
