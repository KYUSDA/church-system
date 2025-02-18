import React from "react";
import { Box, Paper, CssBaseline } from "@mui/material";
import imageSide from "../../assets/kyusdachurch.jpg";
import Header from "../../components/Navbar/Header";

const AuthLayout = ({ children }) => {
  return (
    <>
    <Header />
  
    <Box className="h-screen flex">
      <CssBaseline />

      {/* Left Side - Image (Fixed) */}
      <Box
        className="hidden sm:flex w-2/5 md:w-7/12 bg-cover bg-center"
        sx={{
          backgroundImage: `url('https://i.pinimg.com/736x/79/c6/46/79c64630fac089030d1adfba891d9f7a.jpg')`,
        }}
      />

      {/* Right Side - Authentication Forms (Scrollable) */}
      <Paper
        elevation={6}
        square
        className="w-full sm:w-3/5 md:w-5/12 flex justify-center p-8"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh", // Full height for the Paper container
          overflowY: "auto", // Makes the content scrollable
          WebkitOverflowScrolling: "touch", // Smooth scrolling on mobile
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar in Webkit browsers (Chrome, Safari)
          },
        }}
      >
        <Box className="w-full max-w-md" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Paper>
    </Box>
    </>
  );
};

export default AuthLayout;
