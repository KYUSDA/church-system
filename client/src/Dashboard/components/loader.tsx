import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

interface LoaderProps {
  isLoading: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, text = "Loading..." }) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
      <Box display="flex" alignItems="center" gap={2} bgcolor="rgba(0,0,0,0.7)" p={2} borderRadius={2}>
        {/* Rounded Logo */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s" // Replace with your logo path
          alt="Logo"
          className="rounded-full w-12 h-12"
        />
        <Box>
          <CircularProgress color="inherit" size={40} />
          <Typography variant="h6" mt={1}>{text}</Typography>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default Loader;
