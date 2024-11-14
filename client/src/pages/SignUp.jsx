import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Navbar/Header.jsx";
import { useSignUp } from "../hooks/userSignUpHook.jsx";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="/">
                KYUSDA
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const validationSchema = Yup.object({
    firstName: Yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
    lastName: Yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    registration: Yup.string().matches(/^[A-Z]+\d+\/[A-Z]\/\d+\/\d{2}$/, 'Registration must follow format: CICT101/G/62683/19').required('Registration is required'),
    course: Yup.string().required("Course is required"),
    year: Yup.string().required("Year is required"),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&\-_])[A-Za-z\d#@$!%*?&\-_]+$/,
            'Password must contain uppercase, lowercase, number and special character (#@$!%*?&-_)'
        )
        .required('Password is required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
    phoneNumber: Yup.string().required('Phone number is required')
})


const theme = createTheme();
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { signUp, loading, error, clearError } = useSignUp();
    console.log(error, "error");
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
            phoneNumber: '',
            policyAccepted: false
        },
        validationSchema,
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
        onChange: (e) => {
            clearError();
            formik.handleChange(e);
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={formik.handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    value={formik.values.firstName}
                                    onChange={(e) => {
                                        clearError();
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    value={formik.values.lastName}
                                    onChange={(e) => {
                                        clearError();
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        clearError();
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="registration"
                                    name="registration"
                                    label="Registration Number"
                                    placeholder="CT101/G/62683/19"
                                    value={formik.values.registration}
                                    onChange={(e) => {
                                        clearError();
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.registration && Boolean(formik.errors.registration)}
                                    helperText={formik.touched.registration && formik.errors.registration}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="course"
                                    name="course"
                                    label="Course"
                                    value={formik.values.course}
                                    onChange={(e) => {
                                        clearError();
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.course && Boolean(formik.errors.course)}
                                    helperText={formik.touched.course && formik.errors.course}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    id="year"
                                    name="year"
                                    value={formik.values.year}
                                    onChange={(e) => {
                                        clearError();
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.year && Boolean(formik.errors.year)}
                                    helperText={formik.touched.year && formik.errors.year}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">Select year</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="10">Alumni</option>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <PhoneInput
                                    country={'ke'}
                                    value={formik.values.phoneNumber}
                                    onChange={(phone) => {
                                        clearError();
                                        formik.setFieldValue('phoneNumber', phone)
                                    }}
                                    inputStyle={{
                                        width: '100%',
                                        height: '56px',
                                        fontSize: '16px',
                                        paddingLeft: '48px'
                                    }}
                                    containerStyle={{
                                        width: '100%'
                                    }}
                                    dropdownStyle={{
                                        width: '300px'
                                    }}
                                    enableSearch={true}
                                    searchPlaceholder="Search country..."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={formik.values.password}
                                    onChange={(e) => {
                                        clearError();
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Confirm Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="passwordConfirm"
                                    value={formik.values.passwordConfirm}
                                    onChange={(e) => {
                                        clearError();
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                                    helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox name="policyAccepted" value="allowExtraEmails" color="primary" checked={formik.values.policyAccepted} onChange={formik.handleChange} />
                                    }
                                    label="Accept policy set at Kyusda"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading || !formik.isValid || !formik.dirty || !formik.values.policyAccepted}
                        >
                            Sign Up
                        </Button>
                        {error && <span className="text-red-400">{error}</span>}

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <a href="/signIn" variant="body2">
                                    Already have an account? Sign in
                                </a>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
                open={Boolean(loading)}
            >
                <CircularProgress color="inherit" size={50} />
                <Typography variant="h6" color="inherit">
                    Creating your account...
                </Typography>
            </Backdrop>
        </ThemeProvider>
    );
};
export default SignUp;
