import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../../components/donor/About";
import Campaign from "../../components/donor/CampaignList";
import ContactUs from "../../components/donor/ContactUs";
import Secondmain from "../../components/donor/Secondmain";

const HomePage = () => {
  const campaignRef = useRef(null);
  const aboutRef = useRef(null);
  const contactUsRef = useRef(null);
  const mainRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#campaigns") {
      campaignRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (location.hash === "#about") {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (location.hash === "#contact") {
      contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (location.hash === "#main") {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div>
      <div ref={mainRef}>
        <Secondmain />
      </div>
      <div className="mt-10"></div>
      <div ref={campaignRef}>
        <Campaign />
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={contactUsRef}>
        <ContactUs />
      </div>
    </div>
  );
};

export default HomePage;
