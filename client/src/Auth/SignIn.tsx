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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import { useLogin } from "../hooks/userLoginHook";
import AuthLayout from "./AuthLayout";
import { getApiErrorMessage } from "@/utils/Error-handler";
import { toast } from "sonner";

const SignInSide = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const { loginUser, error, isLoading } = useLogin();

  interface formData {
    email: string;
    password: string;
  }

  const values: formData = {
    email,
    password,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await loginUser(values);
      // Clear inputs after login attempt (optional: only if no error)
      if (!error) {
        setEmail("");
        setPassword("");
        setTouchedEmail(false);
        setTouchedPassword(false);
      }
    } catch (err: any) {
      const message = getApiErrorMessage(
        err,
        "Login failed, please try again."
      );
      toast.error(message);
    }
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <AuthLayout>
      <Box className="w-full flex items-center justify-center h-screen">
        <Box className="bg-white rounded-md shadow-md shadow-gray-400 max-w-md w-full p-6 max-md:py-4 max-500:p-2 mx-2">
          <Box className="flex flex-col items-center">
            <Avatar className="m-2" sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && <p className="text-red-400 text-md">{error}</p>}

            {/* Sign-in Form */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              className="w-full mt-4"
            >
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
                onBlur={() => setTouchedEmail(true)} // Mark as touched when leaving the field
                error={touchedEmail && email.trim() === ""}
                helperText={
                  touchedEmail && email.trim() === "" ? "Email is required" : ""
                }
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
                onBlur={() => setTouchedPassword(true)} // Mark as touched when leaving the field
                error={touchedPassword && password.trim() === ""}
                helperText={
                  touchedPassword && password.trim() === ""
                    ? "Password is required"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="mt-3 mb-2"
                disabled={!isFormValid || isLoading} // Disable button while loading
              >
                Sign In
              </Button>

              <div className="flex justify-between text-sm mt-3 w-full">
                <Link href="/resetToken">Forgot password?</Link>
                <Link href="/signUp">{"Don't have an account? Sign Up"}</Link>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Loading Spinner (Backdrop) */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Boolean(isLoading)}
      >
        <CircularProgress color="inherit" size={50} />
        <Typography variant="h6">Signing in...</Typography>
      </Backdrop>
    </AuthLayout>
  );
};

export default SignInSide;
