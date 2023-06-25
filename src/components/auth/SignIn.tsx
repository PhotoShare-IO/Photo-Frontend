import { useState } from "react";
import { Formik } from "formik";
import {
  TextField as MuiTextField,
  Box,
  styled,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

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
    border: "none",
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
  const [showPass, setShowPass] = useState(false);

  const handleClickShowPassword = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

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
            <Box sx={{ position: "relative", display: "inline" }}>
              <TextField
                fullWidth
                value={values.password}
                type={showPass ? "text" : "password"}
                name="password"
                variant="outlined"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: 18,
                  right: 0,
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
