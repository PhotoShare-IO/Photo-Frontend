import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { Box, styled, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { ResetPassword } from "./types";
import TextField from "../../UI/TextField";
import { resetPassword } from "../../utils/auth/resetPassword";

const SubmitButton = styled(LoadingButton)(() => ({
  width: "200px",
  height: "45px",
  marginTop: "20px",
  fontWeight: 700,
}));

const ButtonBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

function PasswordReset() {
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const initialValues: ResetPassword = {
    email: "",
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        })}
        onSubmit={async (values) => {
          const response = await resetPassword(values.email, setErrorMessage);
          if (response?.status === 200) {
            setMessage(response.data.message);
          }
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          errors,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errorMessage && (
              <Alert sx={{ margin: "10px 0" }} severity="warning">
                {errorMessage}
              </Alert>
            )}
            {message && (
              <Alert sx={{ margin: "10px 0" }} severity="info">
                {message}
              </Alert>
            )}
            <TextField
              fullWidth
              value={values.email}
              type="email"
              name="email"
              variant="outlined"
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <ButtonBox>
              <SubmitButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Reset Password
              </SubmitButton>
            </ButtonBox>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default PasswordReset;
