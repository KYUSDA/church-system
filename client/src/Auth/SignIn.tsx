import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useLogin } from "../hooks/userLoginHook";
import AuthLayout from "./AuthLayout";


const SignInSide = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, error } = useLogin();


  interface formData {
    email: string;
    password: string;
  }

  const values: formData ={
    email,
    password
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginUser(values);
    setEmail("");
    setPassword("");
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <AuthLayout>
      <Box className="w-full max-w-md flex flex-col items-center">
        <Avatar className="m-2" sx={{ bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/* Sign-in Form */}
        <Box component="form" noValidate onSubmit={handleSubmit} className="w-full mt-4">
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            id="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email === ""}
            helperText={email === "" ? "Email is required" : ""}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password === ""}
            helperText={password === "" ? "Password is required" : ""}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <FormControlLabel
            control={<Checkbox color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
            label="Remember me"
          />

          {error && <p className="text-red-400 text-md">{error}</p>}

          <Button type="submit" fullWidth variant="contained" className="mt-3 mb-2" disabled={!isFormValid}>
            Sign In
          </Button>

          <div className="flex justify-between text-sm mt-3 w-full">
            <Link href="/resetToken">Forgot password?</Link>
            <Link href="/signUp">{"Don't have an account? Sign Up"}</Link>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default SignInSide;
