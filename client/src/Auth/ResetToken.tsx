import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import AuthLayout from './AuthLayout.js';
import { getBaseUrl } from '@/services/base_query';
import { toast } from 'sonner';

const theme = createTheme();

interface ResetInSideProps {}

interface ResetTokenResponse {
  status: string;
  resetToken: string;
}

export default function ResetInSide(props: ResetInSideProps) {
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const baseUrl = getBaseUrl();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail('');
    const resp = await fetch(`${baseUrl}/member/resetToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data: ResetTokenResponse = await resp.json();
    if (data.status === 'success') {
      toast.success(`Password reset token sent successfully. Check your email.`);
      setToken(data.resetToken);
    } else {
      toast.error('Something went wrong.');
    }
  };

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
