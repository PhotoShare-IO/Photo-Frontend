import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledTypography = styled(Typography)(() => ({
  marginLeft: "7px",
  fontSize: "13px",
  textDecoration: "none",
  color: "deepskyblue",
  fontWeight: 400,
}));

function LinkToSignUp() {
  return (
    <Box>
      <Typography sx={{ fontSize: "13px", fontWeight: 400 }}>
        Don't have an account?
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <StyledTypography component={Link} to="/auth/register">
          Sign Up
        </StyledTypography>
      </Typography>
    </Box>
  );
}

export default LinkToSignUp;
