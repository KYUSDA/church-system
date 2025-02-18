import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import AuthLayout from './AuthLayout.jsx';

const theme = createTheme();

export default function ResetInSide(props) {
  const [email, setEmail] = useState();
  const [token, setToken] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmail('');
    const url = `https://kyusdabackend.azurewebsites.net/kyusda/v1/member/resetToken`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await resp.json();
    console.log(data.resetToken);
    if (data.status === 'success') {
      alert(`Password reset token sent successfully. Check your email.`);
      setToken(data.resetToken);
      localStorage.setItem('Reset token', data.resetToken);
    } else {
      alert('Something went wrong.');
    }
  };

  console.log(token);

  return (
    <AuthLayout>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'background.paper',
            p: 3
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            RESET PASSWORD
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send Reset Token
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="/signIn" variant="body2">
                {"Login page"}
              </Link>
              <Link href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </AuthLayout>
  );
}
