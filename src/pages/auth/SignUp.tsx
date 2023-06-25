import LinkToSignIn from "../../components/auth/LinkToSignIn";
import SignUpComponent from "../../components/auth/SignUp";
import { Paper, Box, styled, Typography } from "@mui/material";

const Wrapper = styled(Box)(() => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const FormBox = styled(Paper)(() => ({
  width: "400px",
  height: "720px",
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

function SignUp() {
  return (
    <Wrapper>
      <FormBox>
        <Title>
          <Typography variant="h4">Welcome to Photo-Share</Typography>
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
