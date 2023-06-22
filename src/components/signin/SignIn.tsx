import React from "react";
import { Formik } from "formik";
import { TextField as MuiTextField, Box, styled } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Login {
  email: string;
  password: string;
}

const TextField = styled(MuiTextField)(() => ({
  margin: "10px 0",
}));

const SubmitButton = styled(LoadingButton)(() => ({
  width: "250px",
  height: "45px",
  marginTop: "20px",
  backgroundColor: "#ed596f",
  borderRadius: "20px",
  color: "#fff",
  fontWeight: 700,
  border: "none",
  transition: ".2s all ease-in",
  "&:hover": {
    backgroundColor: "#ed596f",
    border: "1px solid #e60022",
    boxShadow: "0 0 0 0.25rem rgba(230, 0, 34, .25)",
  },
}));

const ButtonBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

function SignIn() {
  const { signIn }: any = useAuth();
  const navigate = useNavigate();

  const initialValues: Login = {
    email: "",
    password: "",
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            await signIn(values.email, values.password);
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              value={values.email}
              type="email"
              name="email"
              variant="outlined"
              label="Email"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              value={values.password}
              type="password"
              name="password"
              variant="outlined"
              label="Password"
              onChange={handleChange}
            />
            <ButtonBox>
              <SubmitButton
                type="submit"
                variant="outlined"
                disabled={isSubmitting}
              >
                Log in
              </SubmitButton>
            </ButtonBox>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default SignIn;
