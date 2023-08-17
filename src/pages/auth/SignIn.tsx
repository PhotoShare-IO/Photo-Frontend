import LinkToSignUp from "../../components/auth/LinkToSignUp";
import SignInComponent from "../../components/auth/SignIn";
import { Paper, Box, styled, Typography } from "@mui/material";

const Wrapper = styled(Box)(() => ({
  width: "100%",
  height: "calc(100vh - 64px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const FormBox = styled(Paper)(() => ({
  width: "400px",
  minHeight: "420px",
  background: "white",
  borderRadius: "10px",
  padding: "20px",
}));

const Title = styled(Typography)(() => ({
  fontWeight: 700,
  textAlign: "center",
  margin: "15px",
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
          <Typography variant="h4">Welcome to Photo-Share</Typography>
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
