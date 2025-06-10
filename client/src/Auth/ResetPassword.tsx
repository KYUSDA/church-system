import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { getBaseUrl } from "../services/authService";
import AuthLayout from "./AuthLayout";
import { toast } from "sonner";
import { SyncLoader } from "react-spinners";

const theme = createTheme();

export default function Newpassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = getBaseUrl();

  useEffect(() => {
    const tk = localStorage.getItem("Reset token");
    setToken(tk || "");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const url = `${baseUrl}/member/resetPassword/${token}`;
      const resp = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, passwordConfirm }),
      });

      const data = await resp.json();
      if (data.status === "success") {
        toast.success(data.message || "Password updated successfully");
        setPassword("");
        setPasswordConfirm("");
      } else {
        toast.error(data.err || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflowY: "hidden",
            px: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%", maxWidth: 400 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="passwordConfirm"
              label="Confirm Password"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <SyncLoader color="#1c8e90" size={6} />
              ) : (
                "Update Password"
              )}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link href="/signIn" variant="body2">
                Login Page
              </Link>
              <Link href="/signUp" variant="body2">
                Don’t have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </AuthLayout>
  );
}
