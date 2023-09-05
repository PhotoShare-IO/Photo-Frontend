import React from "react";
import LinkToSignUp from "../../components/auth/LinkToSignUp";
import SignInComponent from "../../components/auth/SignIn";
import { Paper, Box, styled, Typography } from "@mui/material";
import { COLORS } from "../../theme/colors";

const Wrapper = styled(Box)(() => ({
  minWidth: "320px",
  height: "calc(100vh - 64px)",
  display: "flex",
  alignItems: "center",
}));

const FormBox = styled(Paper)(() => ({
  width: "320px",
  border: `1px dashed ${COLORS.main}`,
  padding: "30px",
  opacity: ".96",
}));

const Title = styled(Box)(() => ({
  fontWeight: 700,
  textAlign: "center",
}));

const ForgotPassword = styled(Typography)(() => ({
  color: "deepskyblue",
  textAlign: "center",
  marginTop: "20px",
}));

function SignIn() {
  return (
    <Wrapper>
      <FormBox>
        <Title>
          <Box sx={{ marginBottom: "15px" }}>
            <Typography sx={{ color: COLORS.main }} variant="h4">
              <b>Ph-Sh</b>
            </Typography>
          </Box>
          <Typography variant="h4">Welcome!</Typography>
        </Title>
        <SignInComponent />
        <Box>
          <ForgotPassword variant="subtitle2">Forgot password?</ForgotPassword>
        </Box>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <LinkToSignUp />
        </Box>
      </FormBox>
    </Wrapper>
  );
}

export default SignIn;
