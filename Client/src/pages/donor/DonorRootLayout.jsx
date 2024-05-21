import { Outlet } from "react-router-dom";
import Footer from "../../components/donor/Footer";
import Nav from "../../components/donor/Nav";
import { useLocation } from "react-router-dom";

const DonorRootLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div>
      <Nav />
      <div className={`${isHomePage ? "" : "mt-2"}`}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
export default DonorRootLayout;
