import {useState} from "react";
import {Formik} from "formik";
import {
  TextField as MuiTextField,
  Box,
  styled,
  InputAdornment,
  IconButton, Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {signUp} from "../../utils/auth/signUp";
import {signIn} from "../../utils/auth/signIn";

interface Register {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
        {showPass ? <VisibilityOff/> : <Visibility/>}
      </IconButton>
    </InputAdornment>
  );

  const inputProps = {
    InputProps: {
      endAdornment,
    },
  };

  const initialValues: Register = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("Username is required"),
          firstName: Yup.string().max(255).required("First name is required"),
          lastName: Yup.string().max(255).required("Last name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Must be at least 12 characters")
            .max(255)
            .required("Password is required"),
          //@ts-ignore
          confirmPassword: Yup.string().when("password", {
            is: (val: string) => !!(val && val.length > 0),
            then: () => Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            ),
          }),
        })}
        onSubmit={async (values) => {
          const response = await signUp(
            values.username,
            values.firstName,
            values.lastName,
            values.email,
            values.password,
            setErrorMessage,
          );
          if (response?.status === 200) {
            const res = await signIn(values.email, values.password, dispatch, setErrorMessage);
            if (res?.status === 200) navigate("/");
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
            {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
            <br/>
            <TextField
              fullWidth
              value={values.username}
              type="text"
              name="username"
              variant="outlined"
              label="Username"
              onChange={handleChange}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              onBlur={handleBlur}
            />
            <TextField
              fullWidth
              value={values.firstName}
              type="text"
              name="firstName"
              variant="outlined"
              label="First Name"
              onChange={handleChange}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              onBlur={handleBlur}
            />
            <TextField
              fullWidth
              value={values.lastName}
              type="text"
              name="lastName"
              variant="outlined"
              label="Last Name"
              onChange={handleChange}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              onBlur={handleBlur}
            />
            <TextField
              fullWidth
              value={values.email}
              type="email"
              name="email"
              variant="outlined"
              label="Email"
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
            />
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
              {...inputProps}
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
              {...inputProps}
            />
            <ButtonBox>
              <SubmitButton
                type="submit"
                variant="outlined"
                disabled={isSubmitting}
              >
                Create an account
              </SubmitButton>
            </ButtonBox>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default SignUp;
