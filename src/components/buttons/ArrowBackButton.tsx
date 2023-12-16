import React from "react";
import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ArrowBox = styled(Box)(() => ({
  margin: "0 80px",
  a: {
    width: "20px",
    display: "flex",
    padding: "10px",
    color: "#000",
    "&:hover": {
      color: "#000",
      backgroundColor: "#f2f2f2",
      borderRadius: "10px",
    },
    "&:active": {
      color: "#000",
    },
  },
}));

function ArrowBackButton() {
  return (
    <ArrowBox>
      <Link to="/">
        <ArrowBackIcon />
      </Link>
    </ArrowBox>
  );
}

export default ArrowBackButton;
