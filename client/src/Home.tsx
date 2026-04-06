import { Routes, Route } from "react-router-dom";
import MainPage from "./App";
import { AuthRoutes } from "./routes/auth";
import { Landingpage } from "./routes/landingpage";
import { DashboardRoutes } from "./routes/dashboard";
import BlogsPage from "./blogs/blog";
import BlogDetail from "./blogs/blogDetail";

const Home = () => {
  const hostname = window.location.hostname;
  const isBlogDomain = hostname.startsWith("blogs.");

  return (
    <Routes>
      <Route path="/" element={isBlogDomain ? <BlogsPage /> : <MainPage />} />
      {/* BLOG ROUTES */}
      {!isBlogDomain && <Route path="/blogs" element={<BlogsPage />} />}

      <Route
        path={isBlogDomain ? "/:slug" : "/blogs/:slug"}
        element={<BlogDetail />}
      />

      {/* OTHER ROUTES */}
      {!isBlogDomain && AuthRoutes}
      {!isBlogDomain && Landingpage}
      {!isBlogDomain && DashboardRoutes}
    </Routes>
  );
};

export default Home;
