import { Route } from "react-router-dom";
import Families from "../LandingPage/Family/Families";
import Departments from "../LandingPage/Department/Departments";
import DepartmentsDetails from "../LandingPage/Department/DepartmentsDetails";
import PrivacyPolicy from "../LandingPage/Footer/Policy";
import Terms from "../LandingPage/Footer/Terms";
import Layout from "../LandingPage/Footer/Layout";
import DonationPage from "../LandingPage/donation/donation";
import SingleFamily from "../LandingPage/Family/FamiliyDetails";
import KyuSda from "../LandingPage/Gallery/KyuSdaGallery";

export const Landingpage = (
  <>
    <Route
      path="/families"
      element={
        <Layout>
          <Families />
        </Layout>
      }
    />

    <Route
      path="/families/:id"
      element={
        <Layout>
          <SingleFamily />
        </Layout>
      }
    />

    <Route
      path="/Departments"
      element={
        <Layout>
          <Departments />
        </Layout>
      }
    />
    <Route
      path="/Departments/:id"
      element={
        <Layout>
          <DepartmentsDetails />
        </Layout>
      }
    />
    <Route
      path="/donation"
      element={
        <Layout>
          <DonationPage />
        </Layout>
      }
    />
    <Route
      path="/church-gallery"
      element={
        <Layout>
          <KyuSda />
        </Layout>
      }
    />
    <Route
      path="/kirinyaga-adventist-privacy-policy"
      element={
        <Layout>
          <PrivacyPolicy />
        </Layout>
      }
    />
    <Route
      path="/kirinyaga-adventist-terms-and-conditions"
      element={
        <Layout>
          <Terms />
        </Layout>
      }
    />
  </>
);
