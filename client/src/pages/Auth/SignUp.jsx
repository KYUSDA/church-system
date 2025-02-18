import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link"; // Import Link
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSignUp } from "../../hooks/userSignUpHook.jsx";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconButton, InputAdornment, CircularProgress, Backdrop } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthLayout from "./AuthLayout.jsx";

const theme = createTheme();

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, loading, error, clearError } = useSignUp();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      registration: "",
      email: "",
      course: "",
      year: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
      policyAccepted: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      registration: Yup.string().required("Registration is required"),
      course: Yup.string().required("Course is required"),
      year: Yup.string().required("Year is required"),
      password: Yup.string().min(8, "Must be 8 chars").required("Password required"),
      passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
    onSubmit: (values) => {
      signUp(
        values.firstName,
        values.lastName,
        values.registration,
        values.email,
        values.course,
        values.year,
        values.password,
        values.passwordConfirm,
        values.phoneNumber
      );
      formik.resetForm();
    },
  });

  return (
    <AuthLayout>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ mt: 50, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              <Box>
                <TextField label="First Name" name="firstName" fullWidth margin="normal" {...formik.getFieldProps("firstName")} />
                <TextField label="Last Name" name="lastName" fullWidth margin="normal" {...formik.getFieldProps("lastName")} />
                <TextField label="Email" name="email" fullWidth margin="normal" {...formik.getFieldProps("email")} />
                <TextField label="Registration Number" name="registration" fullWidth margin="normal" {...formik.getFieldProps("registration")} />
                <TextField label="Course" name="course" fullWidth margin="normal" {...formik.getFieldProps("course")} />
                <TextField  name="year" select fullWidth margin="normal" {...formik.getFieldProps("year")} SelectProps={{ native: true }}>
                  <option value="">Select year</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="10">Alumni</option>
                </TextField>
                <PhoneInput country={"ke"} value={formik.values.phoneNumber} onChange={(phone) => formik.setFieldValue("phoneNumber", phone)} inputStyle={{ width: "100%", height: "56px" }} />
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Password"
                  name="passwordConfirm"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps("passwordConfirm")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel control={<Checkbox name="policyAccepted" color="primary" checked={formik.values.policyAccepted} onChange={formik.handleChange} />} label="Accept policy set at Kyusda" />
              </Box>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading || !formik.isValid || !formik.dirty || !formik.values.policyAccepted}>
                Sign Up
              </Button>
              {error && <Typography color="error">{error}</Typography>}

              {/* Add the "Already registered?" link here */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link href="/signIn" variant="body2">
                    Login
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Boolean(loading)}>
            <CircularProgress color="inherit" size={50} />
            <Typography variant="h6">Creating your account...</Typography>
          </Backdrop>
        </Container>
      </ThemeProvider>
    </AuthLayout>
  );
};

export default SignUp;
