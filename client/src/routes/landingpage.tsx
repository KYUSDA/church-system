import { Outlet, Route } from "react-router-dom";
import Families from "../LandingPage/Family/Families";
import Departments from "../LandingPage/Department/Departments";
import DepartmentsDetails from "../LandingPage/Department/DepartmentsDetails";
import PrivacyPolicy from "../LandingPage/Policy";
import Terms from "../LandingPage/Terms";
import Layout from "../LandingPage/Layout";
import DonationPage from "../LandingPage/donation";
import SingleFamily from "../LandingPage/Family/FamiliyDetails";
import Memories from "@/LandingPage/Memories";
import Resources from "@/LandingPage/Resources/Resources";
import Magazine from "@/LandingPage/Magazine";
import About from "@/LandingPage/About";

export const Landingpage = (
  <Route
    element={
      <Layout>
        <Outlet />
      </Layout>
    }
  >
    <Route path="/about" element={<About />} />

    <Route path="/families" element={<Families />} />

    <Route path="/families/:id" element={<SingleFamily />} />

    <Route path="/Departments" element={<Departments />} />
    <Route path="/Departments/:id" element={<DepartmentsDetails />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/kyusda-magazine" element={<Magazine />} />
    <Route path="/donation" element={<DonationPage />} />
    <Route path="/church-gallery" element={<Memories />} />
    <Route path="/policy" element={<PrivacyPolicy />} />
    <Route path="/terms" element={<Terms />} />
  </Route>
);
