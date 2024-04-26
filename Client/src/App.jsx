import { Route } from "react-router-dom";

import Footer from "./components/Footer";

import Nav from "./components/Nav";
import SignUp from "./pages/common/SignUp";
import SignIn from "./pages/common/SignIn";

import { Routes } from "react-router-dom";
import HomePage from "./pages/common/HomePage";
import Campaign from "./pages/donor/Campaign";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/campaign" element={<Campaign />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
