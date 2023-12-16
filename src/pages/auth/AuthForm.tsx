import React from "react";
import { Paper, Box, styled, Typography } from "@mui/material";
import { COLORS } from "../../theme/colors";
import { useNavigate } from "react-router-dom";

type Props = {
  authComponent: React.ReactNode;
  link: React.ReactNode;
};

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
  cursor: "pointer",
}));

function AuthForm({ authComponent, link }: Props) {
  const navigate = useNavigate();

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
        {authComponent}
        <Box>
          <ForgotPassword
            variant="subtitle2"
            onClick={() => navigate("/auth/password-reset")}
          >
            Forgot password?
          </ForgotPassword>
        </Box>
        <Box sx={{ textAlign: "center", mt: 2 }}>{link}</Box>
      </FormBox>
    </Wrapper>
  );
}

export default AuthForm;
