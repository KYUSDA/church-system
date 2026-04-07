import { Routes, Route } from "react-router-dom";
import MainPage from "./App";
import { AuthRoutes } from "./routes/auth";
import { Landingpage } from "./routes/landingpage";
import { DashboardRoutes } from "./routes/dashboard";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* OTHER ROUTES */}
      {AuthRoutes}
      {Landingpage}
      {DashboardRoutes}
    </Routes>
  );
};

export default Home;
