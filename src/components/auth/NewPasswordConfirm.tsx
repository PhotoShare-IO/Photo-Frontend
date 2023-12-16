import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { Box, styled, Alert, InputAdornment, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { NewPassword } from "./types";
import TextField from "../../UI/TextField";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { resetPasswordConfirm } from "../../utils/auth/resetPasswordConfirm";
import { Params, useParams } from "react-router-dom";

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

function NewPasswordConfirm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);

  const params: Readonly<Params<string>> = useParams();

  const initialValues: NewPassword = {
    password: "",
    confirmPassword: "",
  };

  const handleClickShowPassword = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPass ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(8, "Must be at least 12 characters")
            .max(255)
            .required("Password is required"),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          confirmPassword: Yup.string().when("password", {
            is: (val: string) => !!(val && val.length > 0),
            then: () =>
              Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same",
              ),
          }),
        })}
        onSubmit={async (values) => {
          if (params.uid64 && params.token) {
            const response = await resetPasswordConfirm(
              values.password,
              params.uid64,
              params.token,
              setErrorMessage,
            );
            if (response?.status === 200) {
              setMessage(response.data.message);
            }
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
              variant="outlined"
              type={showPass ? "text" : "password"}
              name="password"
              label="Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={endAdornment}
            />
            <TextField
              fullWidth
              variant="outlined"
              type={showPass ? "text" : "password"}
              name="confirmPassword"
              label="Confirm password"
              value={values.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={endAdornment}
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

export default NewPasswordConfirm;
