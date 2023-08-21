import LinkToSignUp from "../../components/auth/LinkToSignUp";
import SignInComponent from "../../components/auth/SignIn";
import {Paper, Box, styled, Typography} from "@mui/material";
import {COLORS} from "../../theme/colors";
import * as React from "react";

const Wrapper = styled(Box)(() => ({
  width: "100%",
  height: "calc(100vh - 64px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const FormBox = styled(Paper)(() => ({
  width: "320px",
  minHeight: "380px",
  border: `1px dashed ${COLORS.main}`,
  padding: "40px",
}));

const Title = styled(Box)(() => ({
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "15px",
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
        <SignInComponent/>
        <Box>
          <ForgotPassword variant="subtitle2">Forgot password?</ForgotPassword>
        </Box>
        <Box sx={{textAlign: "center", mt: 2}}>
          <LinkToSignUp/>
        </Box>
      </FormBox>
    </Wrapper>
  );
}

export default SignIn;
