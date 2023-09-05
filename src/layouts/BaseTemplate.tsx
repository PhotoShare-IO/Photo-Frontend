import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function BaseTemplate() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default BaseTemplate;
