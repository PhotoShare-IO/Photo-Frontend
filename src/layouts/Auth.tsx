import { ReactNode } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

function Auth({ children }: Props) {
  return (
    <Box>
      <Box>{children}</Box>
      <Outlet />
    </Box>
  );
}

export default Auth;
