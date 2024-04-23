import About from "./components/About";
import CampaignComp from "./components/CampaignComp";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <>
      <Nav />

      {/* <SignUp />
      <SignIn /> */}

      <Main />
      <CampaignComp />
      <About />
      <ContactUs />
      <Footer />
    </>
  );
}

export default App;
