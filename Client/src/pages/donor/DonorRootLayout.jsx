import { Outlet } from "react-router-dom";
import Footer from "../../components/donor/Footer";
import Nav from "../../components/donor/Nav";

const RootLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};
export default RootLayout;
