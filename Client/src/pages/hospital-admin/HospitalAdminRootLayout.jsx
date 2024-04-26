import { Outlet } from "react-router-dom";

const HospitalAdminRootLayout = () => {
  return (
    <div>
      <p>nav</p>
      <Outlet />
      <p>footer</p>
    </div>
  );
};
export default HospitalAdminRootLayout;
