import { Routes, Route } from "react-router-dom";
import MainPage from "./App";
import { AuthRoutes } from "./routes/auth";
import {Landingpage} from "./routes/landingpage";
import { User } from "./routes/user";
import { Admin } from "./routes/admin";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      {/* authentication */}
      {AuthRoutes}
      {/* landing page */}
      {Landingpage}
      {/* user dashboard */}
      {User}
      {/* admin dashboard */}
      {Admin}
    </Routes>
  );
};

export default Home;
