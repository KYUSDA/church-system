import Leaders from "./LandingPage/Leaders";
import MainFooter from "./LandingPage/MainFooter";
import Banner from "./LandingPage/Banner";
import Posts from "./LandingPage/Posts";
import DonationsCTA from "./LandingPage/DonationCta";
import SEO from "./components/SEO";
import Header from "./LandingPage/Navbar/Header";

const App = () => (
  <div>
    <SEO
      title="Welcome to KYUSDA"
      description="Discover our mission, connect with our community, and explore our latest news and events."
    />
    <Header />
    <Banner />
    <Posts />
    <Leaders />
    <DonationsCTA />
    <MainFooter />
  </div>
);

export default App;
