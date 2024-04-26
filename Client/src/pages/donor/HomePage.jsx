import About from "../../components/donor/About";
import Campaign from "../../components/donor/CampaignList";
import ContactUs from "../../components/donor/ContactUs";
import Main from "../../components/donor/Main";

const HomePage = () => {
  return (
    <div>
      <Main />
      <Campaign />
      <About />
      <ContactUs />
    </div>
  );
};
export default HomePage;
