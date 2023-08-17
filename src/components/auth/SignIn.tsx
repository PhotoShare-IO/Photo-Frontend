import { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  styled,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {axiosInstance} from "../../services/axios";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../redux/auth";
import { Login } from "./types";
import TextField from "../../UI/TextField";

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

function SignIn() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      delete axiosInstance.defaults.headers.common.Authorization;
      const response = await axiosInstance.post("/api/auth/login/", {
        email,
        password,
      });
      dispatch(setCredentials(response.data))
    } catch (e: any) {
      setErrorMessage(e?.message)
    }
  }

  const initialValues: Login = {
    email: "",
    password: "",
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
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values) => {
          try {
            await signIn(values.email, values.password);
            navigate("/");
          } catch (error) {
            console.log(error);
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
            {errorMessage}
            <Box>
              <TextField
                fullWidth
                value={values.email}
                type="email"
                name="email"
                variant="standard"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                value={values.password}
                type={showPass ? "text" : "password"}
                name="password"
                variant="standard"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <IconButton
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "18px",
                  },
                  padding: "3px",
                  position: "absolute",
                  top: 35,
                  right: 10,
                }}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            <ButtonBox>
              <SubmitButton
                type="submit"
                variant="contained"
                color="primary"
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
