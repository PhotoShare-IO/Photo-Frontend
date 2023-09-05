import React from "react";
import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

const Wrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Image = styled("img")(() => ({
  width: "700px",
  height: "700px",
  borderRadius: "43% 57% 70% 30% / 35% 40% 60% 65% ",
  position: "absolute",
  zIndex: -1,
  // filter: "blur(3px)"
}));

function Auth() {
  return (
    <Wrapper>
      <Image src="/images/authLayoutImage.jpg" alt="" />
      <Outlet />
    </Wrapper>
  );
}

export default Auth;
