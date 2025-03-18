import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AuthLayout from "./AuthLayout.js";
import { useAuthSignupMutation } from "../services/authService";
import { userRegisterSchema } from "../utils/registerSchema";
import { useContextFunc } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const theme = createTheme();

interface formData{
  firstName: string;
  lastName: string;
  email:string;
  registration: string;
  course: string;
  year: string;
  phoneNumber: string;
  password:string;
  policyAccepted: false,
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading}] = useAuthSignupMutation();
  const {setActivationToken} = useContextFunc();
  const navigate = useNavigate();

  // Destructuring Formik
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      registration: "",
      course: "",
      year: "",
      phoneNumber: "",
      password: "",
      policyAccepted: false,
    },
    validationSchema: userRegisterSchema,
    onSubmit: async (values:formData) => {
      try {
        const response = await registerUser(values).unwrap();
        if(response){
          if(response.activationToken){
            setActivationToken(response.activationToken); 
            navigate('/activate-me');
            toast.success("Registration Success");
          }
        }else{
          toast.error("Registration failed");
        }
      } catch (err:any) {
        if (err?.status === 409 || err?.data?.message?.includes("already exists")) {
          toast.error(err.data.message);
        } else {
          toast.error("Registration failed, please try again.");
        }
      }
    },
  });

  return (
    <AuthLayout>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ mt: 50, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                margin="normal"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                margin="normal"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                label="Registration Number"
                name="registration"
                fullWidth
                margin="normal"
                value={values.registration}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.registration && Boolean(errors.registration)}
                helperText={touched.registration && errors.registration}
              />
              <TextField
                label="Course"
                name="course"
                fullWidth
                margin="normal"
                value={values.course}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.course && Boolean(errors.course)}
                helperText={touched.course && errors.course}
              />
              <TextField
                name="year"
                select
                fullWidth
                margin="normal"
                SelectProps={{ native: true }}
                value={values.year}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.year && Boolean(errors.year)}
                helperText={touched.year && errors.year}
              >
                <option value="">Select year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="10">Alumni</option>
              </TextField>
              <PhoneInput
                country={"ke"}
                value={values.phoneNumber}
                onChange={(phone) => setFieldValue("phoneNumber", phone)}
                inputStyle={{ width: "100%", height: "56px" }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
              
              <FormControlLabel
                control={
                  <Checkbox
                    name="policyAccepted"
                    color="primary"
                    checked={values.policyAccepted}
                    onChange={handleChange}
                  />
                }
                label="Accept policy set at Kyusda"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading || !isValid || !dirty || !values.policyAccepted}
              >
                Sign Up
              </Button>
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
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Boolean(isLoading)}>
            <CircularProgress color="inherit" size={50} />
            <Typography variant="h6">Creating your account...</Typography>
          </Backdrop>
        </Container>
      </ThemeProvider>
    </AuthLayout>
  );
};

export default SignUp;
