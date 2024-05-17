import About from "../../components/donor/About";
import Campaign from "../../components/donor/CampaignList";
import ContactUs from "../../components/donor/ContactUs";
import Main from "../../components/donor/Main";
import ScrollToTop from "../../components/donor/ScrollToTop";

const HomePage = () => {
  return (
    <div>
      <ScrollToTop />
      <Main />
      <Campaign id="campaigns" />
      <About />
      <ContactUs />
    </div>
  );
};
export default HomePage;
