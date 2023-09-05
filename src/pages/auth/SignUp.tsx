import React from "react";
import LinkToSignIn from "../../components/auth/LinkToSignIn";
import SignUpComponent from "../../components/auth/SignUp";
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
  padding: "30px",
  border: `1px dashed ${COLORS.main}`,
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

function SignUp() {
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
        <SignUpComponent />
        <Box>
          <ForgotPassword variant="subtitle2">Forgot password?</ForgotPassword>
        </Box>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <LinkToSignIn />
        </Box>
      </FormBox>
    </Wrapper>
  );
}

export default SignUp;
