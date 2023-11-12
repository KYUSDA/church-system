import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import { UNSAFE_DataRouterStateContext } from 'react-router-dom';
import Header from '../Navbar/Header';
import MainFooter from '../Footer/MainFooter';
import { useSignup } from '../../hooks/userSignuphook';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        KYUSDA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const SignUp = () => {
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [registration, setregistration] = useState();
  const [email, setemail] = useState();
  const [course, setcourse] = useState();
  const [year, setyear] = useState();
  const [password, setpassword] = useState();
  const [passwordConfirm, setpasswordConfirm] = useState();

  const { signup, loading, error } = useSignup();
  const handleSubmit = async (event) => {
    console.log(firstName)
    event.preventDefault();
    setfirstName('');
    setlastName('');
    setregistration('');
    setemail('');
    setcourse('');
    setyear('');
    setpassword('');
    setpasswordConfirm('');
    await signup(firstName, lastName, registration, email, course
      , year, password,
      passwordConfirm)
  };
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="registration"
                  label='Registration'
                  value={registration}
                  onChange={(e) => setregistration(e.target.value)}
                  autoComplete="registration"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="course"
                  label="Course"
                  value={course}
                  onChange={(e) => setcourse(e.target.value)}
                  autoComplete="course"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="year"
                  label="Year"
                  value={year}
                  onChange={(e) => setyear(e.target.value)}
                  autoComplete="year"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password Confirmation"
                  type="password"
                  id="passwordconfirm"
                  value={passwordConfirm}
                  onChange={(e) => setpasswordConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox
                    value="allowExtraEmails" color="primary" />}
                  label="Accept policy set at Kyusda"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign Up
            </Button>
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
      {error && <div>{error}</div>}
      <div style={{ marginTop: "40px" }}>
        <MainFooter />
      </div>
    </ThemeProvider>
  )
}
export default SignUp
