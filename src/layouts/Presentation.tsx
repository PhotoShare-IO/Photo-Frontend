import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type Children = {
  children?: ReactNode;
};

function Presentation({ children }: Children) {
  return (
    <Box>
      <Box>{children}</Box>
      <Outlet />
    </Box>
  );
}

export default Presentation;
