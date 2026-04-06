import { Routes, Route } from "react-router-dom";
import MainPage from "./App";
import { AuthRoutes } from "./routes/auth";
import { Landingpage } from "./routes/landingpage";
import { DashboardRoutes } from "./routes/dashboard";

const Home = () => {
  const hostname = window.location.hostname;

 if (hostname.startsWith("blogs.") && window.location.pathname === "/") {
   window.history.replaceState({}, "", "/blogs");
 }
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      {/* authentication */}
      {AuthRoutes}
      {/* landing page */}
      {Landingpage}
      {/* unified dashboard routes */}
      {DashboardRoutes}
    </Routes>
  );
};

export default Home;
